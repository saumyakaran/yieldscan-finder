const getAllTokens = async (wallet) => {
	let tokens
	if (wallet) {
		tokens = wallet.getAllTokens()
	}
	return tokens
}

export default getAllTokens
