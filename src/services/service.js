export const cutTags = str => {
	var regex = /( |<([^>]+)>)/ig,
		result = str.replace(regex, " ");
	return result;
}

//GENERATE UNIC ID
export const id = () => {
	let s4 = () => {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}
	//return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
