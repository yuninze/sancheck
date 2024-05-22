import os
import sys
import requests
import shutil
from itertools import chain
from random import random
from time import sleep

ornament=" . "*3
dst="https://sanbo.space/point/something"
cert=""
externPath=sys.argv[1]

startpointPath="C:\\code\\nih.go.kr\\work"
endpointPath="c:\\code\\sancheck\\server\\public"

def agg(
    endpointPath="c:\\code\\sancheck\\server\\public",
    outputName="_ttt",
    arcType="tar",
    startpointPath="C:\\code\\nih.go.kr\\work"
)->int:
    shutil.make_archive(
        os.path.join(endpointPath,outputName),
        arcType,
        startpointPath
    )
    
    return 0

def hello(
    dst,
    cert,
    something,
    repeat=1,
)->list:
    
    if os.path.isdir(externPath):
        extern=[q.path for q in os.scandir(something) if q.is_file()]
        multi=True if len(extern)>1 or repeat>1 else False
    else:
        print(ornament,"Path should direct a directory.")
        return 1
    
    cert=cert if os.path.exists(cert) else False
    
    session=requests.Session()
    session.cert=False

    def _post(
        dst,
        something,
        multi,
    )->dict:
    
        with open(something,"rb") as something:
            final=session.post(
                dst,
                files={"file":something}
            ).json()

            if multi:
                delay=round(random()*2)
                print(res,f"\nWaiting {delay} second(s)")
                sleep(delay)
            
        return final

    return list(chain.from_iterable(
        [[_post(dst,q,multi=multi) for q in extern] for w in range(repeat)]
    ))

hello(dst,cert,externPath)
