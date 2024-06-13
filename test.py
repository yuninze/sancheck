import os
import sys
import requests
from requests_toolbelt import MultipartEncoder
from itertools import chain
from random import random
from time import sleep

ornament=" . "*3
fileSizeLimit=1024 ** 3 * 4

def hello(
    dst,
    cert,
    externPath,
    repeat=1,
)->list:
    
    if os.path.isdir(externPath):
        extern={q.path:q.stat().st_size<fileSizeLimit for q in os.scandir(externPath) if q.is_file()}
        multi=True if len(extern)>1 or repeat>1 else False
    elif os.path.isfile(externPath):
        extern={externPath:True if os.path.getsize(externPath)<fileSizeLimit else False}
        multi=False
    else:
        raise ValueError(f"Path-like object {externPath} does not exist")
    
    session=requests.Session()
    
    if cert:
        session.verify=cert if os.path.exists(cert) else False
    else:
        session.verify=True
    
    def _post(
        dst,
        file,
        small,
        multi,
    )->list:

        if multi:
            delay=round(random()*3)
            print(ornament,f"\nWaiting {delay} second(s)")
            sleep(delay)
        
        if small:
            print(f"{ornament} Initiating for {file} ({extern[file]})")
            with open(file,"rb") as fileContent:
                final=session.post(
                    dst,
                    files={"file":fileContent},
                ).json()
        else:
            encoder=MultipartEncoder(
                fields={"file":(os.path.split(file)[1],open(file,"rb"),"text/plain")}
            )
            final=session.post(
                dst,
                data=encoder,
                headers={"Content-Type":encoder.content_type}
            )

        print(ornament,final)
        
        return final
    
    if multi:
        return list(chain.from_iterable(
            [[_post(dst,q,extern[q],multi=multi) for q in extern] for w in range(repeat)]
        ))
    
    return [_post(dst,list(extern.keys())[0],extern[list(extern.keys())[0]],multi=multi) for q in range(repeat)]
    
dst="https://sanbo.space/point/something"
cert="d:/yuninze/nih.go.kr/sodok.crt"
externPath=sys.argv[1]

hello(dst,None,externPath)
