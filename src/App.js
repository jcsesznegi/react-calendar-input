import React from 'react';
import Calendar from './components/Calendar.jsx';

function App() {
  return (
    <div className="App">
			<Calendar
			  selectedDate=""
			  onCalendarDayClick={() => {}}
				/>
    </div>
  );
}

export default App;
