import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, add, sub } from 'date-fns';

export function CalendarHeader({ currentDate, setCurrentDate }) {
  
  const handleNextWeek = () => {
    setCurrentDate(add(currentDate, { weeks: 1 }));
  };

  const handlePrevWeek = () => {
    setCurrentDate(sub(currentDate, { weeks: 1 }));
  };

  // Format the date range for the header
  const month = format(currentDate, 'MMMM');
  const year = format(currentDate, 'yyyy');

  return (
    <header className="calendar-header">
      <div className="header-left">
        <h1 className="calendar-title">Today</h1>
      </div>
      
      <div className="header-center">
        <button className="nav-arrow" onClick={handlePrevWeek}>
          <ChevronLeft size={20} />
        </button>
        <span className="month-label">{month} {year}</span>
        <button className="nav-arrow" onClick={handleNextWeek}>
          <ChevronRight size={20} />
        </button>
      </div>
      
      <div className="header-right">
        <span>IST</span>
      </div>
    </header>
  );
}

