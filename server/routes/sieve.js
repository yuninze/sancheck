const Express=require("express")

const router=Express.Router()

const session={}
const blockWords=[
	"php","cgi","sql","git"
]

router.use("*",(req,res,next)=>{
	const ip=req.socket.remoteAddress
	
	session.datetime=new Date().toISOString()
	session.ip=ip.slice(ip.indexOf(":",2)+1)
	session.ua=req.get("User-Agent")
	session.method=req.method
	session.url=req.originalUrl
	
	if (!session.ua || blockWords.some((q)=>{session.url.endsWith(q)})) {
		res.end()
	}
	
	console.dir(session)
	next()
})

module.exports=router