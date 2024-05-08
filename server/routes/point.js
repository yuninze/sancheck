const Express=require("express")
const Path=require("path")
const Fs=require("fs")
const Upload=require("express-fileupload")
const Etc=require("../etc")

const router=Express.Router()

router.use(Upload())

router.get("/",(req,res)=>{
	res.sendFile(Path.join(__dirname,"..","point.html"))
})

router.get("/stats",(req,res,next)=>{
	Fs.readdir(Path.join(__dirname,"..","public"),
		(err,data)=>{
			if (!err) {
				res.json(
					{"result":data.length}
				)
			} else {
				next(err)
			}
	})
})

router.get("*",(req,res,next)=>{
	const path=Path.join(__dirname,"..","public",req.originalUrl)
	
	Fs.access(path,(err)=>{
		if (!err) {
			if (Fs.lstatSync(path).isFile()) {
				res.download(path)
			}
		} else {
			next(err)
		}
	})
})

router.post("/something",(req,res,next)=>{
	let file
	let fileName
	let filePath
	
	if (!req.files || Object.keys(req.files).length===0) {
		next()
	}
	
	file=req.files.file
	fileName=Etc.naming()+"_"+file.name
	filePath=Path.join(__dirname,"..","public",fileName)
	
	file.mv(filePath,(err)=>{
		if (!err) {
			res.json({
				"result":0,
				"fileName":fileName,
				"fileSize":file.size
			})
		} else {
			next(err)
		}
	})
})

module.exports=router