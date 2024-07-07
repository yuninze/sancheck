const Express=require("express")
const Path=require("path")
const Etc=require("../etc")

const router=Express.Router()

router.get("/",(req,res,next)=>{
	res.sendFile(Path.join(__dirname,"..","res","ragu.png"))
})

router.get("/stat",(req,res)=>{
  Etc.nikkiYomi((err,data)=>res.json(data))
})

module.exports=router
