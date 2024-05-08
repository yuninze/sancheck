function naming() {
	const timing=(Date.now()).toString()
	let mixing=(Math.round(Math.random()*10**8)).toString()
	for (let l=mixing.length;l<8;l++) mixing="0"+mixing
	return timing + "_" + mixing
}

module.exports={
	naming
}