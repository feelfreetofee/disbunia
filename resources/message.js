export function GetChannelMessagesAround(channel_id, around, limit = 50) {
	return this.fetch(`/channels/${channel_id}/messages`, {
		params: {
			around,
			limit
		}
	})
}

export function GetChannelMessagesBefore(channel_id, before, limit = 50) {
	return this.fetchBefore(`/channels/${channel_id}/messages`, {
		params: {
			before,
			limit
		}
	})
}

export function GetChannelMessagesAfter(channel_id, after, limit = 50) {
	return this.fetchAfter(`/channels/${channel_id}/messages`, {
		params: {
			after,
			limit
		}
	})
}

export function GetChannelMessage(channel_id, message_id) {
	return this.fetch(`/channels/${channel_id}/messages/${message_id}`)
}

export function CreateMessage(channel_id, json, formData) {
	return this.fetch(`/channels/${channel_id}/messages`, {
		method: 'POST',
		json,
		formData
	})
}

export function CrosspostMessage(channel_id, message_id) {
	return this.fetch(`/channels/${channel_id}/messages/${message_id}/crosspost`, {
		method: 'POST'
	})
}

// TODO: Reaction methods

export function EditMessage(channel_id, message_id, json, formData) {
	return this.fetch(`/channels/${channel_id}/messages/${message_id}`, {
		method: 'POST',
		json,
		formData
	})
}

export function DeleteMessage(channel_id, message_id, reason) {
	return this.fetch(`/channels/${channel_id}/messages/${message_id}`, {
		headers: {
			'X-Audit-Log-Reason': reason
		},
		method: 'DELETE'
	})
}

export function BulkDeleteMessages(channel_id, messages, reason) {
	if (messages.length < 2)
		return this.DeleteMessage(channel_id, messages[0], reason)
	return this.fetch(`/channels/${channel_id}/messages/bulk-delete`, {
		headers: {
			'X-Audit-Log-Reason': reason
		},
		method: 'POST',
		json: {
			messages
		}
	})
}