const Express=require("express")
const Path=require("path")
const Fs=require("fs")
const Busboy=require("busboy")
const Etc=require("../etc")

const router=Express.Router()

const dst="souko"

router.get("/",(req,res,next)=>{
	const path=Path.join(__dirname,"..","point.html")
	res.sendFile(path)
})

router.get("/stats",(req,res,next)=>{
	const path=Path.join(__dirname,"..",dst)
	Fs.readdir(path,(err,data)=>{
		if (!err) {
			const fileNames=data
			const fileSizes=fileNames.map((fileName)=>{return Fs.statSync(Path.join(path,fileName)).size})

			res.json({
				"result":0,
				"kazu":fileNames.length,
				"saizu":(fileSizes.reduce((q,p)=>q+p,0) / 1024**2).toFixed(5),
				"naiyou":fileNames.filter((fileName)=>{
					if (Etc.isNumeric(fileName.substring(0,21).replace("_",""))) 
						{return false} else {return true}
				})
			})
		} else {
			return next(Etc.redacting(err))
		}
	})
})

router.get("*",(req,res,next)=>{
	const url=Etc.parsing(req.url)
	let err=Error()

	err.spec={
		keys:Object.keys(url)?Object.keys(url).length<2:true,
		mono:url.mono?url.mono.length<3:true,
		itu_l:url.itu?url.itu.toString().length<12:true,
		itu_h:url.itu?!Etc.timing(url.itu):true
	}
	
	if (Object.values(err.spec).some((v)=>v)) {
		err.message=Object.keys(err.spec).filter((errSpecName)=>{
			if (err.spec[errSpecName]) return true
		}).join(", ")
		return next(err)
	}

	const path=Path.join(__dirname,"..",dst,url.mono)

	Fs.access(path,(e)=>{
		if (!e && Fs.lstatSync(path).isFile()) return res.download(path).end()
		
		e.message=Etc.redacting(e.message)
		return next(e)
	})
})

router.post("/something",(req,res,next)=>{
	const path=Path.join(__dirname,"..",dst)
	const busboy=Busboy({headers:req.headers,highWaterMark:1024**3*5})
	console.dir(req.headers)

	busboy.on("files",(file,info)=>{
		const fileName=Etc.naming()+"_"+info.filename

		console.log(`.........Got a file ${info.filename}`)
		file.pipe(Fs.createWriteStream(Path.join(path,fileName)))
		file.on("close",()=>{
			return res.json({
				"result":0,"fileName":fileName
			}).catch("err",(err)=>{return next(err)})
		})
	})

	req.pipe(busboy)
})

module.exports=router
