import Express from 'express'
import {nikkiYomi,contentJson} from '../etc.mjs'
import Project from './project.mjs'

const router=Express.Router()

router.get('/article',(req,res)=>{
  res.send(Project.template(
    'Article',
    Project.article(contentJson.article)
  ))
})

router.get('/testbed',(req,res)=>{
  nikkiYomi((err,data)=>{
    res.send(Project.template(
      'Testbed',
      Project.log(Object.groupBy(data,({ip})=>(ip)))
    ))
  })
})

router.get('/',(req,res)=>{
	res.send(Project.template(
    'About',
    Project.article(contentJson.firstpage)
  ))
})

export default router
