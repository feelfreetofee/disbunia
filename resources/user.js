export function GetUser(user_id = '@me') {
	return this.fetch(`/users/${user_id}`)
}

export function ModifyCurrentUser(user) {
	return this.fetch('/users/@me', {
		method: 'PATCH',
		body: user
	})
}

// TODO: https://discord.com/developers/docs/resources/user#get-current-user-guilds

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
		body: {recipient_id}
	})
}

// Deprecated? https://discord.com/developers/docs/resources/user#create-group-dm

export function GetCurrentUserConnections() {
	return this.fetch('/users/@me/connections')
}

export function GetCurrentUserApplicationRoleConnection(application_id) {
	return this.fetch(`/users/@me/applications/${application_id}/role-connection`)
}

export function UpdateCurrentUserApplicationRoleConnection(role_connection) {
	return this.fetch(`/users/@me/applications/${application_id}/role-connection`, {
		method: 'PUT',
		body: role_connection
	})
}