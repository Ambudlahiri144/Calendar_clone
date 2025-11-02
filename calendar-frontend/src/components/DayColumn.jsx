import React from 'react';
import { Event } from './Event';
import { isToday, getHours, getMinutes } from 'date-fns';

export function DayColumn({
  day,
  hours,
  events,
  onEditEvent, // 1. Receive new props
  onDeleteEvent, // 1. Receive new props
}) {
  const allDayEvents = events.filter((event) => event.allDay);
  const timedEvents = events.filter((event) => !event.allDay);

  const now = new Date();
  const isTodayColumn = isToday(day);
  const minutesSinceMidnight = now.getHours() * 60 + now.getMinutes();
  // Calculate top position: (current minutes / total minutes in day) * total height
  // Total height = 60px * 24 hours = 1440px
  const topPosition = (minutesSinceMidnight / 1440) * (60 * hours.length);

  return (
    <div className={`day-column ${isTodayColumn ? 'today' : ''}`}>
      <div className="all-day-row">
        {allDayEvents.map((event, index) => (
          <Event
            key={event.id || index}
            event={event}
            onEdit={() => onEditEvent(event)} // 2. Pass handlers to Event
            onDelete={() => onDeleteEvent(event.id)} // 2. Pass handlers to Event
          />
        ))}
      </div>

      <div className="time-grid-slots">
        {hours.map((hour) => (
          <div key={hour} className="time-slot"></div>
        ))}

        {isTodayColumn && (
          <div className="time-line" style={{ top: `${topPosition}px` }}></div>
        )}

        {timedEvents.map((event, index) => (
          <Event
            key={event.id || index}
            event={event}
            onEdit={() => onEditEvent(event)} // 2. Pass handlers to Event
            onDelete={() => onDeleteEvent(event.id)} // 2. Pass handlers to Event
          />
        ))}
      </div>
    </div>
  );
}