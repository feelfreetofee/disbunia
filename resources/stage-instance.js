export function CreateStageInstance(json, reason) {
	return this.fetch('/stage-instances', {
		headers: {
			'X-Audit-Log-Reason': reason
		},
		method: 'POST',
		json
	})
}

export function GetStageInstance(channel_id) {
	return this.fetch(`/stage-instances/${channel_id}`)
}

export function ModifyStageInstance(channel_id, json, reason) {
	return this.fetch(`/stage-instances/${channel_id}`, {
		headers: {
			'X-Audit-Log-Reason': reason
		},
		method: 'PATCH',
		json
	})
}

export function DeleteStageInstance(channel_id, reason) {
	return this.fetch(`/stage-instances/${channel_id}`, {
		headers: {
			'X-Audit-Log-Reason': reason
		},
		method: 'DELETE',
		json
	})
}