import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { getCalendarDates } from '../constants/index';

export default class Calendar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			year: 2020,
			month: 4,
			calendarDates: getCalendarDates(2020, 4),
			calendarIsDisplay: false,
		}

    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handlePrevMonthClick = this.handlePrevMonthClick.bind(this);
    this.handleNextMonthClick = this.handleNextMonthClick.bind(this);
	}

  getCalendarDate() {
	  const formatMonth = `0${this.state.month}`.slice(1);
	  return moment(`${this.state.year}-${formatMonth}-01`);
  }

  setCalendarDate(newDate) {
    const year = parseInt(newDate.format('YYYY'), 10);
    const month = parseInt(newDate.format('M'), 10);

    this.setState({
      year,
      month,
      calendarDates: getCalendarDates(year, month),
    });
  }

  handleInputFocus() {
    this.setState({calendarIsDisplay: true});
  }

  handlePrevMonthClick() {
    this.setCalendarDate(this.getCalendarDate().subtract(1, 'months')) ;
  }

  handleNextMonthClick() {
    this.setCalendarDate(this.getCalendarDate().add(1, 'months')) ;
  }

  renderCalendarRows() {
    return this.state.calendarDates.map((calendarDateRow) => {
      const calendarDays = calendarDateRow.map((calendarDay) => {
        const day = moment(calendarDay);

        return (
          <td>
            {day.format('D')}
          </td>
        );
      });
      
      return (
        <tr>
          {calendarDays}
        </tr>
      );
    });
  }

  renderCalendar() {
    if (!this.state.calendarIsDisplay) return null;

    const calendarRows = this.renderCalendarRows();
	  const formatMonth = `0${this.state.month}`.slice(1);
    const currentMonth = moment(`${this.state.year}-${formatMonth}-01`).format('MMM');

    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th colSpan="7">
                <button
                  onClick={this.handlePrevMonthClick}
                  >Prev
                </button>
                {currentMonth}
                <button
                  onClick={this.handleNextMonthClick}
                  >Next
                </button>
              </th>
            </tr>
            <tr>
              <th>Sun</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
            </tr>
            {calendarRows}
          </tbody>
        </table>
      </div>
    );
  }

	render() {
    const calendar = this.renderCalendar();

		return (
			<label>
        <input
          type="text"
          onFocus={this.handleInputFocus}
          /> 
        {calendar}
			</label>
		);
	}
};

Calendar.propTypes = {
  selectedDate: PropTypes.string.isRequired,
  onCalendarDayClick: PropTypes.func.isRequired
};
