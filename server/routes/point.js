// Uppermost Classes
const Express=require("express")
const Path=require("path")
const Fs=require("fs")
const Multer=require("multer")

const router=Express.Router()
const upload=Multer({storage:multer.memoryStorage()})

router.get("/",(req,res)=>{
	res.sendFile(Path.join(__dirname,"..","point.html"))
})

router.get("/stats",(req,res)=>{
	Fs.readdir(Path.join(__dirname,"..","public"),
		(err,data)=>{
			res.json(
				{"result":data.length}
			)
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

router.post("something",upload.single("file"),(req,res,next)=>{
	const {fileName,fileBuffer,fileSize}=req.file
	const path=Path.join(__dirname,"..","public")
	
	Fs.writeFile(Path.join(path,fileName),fileBuffer,(err)=>{
		let result
		if (!err) {
			result=0
		} else {
			result=1
			next(err)
		}
		res.json({
			"result":result,
			"fileName":fileName,
			"fileSize":fileSize
		})
	})
})

module.exports=router