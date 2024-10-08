import {default as queue} from './queue'

class disbunia {
	#baseURL = 'https://discord.com/api'

	#token
	constructor(token) {
		this.#token = token
		this.queue = new queue
	}

	fetch(resource, options) {
		if (options?.params)
			resource += '?' + new URLSearchParams(
				Object.entries(options.params)
				.filter(r => r[0] !== undefined)
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

		return this.queue.push(this.#baseURL + resource, {
			headers,
			method: options?.method,
			body
		})
	}
}

Object.assign(disbunia.prototype,
	await import('./paginator'),
	await import('./resources/application'),
	await import('./resources/invite'),
	await import('./resources/message'),
	await import('./resources/poll'),
	await import('./resources/sku'),
	await import('./resources/stage-instance'),
	await import('./resources/subscription'),
	await import('./resources/user'),
	await import('./resources/voice')
)

export default disbunia