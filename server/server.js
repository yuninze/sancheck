const express=require("express")
const limit=require("express-rate-limit")
const https=require("https")
const fs=require("fs")

const server=express()

// Certificates
class Cert {
	constructor() {
		this.key=fs.readFileSync(
			"./res/privkey1.pem",
			"utf8"
		)
		this.cert=fs.readFileSync(
			"./res/cert1.pem",
			"utf8"
		)
		this.ca=fs.readFileSync(
			"./res/chain1.pem",
			"utf8"
		)
	}
}

const sieve=require("./routes/sieve")
const route=require("./routes/route")
const point=require("./routes/point")

server.use(limit({windowMs:1*5000,max:20}))
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
const httpsServer=https.createServer(httpsCert,server)

httpsServer.listen(443,()=>{
	console.log("listening")
})
