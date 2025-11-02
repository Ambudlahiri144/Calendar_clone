import React, { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addMonths,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function MiniCalendar({ currentDate, setCurrentDate }) {
  // This state tracks the month the user is *viewing* in the mini-calendar,
  // which can be different from the currentDate (the selected day).
  const [visibleMonth, setVisibleMonth] = useState(currentDate);

  const prevMonth = () => setVisibleMonth(addMonths(visibleMonth, -1));
  const nextMonth = () => setVisibleMonth(addMonths(visibleMonth, 1));

  // Get all days to render in the 6x7 grid
  const startDay = startOfWeek(startOfMonth(visibleMonth));
  const endDay = endOfWeek(endOfMonth(visibleMonth));
  const days = eachDayOfInterval({ start: startDay, end: endDay });

  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const handleDayClick = (day) => {
    setCurrentDate(day); // Update the main app's selected date
    setVisibleMonth(day); // Sync visible month on click
  };

  return (
    <div className="mini-calendar">
      <div className="mini-calendar-header">
        <span className="month-label">
          {format(visibleMonth, 'MMMM yyyy')}
        </span>
        <div className="nav-buttons">
          <button onClick={prevMonth} className="nav-arrow">
            <ChevronLeft size={18} />
          </button>
          <button onClick={nextMonth} className="nav-arrow">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <div className="mini-calendar-grid">
        {dayNames.map((day) => (
          <div key={day} className="day-name">
            {day}
          </div>
        ))}
      </div>
      <div className="mini-calendar-grid">
        {days.map((day) => (
          <button
            key={day.toString()}
            onClick={() => handleDayClick(day)}
            className={`day-cell 
              ${!isSameMonth(day, visibleMonth) ? 'not-current-month' : ''}
              ${isToday(day) ? 'today' : ''}
              ${isSameDay(day, currentDate) ? 'selected' : ''}
            `}
          >
            {format(day, 'd')}
          </button>
        ))}
      </div>
    </div>
  );
}

