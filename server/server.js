const Express=require("express")
const Limit=require("express-rate-limit")
const Https=require("https")
const Fs=require("fs")

const server=Express()

const repo="/home/yuninze/code/sancheck/server"
process.chdir(repo)

const sieve=require("./routes/sieve")
const dispatch=require("./routes/dispatch")
const point=require("./routes/point")
const baseline=require("./routes/baseline")

class Cert {
	constructor() {
		this.key=Fs.readFileSync(
			"/etc/letsencrypt/live/sanbo.space/privkey.pem",
			"utf8"
		)
		this.cert=Fs.readFileSync(
			"/etc/letsencrypt/live/sanbo.space/fullchain.pem",
			"utf8"
		)
		this.ca=Fs.readFileSync(
			"/etc/letsencrypt/live/sanbo.space/fullchain.pem",
			"utf8"
		)
	}
}

server.set("json spaces",2)
server.use(Express.static("./public"))
server.use(Limit({windowMs:1000 * 10,max:32}))
server.use("*",sieve)
server.use("/",dispatch)
server.use("/point",point)
server.use("/baseline",baseline)

server.use((err,req,res,next)=>{
	res.status(500)

	if (typeof err==="undefined") {
		res.json({
			"result":1,
			"msg":"Something Went Wrong (Not Implemented)",
			"code":res.statusCode
		})
	} else {
		res.json({
			"result":1,
			"msg":err.message,
			"code":res.statusCode
		})
	}

	console.log(err)
})

const listenPort=[4430,8000]
const listenAddress="0.0.0.0"

try {
	const httpsCert=new Cert()
	const httpsServer=Https.createServer(httpsCert,server)
	httpsServer.listen(listenPort[0],listenAddress,()=>{})
} catch (err) {
	console.log("CertError:",err.message)
} finally {
	server.listen(listenPort[1],listenAddress,()=>{})
}
