process.chdir("/home/yuninze/sancheck")

const Express=require("express")
const Limit=require("express-rate-limit")
const Https=require("https")
const Fs=require("fs")

const server=Express()

// Certificates
class Cert {
	constructor() {
		this.key=Fs.readFileSync(
			"./server/res/privkey1.pem",
			"utf8"
		)
		this.cert=Fs.readFileSync(
			"./server/res/cert1.pem",
			"utf8"
		)
		this.ca=Fs.readFileSync(
			"./server/res/chain1.pem",
			"utf8"
		)
	}
}

const sieve=require("./routes/sieve")
const route=require("./routes/route")
const point=require("./routes/point")

server.use(Limit({windowMs:1*5000,max:20}))
server.use("*",sieve)
server.use("/",route)
server.use("/point",point)

server.use((req,res)=>{
	const err=new Error("Something Went Wrong")
	err.code=404

	if (err) {
		if (!err.code || err.code.length!==3) err.code=500
		res.status(500)
		res.json({"result":1,"msg":err.message,"code":err.code})
	}
})

const httpsCert=new Cert()
const httpsServer=Https.createServer(httpsCert,server)
const listenPort=4430
const listenAddress="0.0.0.0"

httpsServer.listen(listenPort,listenAddress,()=>{
	console.log(`Listening at ${listenAddress}:${listenPort}`)
})
