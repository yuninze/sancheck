const Express=require("express")
const Path=require("path")
const Fs=require("fs")
const Pa=require("apache-arrow")

const router=Express.Router()

const file_name="feature.f"
const file_path=Path.join(__dirname,"..","kura",file_name)

function read_from(file_path,cb) {
  fetch(file_path)
    .then(res=>{cb(null,Buffer.from(res))})
    .catch(err=>{cb(err,null)})
}

router.get("/",(req,res)=>{
  res.send("deta..")
})

router.get("/info",(req,res,next)=>{
  const data=Pa.tableFromIPC(Fs.readFileSync(file_path))
  const data_shape=[data.numCols,data.numRows]
  const did_what={
    deta:{
      "file_name":file_name,
      "file_size":(Fs.statSync(file_path).size)/1024**2,
      "shape":data_shape.map(q=>q.toString()).join(", "),
      "column":{}
    }
  }
  
  data.schema.fields.forEach(column=>{
    did_what["deta"]["column"][column.name]=column.type.toString()
  })

  res.json(did_what)
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
