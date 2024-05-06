import requests

headers={"Content-Type":"application/json; charset=utf-8"}

with open("sancheck.test.py","rb") as testfile:
  res=requests.post(
    "https://sanbo.space/point/something",
    headers=headers,
    files={"file":testfile}
  )
