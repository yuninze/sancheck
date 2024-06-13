const Express=require("express")

const router=Express.Router()

const session={}
const blockWords=[
	"php","cgi","aspx","xml","sql","git","config","./"
]

router.all("*",(req,res,next)=>{
		const ip=req.socket.remoteAddress
		
		session.datetime=new Date().toISOString()
		session.ip=ip.slice(ip.indexOf(":",2)+1)
		session.ua=req.get("User-Agent")
		session.method=req.method
		session.url=req.originalUrl
		
		if (
			blockWords.some((word)=>(
				session.url.toLowerCase()).includes(word)
			)) {
			session.result=1
			return res.end()
		}
		
		console.log(session)
		
		next()
	})

module.exports=router
