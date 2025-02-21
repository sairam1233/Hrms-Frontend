import { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { useTheme } from '../../context/ThemeContext';
import './index.css';
import { FaTrash, FaPlusCircle, FaTimesCircle, FaCalendarDay, FaClock, FaTag } from 'react-icons/fa'; // Import Font Awesome 5 icons

const locales = {
    'en-US': require('date-fns/locale/en-US')
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date()),
    getDay,
    locales
});

const eventTypes = {
    Meeting: '#1E90FF',
    Birthday: '#FF4500',
    Holiday: '#32CD32',
    Conference: '#8A2BE2',
    Workshop: '#FFD700',
    Sports: '#FF6347',
    Music: '#FF69B4',
    Other: '#A9A9A9'
};

const MyCalendar = () => {
    const [events, setEvents] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const { slide } = useTheme();
    const [newEvent, setNewEvent] = useState({
        title: '',
        date: '',
        startTime: '',
        endTime: '',
        type: ''
    });

    const fetchEvents = async () => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
        if (!token) {
            alert('No JWT token found. Please log in.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/events', {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            const data = await response.json();

            if (response.ok) {
                const mappedEvents = data.events.map((event) => ({
                    id: event.EventsID,
                    title: event.title,
                    start: new Date(`${event.Date}T${event.StartTime}`),
                    end: new Date(`${event.Date}T${event.EndTime}`),
                    color: eventTypes[event.eventType] || eventTypes.Other
                }));

                setEvents(mappedEvents);
            } else {
                alert('Error fetching events: ' + data.message);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
            alert('There was an error fetching the events.');
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    useEffect(() => {
        const calendarElement = document.querySelector('.calendar-render');
        if (calendarElement) {
            calendarElement.classList.add('show');
        }
    }, []);

    return (
        <div>
            <div style={{ padding: '20px' }} className= { slide === "false" ? 'calendar-render' : 'calendar-render1' }>
                <div className="calendar-header">
                    <h1>Calendar</h1>
                    <FaPlusCircle className="add-event-icon" onClick={() => setShowForm(true)} />
                </div>
                {showForm && (
                    <div className="event-form-overlay">
                        <div className="event-form">
                            <FaTimesCircle className="close-event-icon" onClick={() => setShowForm(false)} />
                            <h2>Add Event</h2>
                            <div className="form-grid">
                                <input type="text" name="title" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} placeholder="Event Title" className="styled-input" />
                                <input type="date" name="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} className="styled-input" />
                                <input type="time" name="startTime" value={newEvent.startTime} onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })} className="styled-input" />
                                <input type="time" name="endTime" value={newEvent.endTime} onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })} className="styled-input" />
                                <select name="type" value={newEvent.type} onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })} className="styled-select">
                                    <option value="">Select Type</option>
                                    {Object.keys(eventTypes).map((type) => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                            <button className="add-event-btn" onClick={() => {}}>Add Event</button>
                        </div>
                    </div>
                )}

                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500, marginTop: '20px' }}
                />
            </div>
        </div>
    );
};

export default MyCalendar;
