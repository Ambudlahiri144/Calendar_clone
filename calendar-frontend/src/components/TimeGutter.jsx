import React from 'react';

const formatHour = (hour) => {
  if (hour === 12) return '12 PM';
  if (hour > 12) return `${hour - 12} PM`;
  return `${hour} AM`;
};

// hours: Array of numbers [9, 10, 11, ...]
export function TimeGutter({ hours }) {
  return (
    <div className="time-gutter">
      <div className="time-gutter-all-day">All Day</div>
      {hours.map((hour) => (
        <div key={hour} className="time-slot-label" data-time={formatHour(hour)}>
          {/* Time is shown via ::before pseudo-element */}
        </div>
      ))}
    </div>
  );
}
