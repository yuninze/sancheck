import requests

res=requests.post(
    "https://sanbo.space/point/something",
    files={"file":open("x.log","rb")}
)

res.text