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
		const json = options?.body && typeof options.body === 'object'
		this.#queue.push([resolve, this.#baseURL + resource, {
			headers: Object.assign({
				Authorization: this.#token,
				'Content-Type': json ? 'application/json' : undefined
			}, options?.headers),
			method: options?.method,
			body: json ? JSON.stringify(options.body) : options?.body
		}])
		if (!this.lock)
			this.#next(this.lock = true)
		return promise
	}

	#next() {
		fetch(...this.#queue[0].slice(1)).then(r => this.#resolve(r))			
    }

	#resolve(r) {
		this.#queue.shift().shift()(r)

		if (this.#queue.length == 0)
			this.lock = false
		else if (r.headers.get('x-ratelimit-remaining') == 0)
			setTimeout(r => this.#next(), r.headers.get('X-RateLimit-Reset') * 1e3 - Date.now())
		else
			this.#next()
	}
}

Object.assign(disbunia.prototype,
	await import('./resources/message'),
	await import('./resources/user')
)

export default disbunia