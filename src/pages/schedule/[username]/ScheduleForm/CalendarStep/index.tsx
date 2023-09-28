import { Calendar } from "@/components/Calendar";
import { Container, TimePicker, TimePickerItem, TimePickerHeader, TimePickerList } from "./styles";
import { useState } from "react";
import dayjs from "dayjs";
import { api } from "@/lib/axios";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

interface Availabilty {
	availableTimes: number[],
	possibilityTimes: number[]
}

export function CalendarStep() {
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	//const [availabilty, setAvailabilty] = useState<Availabilty | null>(null);

	const router = useRouter();
	const username = String(router.query.username);

	const isDateSelected = !!selectedDate;
	const weekDay = selectedDate ? dayjs(selectedDate).format("dddd") : null;
	const descDate = selectedDate ? dayjs(selectedDate).format("DD[ de ]MMMM") : null;
	const selectedDateWithoutTime = selectedDate ? dayjs(selectedDate).format("YYYY-MM-DD") : null;

	const { data: availabilty } = useQuery<Availabilty>(
		["availabilty", selectedDateWithoutTime], 
		async () => {
			const response = await api.get(`/users/${username}/availability`, {
				params: {
					date: selectedDateWithoutTime
				}
			});

			return response.data;
		},
		{
			enabled: !!selectedDate
		}
	);
	
	// useEffect(() => {
	// 	if (!selectedDate) {
	// 		return;
	// 	}
	//
	// 	api.get(`/users/${username}/availability`, {
	// 		params: {
	// 			date: selectedDateWithoutTime,
	// 		}
	// 	}).then(response => {
	// 		setAvailabilty(response.data);
	// 	});
	// }, [selectedDate, username]);

	return (
		<Container isTimePickerOpen={isDateSelected}>
			<Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />

			{isDateSelected && (
				<TimePicker>
					<TimePickerHeader>
						{weekDay} <span>{descDate}</span>
					</TimePickerHeader>

					<TimePickerList>
						{availabilty?.possibilityTimes?.map(hour => {
							return (
								<TimePickerItem 
									key={hour} 
									disabled={!availabilty.availableTimes.includes(hour)}
								>
									{String(hour).padStart(2, "0")}:00h
								</TimePickerItem>
							);
						})}
					</TimePickerList>
				</TimePicker>
			)}
		</Container>
	);
}