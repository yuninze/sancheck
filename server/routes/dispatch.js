const Express=require("express")
const Etc=require("../etc")

const router=Express.Router()

router.get("/",(req,res)=>{
	res.send("240918")
})

router.get("/stat",(req,res)=>{
  Etc.nikkiYomi((err,data)=>{return res.json(data)})
})

module.exports=router
