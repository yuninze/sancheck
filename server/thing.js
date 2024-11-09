const Fs=require("fs")
const Path=require("path")
const Mongo=require("mongodb").MongoClient

const pad=" ㅡㅡㅡ "
const mongo_path="mongodb://localhost:23300"

function connect(cb) {
  Mongo.connect(mongo_path)
	.then(mongo=>{
		if (cb) {cb(null,mongo)}
	})
	.catch(err=>{
		console.log("Thing.connect:",err)
		if (cb) {cb(err)}
	})
}

function create(cb) {
  Mongo.connect(mongo_path,(err,db)=>{
    if (err) throw err
    const Cursor=db.db("deta")
    Cursor.createCollection("_test",(err,res)=>{
      if (err) throw err
      Cursor.close()
    })
  })
}

module.exports={connect,create}
