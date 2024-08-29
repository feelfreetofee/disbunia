class disbunia {
	#baseURL = 'https://discord.com/api'

	#token
	constructor(token) {
		this.#token = token
	}

	#lock
	#queue = []

	fetch(resource, options) {
		if (options?.params)
			resource += '?' + new URLSearchParams(
				Object.entries(options.params).filter(([k, v]) => v !== undefined)
			).toString()

		const headers = Object.assign({
			Authorization: this.#token
		}, options?.headers)

		const json = options?.json && JSON.stringify(options.json)

		let body
		if (options?.formData) {
			body = new FormData()
			if (json)
				body.append('payload_json', json)
			for (const file in options.formData)
				body.append(`files[${file}]`, options.formData[file], options.formData[file]?.name)
		} else if (json) {
			headers['Content-Type'] = 'application/json'
			body = json
		}

		return this.#push(this.#baseURL + resource, {
			headers,
			method: options?.method,
			body
		})
	}

	#push(resource, options) {
		const {promise, resolve} = Promise.withResolvers()
		this.#queue.push([resolve, resource, options])
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