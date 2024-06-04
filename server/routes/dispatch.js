const Express=require("express")
const Path=require("path")

const router=Express.Router()

router.get("/",(req,res,next)=>{
	res.sendFile(Path.join(__dirname,"..","index.html"))
})

module.exports=router
