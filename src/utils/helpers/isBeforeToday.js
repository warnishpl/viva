export function isBeforeMidnight(dateString) {
	const equipmentDate = new Date(dateString);
	const now = new Date();

	// Ustawienie godziny na północ dzisiejszego dnia
	const midnight = new Date(now);
	midnight.setHours(0, 0, 0, 0);

	// Sprawdzenie, czy data sprzętu jest przed północą dzisiejszego dnia
	return equipmentDate < midnight;
}
