import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css"
import listPlugin from '@fullcalendar/list'
import MUI from "./MUI";

export default function CalendarManager({ requests, getAllRequests , setEvents, eventsDefined, decision, setDecision}) {
  // const[weekendsVisible, setWeekendsVisible] = useState(true);
  // const [eventsDefined, setEvents] = useState();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [eventInQuestion, setEventInQuestion] = useState({});
  const [personName, setPersonName] = useState('');
  const [hours, setHours] = useState(0);
  const handleOpen = () => setOpen(true);

  const handleEventClick = (clickInfo) => {
    handleOpen();
      setEventInQuestion(clickInfo.event)
      setTitle(clickInfo.event.title);
      setMessage(clickInfo.event.extendedProps.details);
      setPersonName(clickInfo.event.extendedProps.name)
      setHours(clickInfo.event.extendedProps.hours)
  };



  function getEventsObjects() {
    let events = requests.map((el) => {
      // '#CFC5CE';
      let eventColor = '#383be0'; 

      if (el.request_for_pto.is_pending === false){
      
        //if denied
        if (el.request_for_pto.decision === false){
          eventColor = '#e0384675';    
        }    
        else{
        //if approved
          eventColor = '#52ab6275';           
        }
      }
      // TODO: Add a past events color here

      return {
        id: el.request_for_pto.id,
        title: `${el.user.first_name} ${el.user.last_name}'s Request`,
        start: el.request_for_pto.day,
        color: eventColor,

        extendedProps: {
          details: el.request_for_pto.request_text,
          hours: el.request_for_pto.hours_requested,
          status: el.request_for_pto.is_pending,
          response: el.request_for_pto.decision, 
          name: el.user.first_name,
        },
      };
    });
    setEvents(events);
  }

  useEffect(() => {
    getEventsObjects();
  }, [requests]);

  // function handleDateSelect(selectInfo) {
  //   let title = prompt('Please enter a new title for your event')
  //   let calendarApi = selectInfo.view.calendar
  // }








  
  return (
    <div className="demo-app">
      <MUI requests ={requests} open ={open} handleOpen = {handleOpen} setOpen = {setOpen} title = {title} message = {message} eventInQuestion = {eventInQuestion} personName = {personName} hours = {hours} getAllRequests = {getAllRequests} getEventsObjects = {getEventsObjects} eventsDefined = {eventsDefined} decision = {decision} setDecision = {setDecision}/>
     
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
          // eventColor={eventColorState}
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
