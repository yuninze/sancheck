const Mysql=require('mysql')
const Fs=require('fs')

const connection_info = JSON.parse(
  Fs.readFileSync('../../mysql.key',{encoding:'utf8'})
)

const connection = Mysql.createConnection({
  host: localhost,
  user: connection_info.user,
  password: connection_info.password
})

connection.connect((err)=>{
  if (err) throw err
  console.log('connected.')
})

module.exports={

}
