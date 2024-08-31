export async function* fetchBefore(resource, options) {
	if (typeof options.params.before === 'number') {
		options.params.limit = options.params.before
		delete options.params.before
	}
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
	if (typeof options.params.after === 'number') {
		options.params.limit = options.params.after
		delete options.params.after
	}
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