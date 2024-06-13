const Express=require("express")
const Path=require("path")
const Fs=require("fs")
const Arrow=require("apache-arrow")

const router=Express.Router()

const datafile=Path.join(
  __dirname,"..","res","baseline.feather"
)
const namae=[
  "BATCH",
  "LOCALE",
  "INPUT","OUTPUT",
  "DATE",
  "RESULT"
]
const data=Arrow.tableFromIPC(Fs.readFileSync(datafile))

router.route("/")

  .get((req,res,next)=>{
    res.json(data.slice(0,1000).toArray())
  })

  .post((req,res,next)=>{
    let from=req.data
    if (Object.keys(from)==namae) {
      from=Arrow.req.data
      data.concat(now)
    } else {
      const err={message:"Column mismatch"}
      next(err)
    }
  })

module.exports=router
