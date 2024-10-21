const Fs=require("fs")
const Path=require("path")
const Mongo=require("mongodb").MongoClient

const pad="Thing: "
const db_path="mongodb://localhost:23300"

function connect(db_name,cb) {
  Mongo.connect(db_path+db_name)
  .then(db=>{
    cb(null,db)
  })
  .catch(err=>{
    cb(err,null)
  })
}

function create(db_name,table_name,cb) {
  connect(db_name)
    .then(db=>{
      db.createCollection(table_name)
        .then(res=>{
          db.close()
          cb(err,`${pad}Created ${table_name}`)
        })
        .catch(err=>{
          throw err
        })
    })
    .catch(err=>{
      cb(err,null)
    })
}

module.exports={connect,create}
