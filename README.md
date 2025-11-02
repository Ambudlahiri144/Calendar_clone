# 🗓️ Calendar Clone — Full-Stack Modern Calendar Application

This project is a **high-fidelity, full-stack clone** of a modern calendar application, built from scratch with a **React (Vite)** frontend and a **Django (Python)** backend.  

It features:
- A custom-built **weekly grid**
- **Dynamic event rendering**
- **Full CRUD operations**
- **Functional light/dark mode**


---

## 🧠 Tech Stack

### **Frontend**

- **React (Vite)** — A fast, modern React framework for a component-based UI.  
- **date-fns** — A lightweight and powerful library for date calculations and formatting.  
- **axios** — Handles all HTTP requests to the backend API.  
- **lucide-react** — A clean and modern icon library.  
- **Custom CSS** — All styling is written from scratch using CSS Variables (no UI libraries), allowing full design control and easy dark/light mode toggling.

### **Backend**

- **Django** — A high-level Python web framework for rapid and secure backend development.  
- **Django REST Framework (DRF)** — Industry standard for building robust Web APIs in Django.  
- **django-cors-headers** — Handles Cross-Origin Resource Sharing (CORS) between the frontend and backend.

### **Database**

- **PostgreSQL** — A powerful, open-source object-relational database system, ideal for complex queries and event data.

---

## ⚙️ Setup and Running

You will need **two terminals** open to run both the backend and frontend servers.

### 🧩 Prerequisites

- **Python 3.10+**  
- **Node.js 18+**  
- **PostgreSQL** (running locally or on a server)

---

## 🖥️ 1. Backend Setup (Django)

### Clone the repository:
```bash
git clone https://github.com/Ambudlahiri144/Calendar_clone.git
cd Calendar_clone/calendar_backend
```
### 🧰 Create and Activate a Virtual Environment

#### 🪟 **Windows**
```bash
python -m venv venv
.\venv\Scripts\activate
```
#### 🪟 **macOS/Linux**
```bash
python3 -m venv venv
source venv/bin/activate
```
### Install dependencies:

#### If you already have a requirements.txt file:
```bash
pip install -r requirements.txt
```
#### Otherwise, manually install them:
```bash
pip install django djangorestframework psycopg2-binary django-cors-headers
```
### Set up the PostgreSQL Database:

#### Open psql and create a new database:
```sql
CREATE DATABASE cal_clone;
```
#### You may also create a dedicated user/password.
#### Then, update the DATABASES setting in calendar_backend/calendar_backend/settings.py with your database credentials.
#### Run database migrations:
```bash
python manage.py makemigrations api
python manage.py migrate

```
#### Run backend server:
```bash
python manage.py runserver

```
#### Your backend API should now be running at: http://localhost:8000

---  

## 2. Frontend Setup (React + Vite)

### Open a new terminal and navigate to the frontend folder:
```bash
cd ../calendar_frontend

```
### Install dependencies:
```bash
npm install

```
### Run the frontend server:
```bash
npm run dev

```
### Your application should now be running at: http://localhost:5173

---

## Key Features & Implementation

### This project was built from scratch to demonstrate full control over both the UI and business logic.

---

### 🧱 Full-Stack CRUD

#### 🟢 **Create**
- A modal is used to create new events.  
- Data is sent via `axios.post` to `api/events/`.  
- The local state updates upon success.

#### 🔵 **Read**
- On app load, `App.jsx` fetches all events from `api/events/` using `axios.get`.

#### 🟡 **Update**
- Clicking **Edit** opens the same modal pre-filled with the event’s data.  
- Saving triggers an `axios.put` request to `api/events/<id>/`.  
- The updated event replaces the old one in the local state.

#### 🔴 **Delete**
- Clicking **Delete** confirms the action and sends an `axios.delete` request to `api/events/<id>/`.  
- The deleted event is filtered out of the local state.

---

### 🧭 Centralized State Management

All key application state is managed in **`App.jsx`**:

- **`events`** — Array containing all event objects.  
- **`currentDate`** — The main date reference shared by `MiniCalendar` and `WeekView`.  
- **`isModalOpen`** — Boolean controlling the visibility of the event modal.  
- **`editingEvent`** — Holds the event currently being edited (or `null` when creating a new one).

---
### 🧩 Dynamic Event Rendering

The **most complex part** of the UI.

#### 🕒 **Time Grid**
- `DayColumn.jsx` renders **24 divs** (one for each hour), creating a **1440-pixel-tall grid** (`24 hours × 60px/hour`).

#### 📍 **Event Positioning**
- `Event.jsx` calculates its position and height by converting start and end times into **minutes since midnight**.  
  **Example:** `9:30 AM → 570 minutes`

#### 🎨 **CSS Mapping**
- **Start position:** `top: 570px;`  
- **Duration:** `height: 90px;` *(for a 90-minute event)*

#### 📅 **date-fns**
- Handles all date logic — including week calculations, date formatting, and navigation.

---

### 🌙 Dark Mode

A fully variable-driven **CSS Dark Mode System** that adapts automatically between light and dark themes.

#### 🌓 **Theme Logic**
- A boolean state `isDarkMode` is maintained in **`App.jsx`**.  
- Toggling this state applies a `data-theme="dark"` attribute to the main app container.

#### 🎨 **CSS Variables**
- `index.css` defines two sets of CSS variables:
  - **`:root`** → Light mode  
  - **`[data-theme='dark']`** → Dark mode

#### 🧩 **Component Styling**
- Components like `App.css` use shared variables such as:  
  ```css
  background-color: var(--color-bg);
  color: var(--color-text);

---

### 🚀 Future Enhancements

This prototype provides a solid foundation.  
Here are some planned or potential next improvements:

#### 🔁 **Event Overlap Logic**
- Prevent overlapping events from visually stacking on top of each other.  
- Implement horizontal stacking similar to Google Calendar (e.g., if 2 events overlap → `width: 50%` each).

#### 🖱️ **Drag-and-Drop**
- Add drag-to-move and drag-to-resize functionality for events in the WeekView grid.

#### 🗓️ **Month and Day Views**
- Enable toggling between **Month**, **Week**, and **Day** views from the `CalendarHeader`.

#### ☀️ **All-Day Events**
- Properly implement the **“All Day”** checkbox to display events in a dedicated all-day section.

#### 🔄 **Recurring Events**
- Add backend recurrence logic (e.g., `RRULE`) and corresponding frontend UI for repeated events.

#### ✉️ **Guest Invitations**
- Expand the guest email input to send real invitation emails via the Django backend.

