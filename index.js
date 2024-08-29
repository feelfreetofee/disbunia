class disbunia {
	#baseURL = 'https://discord.com/api'

	#token
	constructor(token) {
		this.#token = token
	}

	#lock
	#queue = []

	fetch(resource, options) {
		const {promise, resolve} = Promise.withResolvers()
		if (options?.params)
			resource += '?' + new URLSearchParams(
				Object.entries(options.params).filter(([k, v]) => v !== undefined)
			).toString()
		const json = options?.json && JSON.stringify(options.json)
		let body
		if (options?.formData) {
			body = new FormData()

			if (json)
				form.append('payload_json', json)

			for (const file in options.formData)
				form.append(`files[${file}]`, options.formData[file], options.formData[file]?.name)
		} else
			body = json
		this.#queue.push([resolve, this.#baseURL + resource, {
			headers: Object.assign({
				Authorization: this.#token,
				'Content-Type': options?.json ? 'application/json' : undefined
			}, options?.headers),
			method: options?.method,
			body
		}])
		if (!this.lock)
			this.#next(this.lock = true)
		return promise
	}

	#next() {
		fetch(...this.#queue[0].slice(1)).then(r => this.#resolve(r))			
	}

	#resolve(r) {
        if (r.status !== 429) // Too Many Requests
			r.json().then(this.#queue.shift().shift())
		if (this.#queue.length == 0)
			this.lock = false
		else if (r.headers.get('x-ratelimit-remaining') == 0)
			setTimeout(r => this.#next(), r.headers.get('X-RateLimit-Reset') * 1e3 - Date.now())
		else
			this.#next()
	}
}

Object.assign(disbunia.prototype,
	await import('./paginator'),
	await import('./resources/invite'),
	await import('./resources/message'),
	await import('./resources/user')
)

export default disbunia