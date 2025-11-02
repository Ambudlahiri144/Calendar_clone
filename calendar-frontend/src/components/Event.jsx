import React, { useState, useRef, useEffect } from 'react';
import {
  MapPin,
  MoreVertical,
  Edit,
  Trash2,
  Bell,
  Minimize2,
} from 'lucide-react';
import { format } from 'date-fns';

// Helper function to calculate event position
const getEventPosition = (start, end) => {
  const startHour = start.getHours();
  const startMinute = start.getMinutes();
  const endHour = end.getHours();
  const endMinute = end.getMinutes();

  // Total minutes from midnight for start and end
  const totalStartMinutes = startHour * 60 + startMinute;
  const totalEndMinutes = endHour * 60 + endMinute;

  // Calculate duration in minutes
  const duration = totalEndMinutes - totalStartMinutes;

  // Calculate top and height
  // 1 minute = 1px (since 1 hour = 60px)
  const top = totalStartMinutes;
  // Ensure a minimum height for short events
  const height = Math.max(duration, 20); 

  return { top, height };
};

// 1. Accept new props: onEdit and onDelete
export function Event({ event, onEdit, onDelete }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  
  // This hook handles closing the menu if you click outside of it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]); // Dependency array includes menuRef

  if (event.allDay) {
    return (
      <div className={`event all-day-event event-${event.color || 'gray'}`}>
        <div className="event-content">
          <span className="event-title">{event.title}</span>
        </div>
        {/* You could add a menu here too if needed */}
      </div>
    );
  }

  // --- Timed Event Logic ---
  // We assume event.start and event.end are valid Date objects
  const { top, height } = getEventPosition(event.start, event.end);

  const style = {
    top: `${top}px`,
    height: `${height}px`,
  };
  
  // Mock participants for styling
  const participants = [
    'https://placehold.co/20x20/6366F1/FFFFFF?text=A',
    'https://placehold.co/20x20/F59E0B/FFFFFF?text=B',
  ];

  // 2. Click handlers for the menu buttons
  const handleEditClick = (e) => {
    e.stopPropagation(); // Prevent event from bubbling up
    onEdit(); // Call the onEdit function passed from App.jsx
    setIsMenuOpen(false);
  };
  
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(); // Call the onDelete function passed from App.jsx
    setIsMenuOpen(false);
  };

  return (
    <div
      className={`event timed-event event-${event.color || 'gray'}`}
      style={style}
    >
      <div className="event-content">
        <div className="event-header">
          <span className="event-title">{event.title}</span>
          <span className="event-time">
            {format(event.start, 'h:mm a')} - {format(event.end, 'h:mm a')}
          </span>
        </div>
        
        <div className="event-location">
          <MapPin size={12} />
          <span>Kolkata CCU</span>
        </div>
        
        <div className="event-participants">
          {participants.slice(0, 2).map((p, i) => (
            <img key={i} src={p} alt={`Participant ${i + 1}`} />
          ))}
          {participants.length > 2 && (
            <span className="participants-more">12+</span>
          )}
        </div>
      </div>
      
      {/* Event Menu */}
      <div className="event-menu-container" ref={menuRef}> {/* Assign ref */}
        <button className="event-menu-btn" onClick={(e) => {
          e.stopPropagation();
          setIsMenuOpen(!isMenuOpen);
        }}>
          <MoreVertical size={16} />
        </button>
        {isMenuOpen && (
          <div className="event-menu-dropdown">
            <button><Bell size={14} /> Set reminder</button>
            <button><Minimize2 size={14} /> Minimize</button>
            <div className="menu-divider"></div>
            {/* 3. Wire up the buttons */}
            <button onClick={handleEditClick}><Edit size={14} /> Edit</button>
            <button className="delete" onClick={handleDeleteClick}><Trash2 size={14} /> Delete</button>
          </div>
        )}
      </div>
    </div>
  );
}
