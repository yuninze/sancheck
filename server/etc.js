const Path = require("path")
const Fs = require("fs")

const nikkiFile = Path.join("res", "nikki")

function isNumeric(str) {
	return !isNaN(parseFloat(str)) && isFinite(str)
}

function naming() {
	const timing = (Date.now()).toString()
	let mixing = (Math.round(Math.random() * 10 ** 8)).toString()
	for (const l=mixing.length; l<8; l++) mixing="0"+mixing
	return timing + "_" + mixing
}

function parsing(url) {
	return Object.fromEntries(new URLSearchParams(url))
}

function timing(itu) {
	const key = Fs.readFileSync("./res/sancheck", "utf8").split(",").map(q => parseInt(q))
	const chain = {
		itu: parseInt(itu.toString().slice(0, key[1])),
		now: parseInt((Date.now() * key[0]).toString().slice(0, key[1]))
	}
	chain.sa = Math.abs(chain.itu - chain.now)
	return chain.sa < 5000
}

function redacting(string) {
	const a = string.indexOf("'/")
	const b = string.indexOf("/san")
	const c = string.slice(0, a)
	const d = string.slice(b)
	return c + ".." + d
}

function nikkiNew() {
	const naiyou={"naiyou":[]}
	Fs.writeFileSync(
		nikkiFile,
		JSON.stringify(naiyou),
		{encoding:"utf8",flags:"w"}
	)
	console.log("New nikkiFile been writtern.")
	return naiyou
}

function nikkiMi(string) {
	let naiyou
	try {
		naiyou=JSON.parse(string).naiyou
	}
	catch {
		naiyou={"naiyou":[]}
		console.log("New nikkiNaiyou been writtern.")
	}
	return naiyou
}

function nikkiYomi(cb) {
	Fs.readFile(nikkiFile,"utf8",
		(err,result)=>{
			if (err) {
				cb(null,nikkiNew())
			}
			else {
				cb(null,nikkiMi(result).naiyou)
			}
		}
	)
}

function nikkiKaki(ato) {
	nikkiYomi(
		(err,result)=>{
			const naiyou={"naiyou":result.concat(ato)}
			Fs.writeFileSync(
				nikkiFile,
				JSON.stringify({"naiyou":naiyou}),
				{encoding:"utf8",flags:"w"}
			)
		}
	)
}

module.exports={
	isNumeric,
	naming,
	parsing,
	timing,
	redacting,
	nikkiYomi,
	nikkiKaki
}
