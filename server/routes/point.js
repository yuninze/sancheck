// Uppermost Classes
const Express=require("express")
const Path=require("path")
const Fs=require("fs")

const router=Express.Router()

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
			if (Fs.lstatSync(filepath).isFile()) {
				res.download(filepath)
			}
		} else {
			next(err)
		}
	})
})

module.exports=router