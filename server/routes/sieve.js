const Express=require("express")

const router=Express.Router()

const session={}
const blockWords=[
	"php","cgi","sql","git","config"
]

router.use("*",(req,res,next)=>{
	const ip=req.socket.remoteAddress
	
	session.datetime=new Date().toISOString()
	session.ip=ip.slice(ip.indexOf(":",2)+1)
	session.ua=req.get("User-Agent")
	session.method=req.method
	session.url=req.originalUrl
	
	console.dir(session)
	
	if (blockWords.some((word)=>(session.url.toLowerCase()).includes(word))) {
		return res.json({result:1,msg:""}).end()
	}
	
	next()
})

module.exports=router