export function convertTimeStringToMinutes(timeString: string) {
	//timeString.split(":").map(item => Number(item));
	const [hour, minutes] = timeString.split(":").map(Number); 

	return (hour * 60) + minutes;
}