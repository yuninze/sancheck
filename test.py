import os
import sys
import requests
import shutil
from itertools import chain
from random import random
from time import sleep

ornament=" . "*3
dst="https://some.where/some.thing"
certFile="./fullchain.cert.crt"
externPath=sys.argv[1]

startpointPath="..."

endpointPath="./server/public"
def agg(
    endpointPath="./server/public",
    outputName="_ttt",
    arcType="tar",
    startpointPath="..."
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
        return 
    
    cert=certFile if os.path.exists(certFile) else False
    
    session=requests.Session()
    session.verify=cert

    def _post(
        dst,
        something,
        multi,
    )->dict:
    
        with open(something,"rb") as something:
            if multi:
                delay=round(random()*2)
                print(ornament,f"\nWaiting {delay} second(s)")
                sleep(delay)
            
            final=session.post(
                dst,
                files={"file":something}
            ).json()
            
            print(ornament,final)
            
            return final
    
    return list(chain.from_iterable(
        [[_post(dst,q,multi=multi) for q in extern] for w in range(repeat)]
    ))

hello(dst,certFile,externPath)
