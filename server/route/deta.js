const Path=require('path')
const Fs=require('fs')
const Etc=require('../etc')
const Express=require('express')
const Pa=require('apache-arrow')
const dataInit = require('./dataInit')

const db=dataInit.db

const rowNum=db.prepare(`
  SELECT * from coordinate order by x desc limit 1
`).all()

const insertCoordinate = db.prepare(`
  INSERT INTO coordinate (x, y) values (?, ?)
`)

const insertElement = db.prepare(`
  INSERT INTO element (elem, name) values (?, ?)  
`)

if (rowNum.length<1) {
  const randomArray=dataInit.getRandomArray()
  for (let q=0; q < randomArray.length; q+=1) {
    insertCoordinate.run(q, 0)
    insertElement.run(`${randomArray[q]}`, `name_${q}`)
  }
}
else {
  Etc.claim(`db has ${rowNum} rows`)
}

const router=Express.Router()

function read_from(file_path,cb) {
  fetch(file_path)
    .then(res=>{cb(null,Buffer.from(res))})
    .catch(err=>{cb(err,null)})
}

const file_name='feature.f'
const file_path=Path.join(__dirname,'..','kura',file_name)

router.get('/',(req,res)=>{
  res.send('deta..')
})

router.get('/info',(req,res,next)=>{
  const data=Pa.tableFromIPC(Fs.readFileSync(file_path))
  const data_shape=[data.numCols,data.numRows]
  const did_what={
    deta:{
      'file_name':file_name,
      'file_size':(Fs.statSync(file_path).size)/1024**2,
      'shape':data_shape.map(q=>q.toString()).join(', '),
      'column':{}
    }
  }
  
  data.schema.fields.forEach(column=>{
    did_what['deta']['column'][column.name]=column.type.toString()
  })

  res.json(did_what)
})

router.post('/about/:the',(req,res,next)=>{
  // (/about/qwer)=>(req.params)=>({the:qwer})
  const the={...req.params}
  const got=req.body
  res.json(
    {qwerqwer:got}
  )
})

module.exports=router
