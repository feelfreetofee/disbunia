export function GetInvite(invite_code, params) {
	return this.fetch(`/invites/${invite_code}`, {
		params
	})
}

export function DeleteInvite(invite_code, reason) {
	return this.fetch(`/invites/${invite_code}`, {
		headers: {
			'X-Audit-Log-Reason': reason
		},
		method: 'DELETE'
	})
}