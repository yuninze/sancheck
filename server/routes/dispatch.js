const Express=require("express")
const Path=require("path")

const router=Express.Router()

router.get("/",(req,res,next)=>{
	res.sendFile(Path.join(__dirname,"..","res","ragu.png"))
})

module.exports=router
