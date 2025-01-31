import {GoogleGenerativeAI} from '@google/generative-ai'
import {keyChain,claim} from '../etc.mjs'

const genai=new GoogleGenerativeAI(keyChain.gga.key)
const model=genai.getGenerativeModel(
    {model:'text-embedding-004'}
)

const phrase='is that you ?? is api working ?'

let response=await model.embedContent(phrase)

console.log(response)
