const Express=require("express")
const Path=require("path")

const router=Express.Router()

const point=require("./point")
const baseline=require("./baseline")

router.get("/",(req,res,next)=>{
	res.sendFile(Path.join(__dirname,"..","index.html"))
})

router.use("/point",point)
router.use("/baseline",baseline)

module.exports=router
