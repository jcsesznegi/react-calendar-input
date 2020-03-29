import moment from 'moment';


const getCalendarDates = (year, month) => {
	const formatMonth = `0${month}`.slice(1);
	const currentDatetime = moment(`${year}-${formatMonth}-01`);
	const dayOfWeekIndex = parseInt(currentDatetime.format('e'), 10);
	const daysInMonth = currentDatetime.daysInMonth();

	const beforeDayCount = dayOfWeekIndex;
	const afterDayCount = 7 - (beforeDayCount + daysInMonth) % 7;
	const allDayCount = beforeDayCount + daysInMonth + afterDayCount;

  currentDatetime.subtract(dayOfWeekIndex, 'days');

  const calendarDates = [];
  let currentIndex = 0;

  calendarDates[currentIndex] = [];

  for (let i = 0; i < allDayCount; i++) {
    if (i > 0 && i % 7 === 0) {
      currentIndex++;
      calendarDates[currentIndex] = [];
    }


    calendarDates[currentIndex].push(currentDatetime.format('YYYY-MM-DD'));

    currentDatetime.add(1, 'days');
  }

  return calendarDates;
};

export { getCalendarDates };
