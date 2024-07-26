export function isBeforeMidnight(dateString) {
	const equipmentDate = new Date(dateString);
	const now = new Date();

	const midnight = new Date(now);
	midnight.setHours(0, 0, 0, 0);

	return equipmentDate < midnight;
}
