const Express=require("express")
const Limit=require("express-rate-limit")
const Https=require("https")
const Fs=require("fs")

const server=Express()

const repo="/home/yuninze/sancheck/server"
process.chdir(repo)

const sieve=require("./routes/sieve")
const dispatch=require("./routes/dispatch")
const point=require("./routes/point")
const baseline=require("./routes/baseline")

// Certificates
class Cert {
	constructor() {
		this.key=Fs.readFileSync(
			"./res/privkey1.pem",
			"utf8"
		)
		this.cert=Fs.readFileSync(
			"./res/cert1.pem",
			"utf8"
		)
		this.ca=Fs.readFileSync(
			"./res/chain1.pem",
			"utf8"
		)
	}
}

server.set("json spaces",2)
server.use(Limit({windowMs:1*5000,max:20}))
server.use("*",sieve)
server.use("/",dispatch)
server.use("/point",point)
server.use("/baseline",baseline)

server.use((req,res,next)=>{
	if (!(typeof err==="undefined")) {
		res.status(500)
		res.json({"result":1,"msg":err.message,"code":500})
	}
})

const httpsCert=new Cert()
const httpsServer=Https.createServer(httpsCert,server)
const listenPort=4430
const listenAddress="0.0.0.0"

httpsServer.listen(listenPort,listenAddress,()=>{
	console.log(`Listening at ${listenAddress}:${listenPort}`)
})
