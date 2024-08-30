export function GetAnswerVotersAfter(channel_id, message_id, after, limit = 25) {
	return this.fetchAfter(`/channels/${channel_id}/polls/${message_id}/answers/${answer_id}`, {
		params: {
			after,
			limit
		}
	})
}

export function EndPoll(channel_id, message_id) {
	return this.fetch(`/channels/${channel_id}/polls/${message_id}/expire`, {
		method: 'POST'
	})
}