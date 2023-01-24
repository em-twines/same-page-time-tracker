import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import MUI from "./MUI";

export default function CalendarManager({ requests }) {
  // const[weekendsVisible, setWeekendsVisible] = useState(true);
  const [eventsDefined, setEvents] = useState();
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleOpen = () => setOpen(true);

  const handleEventClick = (clickInfo) => {
    handleOpen();
      setTitle(clickInfo.event.title);
      setMessage(clickInfo.event.extendedProps.details);

  };

  function renderEventContent(eventInfo) {
    return (
      <>
        <i>{eventInfo.event.title}</i>
        <b>{eventInfo.timeText}</b>
      </>
    );
  }

  function getEventsObjects() {
    let events = requests.map((el) => {
      return {
        id: el.request_for_pto.id,
        title: `${el.user.first_name} ${el.user.last_name} out`,
        start: el.request_for_pto.day,
        extendedProps: {
          details: el.request_for_pto.request_text,
        },
      };
    });

    setEvents(events);
  }

  useEffect(() => {
    getEventsObjects();
  }, []);

  // function handleDateSelect(selectInfo) {
  //   let title = prompt('Please enter a new title for your event')
  //   let calendarApi = selectInfo.view.calendar
  // }

  return (
    <div className="demo-app">
      <MUI requests ={requests} open ={open} handleOpen = {handleOpen} setOpen = {setOpen} title = {title} message = {message}/>
      {/* <ToastContainer
        className = 'toast'
        autoClose={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
        /> */}
      <div className="demo-app-main">
        
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          // events = {addeventSource(events)}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          // weekends={this.state.weekendsVisible}

          events={eventsDefined}
          // select={handleDateSelect}
          // eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          
          // eventsSet={setEvents}// called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
        />
        <div></div>
      </div>
    </div>
  );
}
