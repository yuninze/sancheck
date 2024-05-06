const Express=require("express")
const Limit=require("express-rate-limit")
const Https=require("https")
const Fs=require("fs")

const server=Express()

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

const sieve=require("./routes/sieve")
const route=require("./routes/route")
const point=require("./routes/point")

server.use(Limit({windowMs:1*5000,max:20}))
server.use("*",sieve)
server.use("/",route)
server.use("/point",point)

server.use((req,res,next)=>{
	const err=new Error("Something Went Wrong")
	err.code=404
	next(err)
})

server.use((err,req,res,next)=>{
	if (err) {
		if (err.code.length!==3) err.code=500
		res.status(500).json({"msg":err.message,"code":err.code}).end()
	}
})

const httpsCert=new Cert()
const httpsServer=Https.createServer(httpsCert,server)

httpsServer.listen(4430,"0.0.0.0",()=>{
	console.log("listening")
})
