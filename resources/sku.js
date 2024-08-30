export function ListSKUs(application_id) {
	return this.fetch(`/applications/${application_id}/skus`)
}