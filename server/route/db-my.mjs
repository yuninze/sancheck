import Mysql from 'mysql'
import {readFile} from 'fs/promises'
import {claim} from '../etc.mjs'

const connect_to = JSON.parse(
    await readFile(
        './my.key',
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

export default {connection}
