const Express=require("express")
const Etc=require("../etc")

const router=Express.Router()

router.get("/",(req,res,next)=>{
	res.send("done")
})

router.get("/stat",(req,res,next)=>{
  Etc.nikkiYomi((err,data)=>res.json(data))
})

module.exports=router
