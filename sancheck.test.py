import requests
import sys
import os

filePath=sys.argv[1]

res=requests.post(
    "https://sanbo.space/point/something",
    files={"file":open(filePath,"rb")}
)

print(res.text)