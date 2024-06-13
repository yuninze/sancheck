const Express=require("express")
const Path=require("path")
const Fs=require("fs")
const Busboy=require("busboy")
const Etc=require("../etc")

const router=Express.Router()

router.get("/",(req,res,next)=>{
	const path=Path.join(__dirname,"..","point.html")

	console.log(__dirname)
	res.sendFile(path)
})

router.get("/stats",(req,res,next)=>{
	const path=Path.join(__dirname,"..","public")
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
		}
	})
})

router.get("*",(req,res,next)=>{
	const path=Path.join(__dirname,"..","public",req.url)

	Fs.access(path,(err)=>{
		if (!err) {
			if (Fs.lstatSync(path).isFile()) {
				res.download(path)
			}
		} else {
			next()
		}
	})
})

router.post("/something",(req,res,next)=>{
	const path=Path.join(__dirname,"..","public")
	const busboy=Busboy({headers:req.headers,highWaterMark:1024**2 * 4})

	busboy.on("file",(name,file,info)=>{
		const fileName=Etc.naming()+"_"+info.filename
		file.pipe(Fs.createWriteStream(Path.join(path,fileName)))
		file.on("close",(file)=>{
			res.json({"result":0,"fileName":fileName})
		})
	})
	req.pipe(busboy)
})

module.exports=router
