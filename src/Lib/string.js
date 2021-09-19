export const shortenString = (string, maxLength = 20) => {
	if (string.length > maxLength) {
		return string.substring(0, maxLength - 1) + '...'
	} else {
		return string
	}
}
