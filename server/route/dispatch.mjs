import Express from 'express'
import {nikkiYomi} from '../etc.mjs'

const router=Express.Router()

router.get('/',(req,res)=>{
	res.sendFile('index.html', {root: '.'})
})

router.get('/hx',(req,res)=>{
  nikkiYomi((err,data)=>{
    res.json(data)
  })
})

export default router
