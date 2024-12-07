const Express=require('express')
const Path=require('path')
const Fs=require('fs')
const Pa=require('apache-arrow')
const Sqlite = require('node:sqlite')
const Etc = require("../etc")

const router=Express.Router()

const dbPointer = new Sqlite.DatabaseSync(':memory:')
const dbPath = Path.join(dirname__,'..','/public/database.db')
const db = new Sqlite.DatabaseSync(dbPath)

const init = `
  create table if not exists coordinate (
    y integer primary key,
    x integer not null unique 
  )
  
  create table if not exists element (
    foreign key (ind) references coordinate (x),
    foreign key (col) references coordinate (y),
    elem nvarchar(32) not null,
	 name nvarchar(32) not null
  )
`

const select = dbPointer.prepare(`
  select ind,pad,com from tablename limit 5
`)

const insert = dbPointer.prepare(`
  insert into tablename (ind, arr, pad, com) values (?, ?, ?, ?)
`)

function _insert(max) {
  for (let q = 0; q < max+1; q+=1) {
    insert.run(q, `ind_${q}_arr_${q}`, null, `comment_${q}`)
  }
}

Fs.stat(dbPath, (err,stat)=>{
  if (err || stat.size===0) {
    _create_table()
  }
  else {
    console.dir(select.all())
  }
})

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
