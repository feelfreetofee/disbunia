export async function* fetchBefore(resource, options) {
	while (true) {
		const response = await this.fetch(resource, options)
		if (response.length === 0)
			break
		yield response
		if (!response.length)
			break
		if (response.length < options.params.limit)
			break
		options.params.before = response.at(-1).id
	}
}

export async function* fetchAfter(resource, options) {
	while (true) {
		const response = await this.fetch(resource, options)
		if (response.length === 0)
			break
		yield response
		if (!response.length)
			break
		if (response.length < options.params.limit)
			break
		options.params.after = response.at(0).id
	}
}