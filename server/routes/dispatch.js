const Fs=require("fs")
const Express=require("express")
const Etc=require("../etc")

const router=Express.Router()

router.get("/",(req,res,next)=>{
	return res.send("dispatched 240903")
})

router.get("/stat",(req,res,next)=>{
  Etc.nikkiYomi((err,data)=>{return res.json(data)})
})

module.exports=router
