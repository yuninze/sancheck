const Path=require('path')
const Sqlite=require('node:sqlite')

const dbPath=Path.join(__dirname,'..','/public/database.db')
const db=new Sqlite.DatabaseSync(dbPath)

const initStatement = `
  CREATE TABLE IF NOT EXISTS coordinate (
    x integer primary key,
    y integer not null
  );
  CREATE TABLE IF NOT EXISTS element (
    elem blob not null,
	  name text not null default '_',
    ind integer references coordinate (x)
  );
`

const dropStatement = `
  DROP TABLE IF EXISTS coordinate;
  DROP TABLE IF EXISTS element;
`

function getRandomArray (length=100,size=3) {
  const array=[...Array(length)].map(x=>
    [...Array(size)].map(x=>Math.floor(Math.random()*9))
  )
  return array
}

db.exec(initStatement)

module.exports={
  dbPath,
  db,
  getRandomArray
}
