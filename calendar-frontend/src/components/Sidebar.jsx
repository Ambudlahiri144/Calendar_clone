import React, { useState } from 'react';
import {
  Search,
  Settings,
  HelpCircle,
  ChevronLeft,
  Moon,
  Sun,
  Plus,
  ChevronDown,
} from 'lucide-react';
import { MiniCalendar } from './MiniCalendar'; // 1. Import the new component

export function Sidebar({
  isCollapsed,
  setIsCollapsed,
  isDarkMode,
  setIsDarkMode,
  currentDate, // 2. Accept the new props
  setCurrentDate, // 2. Accept the new props
  openCreateModal,
}) {
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);

  const toggleCreateMenu = () => {
    // Don't open the dropdown if the sidebar is collapsed
    if (isCollapsed) {
      setIsCollapsed(false); // Expand the sidebar instead
      return;
    }
    setIsCreateMenuOpen(!isCreateMenuOpen);
  };

  // Simplified NavItem (now only used in footer)
  const NavItem = ({ icon: Icon, text }) => (
    <a href="#" className="nav-item">
      <Icon size={20} />
      {!isCollapsed && <span>{text}</span>}
    </a>
  );
  const handleEventClick = () => {
    openCreateModal(currentDate); // Pass the currently selected date
    setIsCreateMenuOpen(false); // Close the dropdown
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <svg
          className="logo"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="32" height="32" rx="8" fill="#6366F1" />
          <path
            d="M12 11L15.2929 14.2929C15.6834 14.6834 15.6834 15.3166 15.2929 15.7071L12 19"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M18 11L21.2929 14.2929C21.6834 14.6834 21.6834 15.3166 21.2929 15.7071L18 19"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        {!isCollapsed && <h1 className="logo-text">Calendar</h1>}
      </div>

      <div className="sidebar-content">
        <div className="create-section">
          <button className="create-button" onClick={toggleCreateMenu}>
            <Plus size={20} />
            {!isCollapsed && <span className="create-text">Create</span>}
            {!isCollapsed && (
              <ChevronDown
                size={16}
                className={`dropdown-arrow ${isCreateMenuOpen ? 'open' : ''}`}
              />
            )}
          </button>
          {isCreateMenuOpen && !isCollapsed && (
            <div className="create-dropdown">
              <button onClick={handleEventClick}>Event</button>
              <button>Task</button>
              <button>Appointment schedule</button>
            </div>
          )}
        </div>

        

        {/* 3. OLD Nav is removed and REPLACED with MiniCalendar */}
        {!isCollapsed && (
          <MiniCalendar
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
          />
        )}

        <div className="sidebar-section">
          {!isCollapsed && <span className="section-title">Theme</span>}
          <div className="theme-toggles">
            <div
              className="theme-color"
              style={{ backgroundColor: '#6366F1' }}
            ></div>
            <div
              className="theme-color"
              style={{ backgroundColor: '#EF4444' }}
            ></div>
            <div
              className="theme-color"
              style={{ backgroundColor: '#10B981' }}
            ></div>
            <div
              className="theme-color"
              style={{ backgroundColor: '#F59E0B' }}
            ></div>
            <div
              className="theme-color"
              style={{ backgroundColor: '#3B82F6' }}
            ></div>
          </div>
        </div>

        <div className="sidebar-section">
          <label htmlFor="dark-mode-toggle" className="dark-mode-label">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            {!isCollapsed && <span>{isDarkMode ? 'Light' : 'Dark'} mode</span>}
          </label>
          <label className="switch">
            <input
              id="dark-mode-toggle"
              type="checkbox"
              checked={isDarkMode}
              onChange={() => setIsDarkMode(!isDarkMode)}
            />
            <span className="slider round"></span>
          </label>
        </div>

        <div
          className="nav-item"
          style={{ marginTop: '1.5rem', width: '100%' }}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <ChevronLeft
            size={20}
            style={{
              transition: 'transform 0.3s ease',
              transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
          {!isCollapsed && <span>Collapsed</span>}
        </div>

        
      </div>
    </aside>
  );
}