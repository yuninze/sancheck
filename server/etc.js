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

function nikkiYomi(cb) {
	Fs.readFile(nikkiFile,"utf8",(err,data)=>{
		if (err) return cb(err)
		cb(null,
			JSON.parse(data).naiyou
		)
	})
}

function nikkiKaki(ato) {
	nikkiYomi((err,data)=>{
		if (err) return cb(err)
		Fs.writeFile(
			nikkiFile,
			JSON.stringify(
				{"naiyou":data.concat(ato)}
			),
			{encoding:"utf8",flags:"w"},
			(err)=>{if (err) return err}
		)
	})
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
