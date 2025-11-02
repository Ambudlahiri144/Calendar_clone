import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { setHours, setMinutes } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export function EventModal({ event, startDate, onClose, onSave }) {
  const isEditing = !!event;

  const [title, setTitle] = useState(event?.title || '');
  const [start, setStart] = useState(
    event?.start || startDate || setHours(setMinutes(new Date(), 0), new Date().getHours() + 1)
  );
  const [end, setEnd] = useState(event?.end || setHours(setMinutes(new Date(), 0), new Date().getHours() + 2));
  const [allDay, setAllDay] = useState(event?.allDay || false);
  const [color, setColor] = useState(event?.color || 'blue');
  const [guestEmail, setGuestEmail] = useState('');
  const [guests, setGuests] = useState(event?.guests || []);

  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleSave = () => {
    if (!title) return alert('Event title is required!');
    if (start >= end && !allDay) return alert('End time must be after start time!');

    const eventData = {
      title,
      start: start.toISOString(),
      end: end.toISOString(),
      allDay,
      color,
      guests,
    };

    onSave(isEditing ? { ...eventData, id: event.id } : eventData);
  };

  const addGuest = () => {
    if (guestEmail && !guests.includes(guestEmail)) {
      setGuests([...guests, guestEmail]);
      setGuestEmail('');
    }
  };

  const removeGuest = (email) => {
    setGuests(guests.filter((g) => g !== email));
  };

  return (
    <div className="event-modal-overlay">
      <div className="event-modal-modern" ref={modalRef}>
        <div className="modal-header">
          <h2>{isEditing ? 'Edit Event' : 'Create Event'}</h2>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="modal-body-modern">
          <label>Event Title</label>
          <input
            type="text"
            placeholder="Enter event title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Start Date & Time</label>
          <DatePicker
            selected={start}
            onChange={(date) => {
              setStart(date);
              if (date >= end) setEnd(setHours(setMinutes(date, date.getMinutes()), date.getHours() + 1));
            }}
            showTimeSelect
            dateFormat="MMM d, yyyy h:mm aa"
            className="date-picker-modern"
          />

          {!allDay && (
            <>
              <label>End Time</label>
              <DatePicker
                selected={end}
                onChange={(date) => setEnd(date)}
                showTimeSelect
                dateFormat="MMM d, yyyy h:mm aa"
                className="date-picker-modern"
              />
            </>
          )}

          <label>
            <input
              type="checkbox"
              checked={allDay}
              onChange={(e) => setAllDay(e.target.checked)}
            />{' '}
            All Day Event
          </label>

          <label>Guests</label>
          <div className="guest-section">
            <input
              type="email"
              placeholder="Add guest email"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addGuest()}
            />
            <button onClick={addGuest} className="add-guest-btn">Add</button>
          </div>
          {guests.length > 0 && (
            <div className="guest-list-modern">
              {guests.map((email, i) => (
                <span key={i} className="guest-tag-modern">
                  {email}
                  <button onClick={() => removeGuest(email)}>×</button>
                </span>
              ))}
            </div>
          )}

          <label>Event Color</label>
          <div className="color-picker-modern">
            {['blue', 'green', 'red', 'purple', 'yellow'].map((c) => (
              <button
                key={c}
                className={`color-dot-modern ${c} ${color === c ? 'selected' : ''}`}
                onClick={() => setColor(c)}
              ></button>
            ))}
          </div>
        </div>

        <div className="modal-footer-modern">
          <button onClick={handleSave} className="save-event-btn-modern">
            {isEditing ? 'Update Event' : 'Save Event'}
          </button>
        </div>
      </div>
    </div>
  );
}
