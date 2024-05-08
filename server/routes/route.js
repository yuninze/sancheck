const Express=require("express")
const Path=require("path")

const router=Express.Router()

router.get("/",(req,res,next)=>{
	if (req.originalUrl==="/favicon.ico") res.sendFile(Path.join(__dirname,"..","res","favicon.ico"))
	res.sendFile(Path.join(__dirname,"..","index.html"))
})

module.exports=router