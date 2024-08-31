export function ListVoiceRegions() {
	return this.fetch('/voice/regions')
}

export function GetCurrentUserVoiceState(guild_id) {
	return this.fetch(`/guilds/${guild_id}/voice-states/@me`)
}

export function GetUserVoiceState(guild_id, user_id) {
	return this.fetch(`/guilds/${guild_id}/voice-states/${user_id}`)
}

export function ModifyCurrentUserVoiceState(guild_id, json) {
	return this.fetch(`/guilds/${guild_id}/voice-states/@me`, {
		method: 'PATCH',
		json
	})
}

export function ModifyUserVoiceState(guild_id, user_id, json) {
	return this.fetch(`/guilds/${guild_id}/voice-states/${user_id}`, {
		method: 'PATCH',
		json
	})
}