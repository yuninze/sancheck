const Fs=require("fs")
const Path=require("path")
const Mongo=require("mongodb").MongoClient

const pad="ㅡㅡㅡ Thing: "
const db_path="mongodb://localhost:23300"

function create(alter=false,cb) {
  if (alter) {
    Mongo.connect(db_path,(err,db)=>{
      if (err) throw err
      const Cursor=db.db("deta")
      Cursor.createCollection("_test",(err,res)=>{
        if (err) throw err
        console.log(res)
        Cursor.close()
      })
    })
  }
  else {
    
  }
}

function go() {
  console.log(`${pad}Connecting`)
  Mongo.connect(db_path,(err,db)=>{
    if (err) throw err
    db.close()
  })
}

module.exports={create,go}
