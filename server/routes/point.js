const Express=require("express")
const Path=require("path")
const Fs=require("fs")
const Upload=require("express-fileupload")
const Etc=require("../etc")

const router=Express.Router()

router.use(Upload())

router.get("/",(req,res,next)=>{
	const path=Path.join(__dirname,"..","point.html")
	console.log(__dirname)
	res.sendFile(path)
})

router.get("/stats",(req,res,next)=>{
	Fs.readdir(Path.join(__dirname,"..","public"),(err,data)=>{
		if (!err) {
			const fileNames=data
			res.json({
				"result":0,
				"kazu":fileNames.length,
				"naiyou":fileNames.filter((fileName)=>{
					if (Etc.isNumeric(fileName.substring(0,21).replace("_",""))) {
						return false
					} else {
						return true
					}
				})
			})
		} else {
			next()
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
	const root=Path.join(__dirname,"..","public")
	let file
	let fileName
	let filePath
	let fileSizes
	
	if (!req.files || Object.keys(req.files).length===0) {
		next()
	}

	fileSizes=Fs.readdirSync(root).map((elem)=>{
		return Fs.statSync(Path.join(root,elem)).size
	})
	file=req.files.file
	fileName=Etc.naming()+"_"+file.name
	filePath=Path.join(root,fileName)

	if (!fileSizes.includes(file.size)) {
		file.mv(filePath,(err)=>{
			if (!err) {
				res.json({
					"result":0,
					"fileName":fileName,
					"fileSize":file.size
				})
			} else {
				next()
			}
		})
	} else {
		next()
	}
})

module.exports=router
