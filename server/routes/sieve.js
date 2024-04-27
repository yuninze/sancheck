const express=require("express")

const router=express.Router()

const session={}

router.use("*",(req,res,next)=>{
	const ip=req.socket.remoteAddress
	
	session.datetime=new Date().toISOString()
	session.ip=ip.slice(ip.indexOf(":",2)+1)
	session.ua=req.get("User-Agent")
	session.url=req.originalUrl
	
	if (session.ua==false || req.url.endsWith("php") || req.url.endsWith("cgi") || req.url.includes("sql") || req.url.includes("hwp")) {
		res.end()
	}
	
	console.dir(session)
	next()
})

module.exports=router