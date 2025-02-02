import Mysql from 'mysql'
import {
    keyChain
} from '../etc.mjs'

const pool = Mysql.createPool({
    host: keyChain.db.hostname,
    port: keyChain.db.port,
    user: keyChain.db.username,
    password: keyChain.db.password,
    database: 'sample',
})

export function getPool(cb) {
    pool.getConnection((err, connection)=>{
        cb(err, connection)
    })
}

export default {getPool}
