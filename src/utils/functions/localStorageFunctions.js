export function getLocalStorageValue(key) {
	const value = localStorage.getItem(key);
	if (value) {
		try {
			return JSON.parse(value);
		} catch (e) {
			console.error(`Error parsing local storage value for key "${key}":`, e);
			return null;
		}
	}
	return null;
}

export function setLocalStorageValue(key, value) {
	if (value !== undefined && value !== null) {
		localStorage.setItem(key, JSON.stringify(value));
		console.log(`Set local storage key "${key}" to:`, value);
	} else {
		console.error('Attempted to set local storage value to undefined or null');
	}
}
