import React from 'react';
import { format, addDays, isSameDay, isToday } from 'date-fns';
import { TimeGutter } from './TimeGutter';
import { DayColumn } from './DayColumn';

export function WeekView({
  currentDate,
  events,
  isLoading,
  onEditEvent, // 1. Receive new prop
  onDeleteEvent, // 1. Receive new prop
}) {
  const days = [];
  const hours = Array.from({ length: 24 }, (_, i) => i); // 0-23

  for (let i = 0; i < 4; i++) {
    days.push(addDays(currentDate, i));
  }

  const getEventsForDay = (day) => {
    return events.filter(
      (event) => isSameDay(event.start, day) || isSameDay(event.end, day)
    );
  };

  return (
    <div className="week-view">
      <header className="grid-header">
        <div className="time-gutter-header">IST</div>
        <div className="days-header-row">
          {days.map((day) => (
            <div
              key={day.toString()}
              className={`day-header ${isToday(day) ? 'today' : ''}`}
            >
              {format(day, 'EEE')}
              <span className="day-number">{format(day, 'd')}</span>
            </div>
          ))}
        </div>
      </header>

      {isLoading ? (
        <div className="loading-indicator">Loading events...</div>
      ) : (
        <div className="grid-body">
          <TimeGutter hours={hours} />
          <div className="days-grid">
            {days.map((day) => (
              <DayColumn
                key={day.toString()}
                day={day}
                hours={hours}
                events={getEventsForDay(day)}
                onEditEvent={onEditEvent} // 2. Pass new prop down
                onDeleteEvent={onDeleteEvent} // 2. Pass new prop down
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}