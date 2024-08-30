export function ListSKUSubscriptions(sku_id) {
	return this.fetch(`/skus/${sku_id}/subscriptions`)
}

export function GetSKUSubscription(sku_id, subscription_id) {
	return this.fetch(`/skus/${sku_id}/subscriptions/${subscription_id}`)
}