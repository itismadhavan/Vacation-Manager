import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Calendar from './calender/Calendar';
import CalendarControls from './calender/CalendarControls'
import './calender/style.css';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    const today = moment();

    const customCSSclasses = {
      holidays: ['2019-04-25', '2019-05-01', '2019-06-02', '2019-08-15', '2019-11-01'],
      spring: {
        start: '2019-03-21',
        end: '2019-6-20'
      },
      summer: {
        start: '2019-06-21',
        end: '2019-09-22'
      },
      autumn: {
        start: '2019-09-23',
        end: '2019-12-21'
      },
      weekend: 'Sat,Sun',
      winter: day => day.isBefore(moment([2019, 2, 21])) || day.isAfter(moment([2019, 11, 21]))
    };

    this.state = {
      year: today.year(),
      selectedDay: today,
      selectedRange: [today, moment(today).add(15, 'day')],
      showDaysOfWeek: true,
      showTodayBtn: true,
      showWeekSeparators: true,
      selectRange: false,
      firstDayOfWeek: 1, // monday
      customCSSclasses
    };
  }

  onPrevYear() {
    this.setState(prevState => ({
      year: prevState.year - 1
    }));
  }

  onNextYear() {
    this.setState(prevState => ({
      year: prevState.year + 1
    }));
  }

  goToToday() {
    const today = moment();

    this.setState({
      selectedDay: today,
      selectedRange: [today, moment(today).add(15, 'day')],
      year: today.year()
    });
  }

  datePicked(date) {
    this.setState({
      selectedDay: date,
      selectedRange: [date, moment(date).add(15, 'day')]
    });
  }

  rangePicked(start, end) {
    this.setState({
      selectedRange: [start, end],
      selectedDay: start
    });
  }

  toggleShowDaysOfWeek() {
    this.setState(prevState => ({
      showDaysOfWeek: !prevState.showDaysOfWeek
    }));
  }

  toggleForceFullWeeks() {
    this.setState(prevState => ({
      showDaysOfWeek: true,
      forceFullWeeks: !prevState.forceFullWeeks
    }));
  }

  toggleShowTodayBtn() {
    this.setState(prevState => ({
      showTodayBtn: !prevState.showTodayBtn
    }));
  }

  toggleShowWeekSeparators() {
    this.setState(prevState => ({
      showWeekSeparators: !prevState.showWeekSeparators
    }));
  }

  toggleSelectRange() {
    this.setState(prevState => ({
      selectRange: !prevState.selectRange
    }));
  }

  selectFirstDayOfWeek(event) {
    this.setState({
      firstDayOfWeek: parseInt(event.target.value, 10)
    });
  }

  updateClasses() {
    const { customCSSclasses } = this.state;
    const input = this.customClassesInput.value;
    const context = { customCSSclasses, moment };

    try {
      // safeEval(input, context);
      const nextCustomCSSclasses = context.customCSSclasses;
      this.setState({
        customCSSclasses: nextCustomCSSclasses,
        customClassesError: false
      });
    } catch (e) {
      this.setState({
        customClassesError: true
      });
      throw e;
    }
  }

  render() {
    const {
      year,
      showTodayBtn,
      selectedDay,
      showDaysOfWeek,
      forceFullWeeks,
      showWeekSeparators,
      firstDayOfWeek,
      selectRange,
      selectedRange,
      customCSSclasses
    } = this.state;

    return (
      <div>
        <div id="calendar">
          <CalendarControls
            year={year}
            showTodayButton={showTodayBtn}
            onPrevYear={() => this.onPrevYear()}
            onNextYear={() => this.onNextYear()}
            goToToday={() => this.goToToday()}
          />
          <Calendar
            year={year}
            selectedDay={selectedDay}
            showDaysOfWeek={showDaysOfWeek}
            forceFullWeeks={forceFullWeeks}
            showWeekSeparators={showWeekSeparators}
            firstDayOfWeek={firstDayOfWeek}
            selectRange={selectRange}
            selectedRange={selectedRange}
            onPickDate={(date, classes) => this.datePicked(date, classes)}
            onPickRange={(start, end) => this.rangePicked(start, end)}
            customClasses={customCSSclasses}
          />
        </div>
      </div>)
  }
}

const mapStateToProps = state => {
  return {
    allStocks: state.allStocks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchStocks: () => {
      dispatch({ type: "FETCH_STOCKS" });
    }
  };
};

export default Dashboard;
