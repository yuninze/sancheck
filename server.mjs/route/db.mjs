import Mysql from 'mysql'
import Fs from 'node:fs'
import {claim} from '../etc.mjs'

const connect_to = JSON.parse(
    Fs.readFileSync(
        '../../mysql.key',
        {encoding:'utf8'}
    )
)

const connection = Mysql.createConnection({
    host: 'localhost',
    user: connect_to.user,
    password: connect_to.password
})

connection.connect((err)=>{
    if (err) throw err
    claim('connected.')
})

module.exports={
    connection
}
