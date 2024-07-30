const Express=require("express")
const Limit=require("express-rate-limit")
const Http=require("http")
const Https=require("https")
const Path=require("path")
const Fs=require("fs")
const Etc=require("./etc")

const repo="/home/yuninze/code/sancheck/server"

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

const app=Express()
const sieve=require("./routes/sieve")
const dispatch=require("./routes/dispatch")
const kura=require("./routes/kura")
const baseline=require("./routes/baseline")

process.chdir(repo)

app.use(Limit({windowMs:1000 * 10,max:32}))
app.use(Express.static("./public"))
app.use("*",sieve)
app.use("/",dispatch)
app.use("/kura",kura)
app.use("/baseline",baseline)
app.use((req,res,next)=>{
	res.status(404).sendFile(
		Path.join(repo,"/public/404.png")
	)
})
app.use((err,req,res,next)=>{
	res.status(500)
	if (typeof err==="undefined") {
		res.json({
			"result":1,
			"msg":"Something Went Wrong",
			"code":res.statusCode
		})
	} else {
		res.json({
			"result":1,
			"msg":err.message,
			"code":res.statusCode
		})
	}
})

const ports=[4430,17310]
const addr="0.0.0.0"
let server
let port

try {
	const httpsCert=new Cert()
	server=Https.createServer(httpsCert,app)
	port=ports[0]
}
catch (err) {
	console.log("Fallback:",Etc.redacting(err.message))
	server=Http.createServer(app)
	port=ports[1]
} 
finally {
	server.listen(port,addr,()=>{})
}
