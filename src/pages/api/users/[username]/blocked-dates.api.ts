import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "GET") {
		return res.status(405).end();
	}

	const username = String(req.query.username);
	const { year, month } = req.query;

	if (!year || !month) {
		return res.status(400).json({ message: "Year or month not specified" });
	}

	const user = await prisma.user.findUnique({
		select: { id: true,	},
		where: { username: username	}
	});

	if (!user) {
		return res.status(400).json({ message: "User does not exist." });
	}

	const availableWeekDays = await prisma.userTimeInterval.findMany({
		select: { week_day: true }, 
		where: { user_id: user.id }
	});

	const blockedWeekDays = [0,1,2,3,4,5,6].filter(weekDay => {
		return !availableWeekDays.some(availableWeekDay => weekDay === availableWeekDay.week_day);
	});

	const blockedDatesRaw: Array<{date: number}> = await prisma.$queryRaw`
		SELECT 
		  EXTRACT(DAY FROM s.date) as date, 
		  count(1)as amount,
		  (UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60 as size
		FROM schedulings s LEFT OUTER JOIN user_time_intervals UTI ON (UTI.week_day = WEEKDAY(DATE_ADD(s.date, INTERVAL 1 DAY)))
		WHERE s.user_id = ${user.id}
		  AND DATE_FORMAT(s.date, '%Y-%m') = ${`${year}-${month}`}
		GROUP BY EXTRACT(DAY FROM s.date), UTI.time_end_in_minutes, UTI.time_start_in_minutes
		HAVING amount >= size
	`;

	const blockedDates = blockedDatesRaw.map(item => item.date);
	
	console.log(blockedDates);

	return res.json({ blockedWeekDays, blockedDates });
}