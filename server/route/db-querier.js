const Path=require('path')
const Sqlite=require('node:sqlite')

const dbPath=Path.join(
  '/home/yuninze/code/sancheck/server/public/database.db'
)
const db=new Sqlite.DatabaseSync(dbPath)

function query(statement) {
  const r=db.prepare(statement).all()
  console.dir(r)
  return r
}
