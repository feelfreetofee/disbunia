// WIP: https://discord.com/developers/docs/resources/message#get-channel-messages
export async function* getMessagesBefore(channel_id, limit = 50, before) {
	const url = `/channels/${channel_id}/messages?limit=${limit}`
	while (true) {
		const messages = await this.fetch(before ? url + `&before=${before}` : url)
		if (messages.length === 0)
			break
		yield messages
		if (messages.length < limit)
			break
		before = messages.at(-1).id
	}
}

export function GetChannelMessage(channel_id, message_id) {
	return this.fetch(`/channels/${channel_id}/messages/${message_id}`)
}

export function CreateMessage(channel_id, message) {
	return this.fetch(`/channels/${channel_id}/messages`, {
		method: 'POST',
		body: message
	})
}

export function CrosspostMessage(channel_id, message_id) {
	return this.fetch(`/channels/${channel_id}/messages/${channel_id}/crosspost`, {
		method: 'POST'
	})
}

// TODO: https://discord.com/developers/docs/resources/message#edit-message

export function DeleteMessage(channel_id, message_id, reason) {
	return this.fetch(`/channels/${channel_id}/messages/${message_id}`, {
		headers: {
			'X-Audit-Log-Reason': reason
		},
		method: 'DELETE'
	})
}

export function BulkDeleteMessages(channel_id, messages, reason) {
	return this.fetch(`/channels/${channel_id}/messages/bulk-delete`, {
		headers: {
			'X-Audit-Log-Reason': reason
		},
		method: 'POST',
		body: {messages}
	})
}