const Express=require("express")
const Path=require("path")
const Fs=require("fs").promises
const Pa=require("apache-arrow")

const router=Express.Router()

const data_path=Path.join(__dirname,"..","kura","feature.f")

async function read_file(data_path) {
  if (data_path.substring(0,3)==="http") {
    const content=await fetch(data_path)
    return await content.arrayBuffer()
  }
  else {
    const content=await Fs.readFile(data_path,"utf8")
    return content
  }
}

router.get("/",(req,res)=>{
  res.send("deta..")
})

router.get("/info",(req,res,next)=>{
  const data=Pa.tableFromIPC(read_file(data_path))
  
  if (!err) {
    data.shape=[data.numCols,data.numRows]
    const did_what={deta:{}}

    did_what.deta["shape"]=data.shape
    did_what.deta["info"]=Object.assign({},
      data.schema.fields.map(_data=>{
        const x={}
        x[_data.name]=_data.type.toString()
      })
    )
    res.json(did_what)
  }
  else {
    next()
  }
})

router.post("/about/:the",(req,res,next)=>{
  // (/about/qwer)=>(req.params)=>({the:qwer})
  const the={...req.params}
  const got=req.body
  res.json(
    {qwerqwer:got}
  )
})

module.exports=router
