export function GetCurrentApplication() {
	return this.fetch('/applications/@me')
}

export function EditCurrentApplication(json) {
	return this.fetch('/applications/@me', {
		method: 'PATCH',
		json
	})
}

export function GetApplicationActivityInstance(application_id, instance_id) {
	return this.fetch(`/applications/${application_id}/activity-instances/${instance_id}`)
}