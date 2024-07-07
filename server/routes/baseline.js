const Express=require("express")
const Path=require("path")
const Fs=require("fs")
const Arrow=require("apache-arrow")

const router=Express.Router()

const namae=[
  "BATCH",
  "LOCALE",
  "INPUT",
  "OUTPUT",
  "DATE",
  "RESULT"
]

const dataFile=Path.join(__dirname,"..","res","baseline.feather")
const data=Arrow.tableFromIPC(Fs.readFileSync(dataFile))

router.route("/")
  .get((req,res,next)=>{
    res.json(data.slice(0,5).toArray())
  })

  .post((req,res,next)=>{
    let from=req.data
    if (Object.keys(from)==namae) {
      from=Arrow.req.data
      data.concat(now)
    } else {
      let err
      err.message="mismatching columns"
      next(err)
    }
  })

module.exports=router
