import React from 'react';
import { CalendarHeader } from './CalendarHeader';
import { WeekView } from './WeekView';

// 1. Accept events and isLoading props
export function CalendarView({ 
  currentDate, 
  setCurrentDate, 
  events, 
  isLoading,
  onEditEvent, // 1. Receive new props
  onDeleteEvent, 
}) {
  return (
    <div className="calendar-view">
      {/* Pass date props to the Header */}
      <CalendarHeader
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
      />
      {/* 2. Pass all relevant props down to WeekView */}
      <WeekView 
        currentDate={currentDate} 
        events={events} 
        isLoading={isLoading}
        onEditEvent={onEditEvent} // 2. Pass new prop down
        onDeleteEvent={onDeleteEvent}

      />
    </div>
  );
}
