import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { CalendarView } from './components/CalendarView';
import { EventModal } from './components/EventModal';
import axios from 'axios';
import './App.css';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStartDate, setModalStartDate] = useState(null);

  // --- NEW STATE FOR EDITING ---
  const [editingEvent, setEditingEvent] = useState(null);

  const fetchEvents = () => {
    setIsLoading(true);
    axios
      .get('http://localhost:8000/api/events/')
      .then((response) => {
        const formattedEvents = response.data.map((event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
        setEvents(formattedEvents);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // --- MODAL FUNCTIONS ---
  const openCreateModal = (date) => {
    setEditingEvent(null); // Ensure we're not in edit mode
    setModalStartDate(date);
    setIsModalOpen(true);
  };

  // --- NEW: Function to open modal for editing ---
  const openEditModal = (event) => {
    setEditingEvent(event); // Set the event to edit
    setModalStartDate(null); // Not creating, so clear this
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalStartDate(null);
    setEditingEvent(null); // Clear editing state on close
  };

  // --- UPDATED: Function to CREATE or UPDATE an event ---
  const handleSaveEvent = (eventData) => {
    // The 'id' will be undefined if it's a new event
    const { id, ...data } = eventData; 

    if (id) {
      // --- UPDATE (PUT) ---
      // We send 'data' which does not include the id in the body
      axios
        .put(`http://localhost:8000/api/events/${id}/`, data)
        .then((response) => {
          // Find and replace the event in the local state
          const updatedEvent = {
            ...response.data,
            start: new Date(response.data.start),
            end: new Date(response.data.end),
          };
          setEvents(
            events.map((e) => (e.id === updatedEvent.id ? updatedEvent : e))
          );
          handleCloseModal();
        })
        .catch((error) => {
          console.error('Error updating event:', error.response?.data);
          // alert('Error updating event. Check console.');
        });
    } else {
      // --- CREATE (POST) ---
      // 'data' already has everything we need
      axios
        .post('http://localhost:8000/api/events/', data)
        .then((response) => {
          const newEvent = {
            ...response.data,
            start: new Date(response.data.start),
            end: new Date(response.data.end),
          };
          setEvents([...events, newEvent]);
          handleCloseModal();
        })
        .catch((error) => {
          console.error('Error saving event:', error.response?.data);
          // alert('Error saving event. Check console.');
        });
    }
  };

  // --- NEW: Function to DELETE an event ---
  const handleDeleteEvent = (eventId) => {
    axios
      .delete(`http://localhost:8000/api/events/${eventId}/`)
      .then(() => {
        // Remove the event from the local state
        setEvents(events.filter((e) => e.id !== eventId));
      })
      .catch((error) => {
        console.error('Error deleting event:', error.response?.data);
        // alert('Error deleting event. Check console.');
      });
  };

  return (
    <div
      className="app-container"
      data-theme={isDarkMode ? 'dark' : 'light'}
    >
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        openCreateModal={openCreateModal}
      />
      
      <CalendarView
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        events={events}
        isLoading={isLoading}
        // --- Pass new handlers down ---
        onEditEvent={openEditModal}
        onDeleteEvent={handleDeleteEvent}
      />

      {isModalOpen && (
        <EventModal
          event={editingEvent} // Pass the event to edit (or null if creating)
          startDate={modalStartDate}
          onClose={handleCloseModal}
          onSave={handleSaveEvent}
        />
      )}
    </div>
  );
}

