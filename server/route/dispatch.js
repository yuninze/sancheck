const Path=require("path")
const Etc=require("../etc")
const Express=require("express")

const router=Express.Router()

router.get("/",(req,res)=>{
	res.sendFile(
    Path.join(__dirname,"..","index.html")
  )
})

router.get("/hx",(req,res)=>{
  Etc.nikkiYomi((err,data)=>{
    res.json(data)
  })
})

module.exports=router
