export function authorsFormattedForDropdown(authors){
	const authorsFormated = authors.map((author) => {
		return {
			value: author.id,
			text: author.firstName + " " + author.lastName
		};
	});

	return authorsFormated;
}
