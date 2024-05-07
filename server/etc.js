function naming() {
	const timing=(Date.now()).toString()
	const mixing=(Math.round(Math.random()*10**8)).toString()
	return timing + "_" + mixing
}

module.exports={
	naming
}