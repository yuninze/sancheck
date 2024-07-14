import os
import sys
import requests
from collections.abc import Iterable
from functools import partial
from itertools import chain
from random import random
from time import sleep
from requests_toolbelt import StreamingIterator, MultipartEncoder

ornament=" . "*3
fileSizeLimit=1024 ** 3 * 8
chunkSize=1024 ** 3 * 1

dst="https://sanbo.space/kura"
cert="./yuninze/res/sodok.crt"
externPath=sys.argv[1]

def hello(
    dst,
    cert,
    externPath,
    repeat=1,
)->list:
    
    def _chop(
        chunkSize,
        file,
        test=False
    )->Iterable:
        fp=open(file,"rb")
        _chunkSize=0
        if test:
            for chunk in iter(partial(fp.read,chunkSize),b""):
                _chunkSize+=len(chunk)
                print(f"{_chunkSize/1024**2:.2f} MiB")
        else:
            return iter(partial(fp.read,chunkSize),b"")
    
    def _post(
        dst,
        file,
        multi=False,
    )->list:
        if multi:
            delay=round(random()*3)
            print(ornament,f"\nWaiting {delay} second(s)")
            sleep(delay)
        print(f"{ornament} Sending {file} ({extern[file]/1024**2:.2f} MiB)")
        if os.path.getsize(file)<fileSizeLimit:
            with open(file,"rb",buffering=1024**3*1) as fileContent:
                resp=session.post(
                    dst,
                    files={"file":fileContent},
                    timeout=3
                ).json()
        else:
            raise NotImplementedError("https://github.com/python/cpython/issues/110467")
            fileData=MultipartEncoder(
                fields={
                    "files":(os.path.split(file)[1], open(file,"rb",buffering=1024**3*1), "text/plain")
                }
            )
            resp=session.post(
                    dst,
                    data=fileData,
                    headers={"Content-Type":fileData.content_type},
                    timeout=None
            ).json()
        print(ornament,resp)
        return resp

    if os.path.isdir(externPath):
        extern={q.path:q.stat().st_size for q in os.scandir(externPath) if q.is_file()}
        multi=True if len(extern)>1 or repeat>1 else False
    elif os.path.isfile(externPath):
        extern={externPath:os.path.getsize(externPath)}
        multi=False
    else:
        raise OSError(f"{externPath} does not exist")
    
    session=requests.Session()
    session.mount("https://",requests.adapters.HTTPAdapter(max_retries=3))
    
    session.cert=cert if os.path.exists(cert) else None
    print(ornament,f"cs Cert of the session is {session.cert}.")
    
    if multi:
        return list(chain.from_iterable(
            [[_post(dst,q,extern[q],multi=multi) for q in extern] for w in range(repeat)]
        ))
    return [_post(dst,list(extern.keys())[0]) for q in range(repeat)]
    
# python ./sancheck/test.py d:/yuninze/downloads/sloth.png
hello(dst,cert,externPath)
