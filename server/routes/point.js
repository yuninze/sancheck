const express=require("express")
const path=require("path")
const fs=require("fs")

const router=express.Router()

router.get("*",(req,res)=>{
	const filepath=path.join(__dirname,"..","public",req.originalUrl)
	if (fs.lstatSync(filepath).isFile()) {res.download(filepath)}
})

module.exports=router