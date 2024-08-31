export function GetCurrentUser() {
	return this.fetch('/users/@me')
}

export function GetUser(user_id) {
	return this.fetch(`/users/${user_id}`)
}

export function ModifyCurrentUser(json) {
	return this.fetch('/users/@me', {
		method: 'PATCH',
		json
	})
}

export function GetCurrentUserGuildsBefore(before, limit = 200, with_counts) {
	return this.fetchBefore('/users/@me/guilds', {
		params: {
			before,
			limit,
			with_counts
		}
	})
}

export function GetCurrentUserGuildsAfter(after, limit = 200, with_counts) {
	return this.fetchAfter(`/users/@me/guilds`, {
		params: {
			after,
			limit,
			with_counts
		}
	})
}

export function GetCurrentUserGuildMember(guild_id) {
	return this.fetch(`/users/@me/guilds/${guild_id}/member`)
}

export function LeaveGuild(guild_id) {
	return this.fetch(`/users/@me/guilds/${guild_id}`, {
		method: 'DELETE'
	})
}

export function CreateDM(recipient_id) {
	return this.fetch('/users/@me/channels', {
		method: 'POST',
		json: {
			recipient_id
		}
	})
}

export function CreateGroupDM(access_tokens, nicks) {
	return this.fetch('/users/@me/channels', {
		method: 'POST',
		json: {
			access_tokens,
			nicks
		}
	})
}

export function GetCurrentUserConnections() {
	return this.fetch('/users/@me/connections')
}

export function GetCurrentUserApplicationRoleConnection(application_id) {
	return this.fetch(`/users/@me/applications/${application_id}/role-connection`)
}

export function UpdateCurrentUserApplicationRoleConnection(application_id, json) {
	return this.fetch(`/users/@me/applications/${application_id}/role-connection`, {
		method: 'PUT',
		json
	})
}