const Express=require("express")
const Path=require("path")
const Fs=require("fs")
const Arrow=require("apache-arrow")
// import * as Express from "express"
// import * as Path from "path"
// import * as Fs from "fs"
// import * as Arrow from "apache-arrow"

const router=Express.Router()

async function load_data(data_path) {
  if (data_path.substring(0,3)==="http") {
    const content=await fetch(data_path)
    return await content.arrayBuffer()
  } else {
    const content=Fs.readFile(
      data_path,"utf8",
      (err,ctnt)=>{return ctnt}
    )
    return content
  }
}

router.get("/",(req,res,next)=>{
  return res.send("show")
})
  
router.post("/the/:the",(req,res,next)=>{
  const got=req.body
  return res.json(
    {qwerqwer:got}
  )

  const err=new Error()
  err.spec={
    key:urlKey?urlKey.length!==1:true
  }
  
  if (Object.values(err).some()) {
    return next(err)
  }

  const data=load_data(data_path).then(
    buffer=>{return buffer}
  )

  return res.json(data)
})

module.exports=router
