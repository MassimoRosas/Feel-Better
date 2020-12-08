import React from 'react';
import { Redirect } from 'react-router-dom';
import Calendar from 'react-calendar';
import PropTypes from 'prop-types';
import 'react-calendar/dist/Calendar.css';
import Loader from 'src/components/Loader';

import './moodCalendar.scss';

const MoodCalendar = ({
  setDate,
  moodDatas,
  calendarDate,
  toggleShowMood,
  showMood,
  isLoading,
}) => {
  const userToken = localStorage.getItem('userToken');
  if (!userToken) {
    return <Redirect to="/login" />;
  }

  const formatDate = (date) => {
    // Convert the selected date object to a number of milliseconds passed since 01/01/1970
    // Add 24h to the selected date in order to use toISOString()
    // Otherwise, the dateFormatted is shifted by one day
    // Then, convert the number of milliseconds into an object
    // (by calling new Date a second time)
    const newDate = new Date(new Date(date).getTime() + (60 * 60 * 24 * 1000));
    // Convert date object to yyyy-mm-dd string format
    // Remove the part after T (timezone)
    // and get the first element from the array created by split()
    const dateFormatted = newDate.toISOString().split('T')[0];

    // Return the formatted date
    return dateFormatted;
  };

  // Find all data matching the picked date
  const findDate = moodDatas.filter((mood) => (
    mood.date === calendarDate
  ));

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <div className="calendar">
            <Calendar
              onClickDay={(value) => {
                // Save the date in the state
                setDate(formatDate(value));
                // Change the value of showMood to true
                toggleShowMood();
              }}
              // Maximum date the user can select (today)
              maxDate={new Date()}
              // Add custom class name to a give date
              tileClassName={({ date }) => {
                // date will return every date visible on calendar
                // For every object stored in the moodDatas array in the state,
                // check if the date in the object match the visible state in the calendar
                // Return an array with the corresponding object (date + mood)
                const activeDate = moodDatas.filter((currentMood) => (
                  currentMood.date === formatDate(date)
                ));
  
                // If array is not empty, return the custom class name
                if (activeDate.length > 0) {
                  return 'calendar-mood--active';
                }
  
                // Else, return empty string
                return '';
              }}
  
              tileContent={({ date }) => {
                const activeDate = moodDatas.filter((currentMood) => (
                  currentMood.date === formatDate(date)
                ));
  
                // If array is not empty, return the first mood icon from the mood array
                // corresponding to the date
                if (activeDate.length > 0) {
                  return <img src={`assets/images/moods/${activeDate[0].mood.moodName}.png`} alt="" />;
                }
  
                // Else, return empty div
                return <div className="empty-tile" />;
              }}
            />
  
            {showMood && (
              <div className="calendar-current-mood">
                {findDate.map((date) => (
                  <div className="calendar-current-mood-container" key={date.mood.id}>
                    <img className="calendar-current-mood-img" src={`assets/images/moods/${date.mood.moodName}.png`} alt="" />
                    <p className="calendar-current-mood-name">{date.mood.idea}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

MoodCalendar.propTypes = {
  setDate: PropTypes.func.isRequired,
  calendarDate: PropTypes.string.isRequired,
  toggleShowMood: PropTypes.func.isRequired,
  showMood: PropTypes.bool.isRequired,
  moodDatas: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string,
    mood: PropTypes.object,
  })).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default MoodCalendar;
