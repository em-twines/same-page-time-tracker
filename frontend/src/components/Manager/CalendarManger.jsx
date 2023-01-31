import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Calendar from "../Calendar/Calendar.css";
import moment from "moment";
import listPlugin from "@fullcalendar/list";
import MUI from "./MUI";

export default function CalendarManager({
  requests,
  getAllRequests,
  setEvents,
  eventsDefined,
  decision,
  setDecision,
  defaultMessage,
  user,
}) {
  // const[weekendsVisible, setWeekendsVisible] = useState(true);
  // const [eventsDefined, setEvents] = useState();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [eventInQuestion, setEventInQuestion] = useState({});
  const [personName, setPersonName] = useState("");
  const [hours, setHours] = useState(0);
  const [userId, setUserId] = useState();
  const handleOpen = () => setOpen(true);

  const handleEventClick = (clickInfo) => {
    handleOpen();
    setEventInQuestion(clickInfo.event);
    setTitle(clickInfo.event.title);
    setMessage(clickInfo.event.extendedProps.details);
    setPersonName(clickInfo.event.extendedProps.name);
    setHours(clickInfo.event.extendedProps.hours);
    setUserId(clickInfo.event.extendedProps.user_id);
  };

  function getEventsObjects() {
    let eventColor = "#383be0";
    let today = moment().format("YYYY-MM-DD");
    let events = requests.map((el) => {
      if (el.request_for_pto.is_pending === false) {
        //if denied
        if (el.request_for_pto.decision === false) {
          if (today > el.request_for_pto.day) {
            eventColor = "#C38D9E50";
          } else {
            eventColor = "#C38D9E98";
          }
        } else if (el.request_for_pto.decision === true) {
          if (today > el.request_for_pto.day) {
            eventColor = "#41B3A350";
          } else {
            eventColor = "#41B3A398"
          }
        }
      } else {
        if (today > el.request_for_pto.day) {
          eventColor = "#85DCB90";
        } else {
          eventColor = "#85DCB";
        }
      }

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
          user_id: el.user.id,
        },
      };
    });
    setEvents(events);
  }

  useEffect(() => {
    getEventsObjects();
  }, [requests]);



  return (
    <div className="demo-app">
      <MUI
        requests={requests}
        open={open}
        handleOpen={handleOpen}
        setOpen={setOpen}
        title={title}
        message={message}
        eventInQuestion={eventInQuestion}
        personName={personName}
        hours={hours}
        getAllRequests={getAllRequests}
        getEventsObjects={getEventsObjects}
        eventsDefined={eventsDefined}
        decision={decision}
        setDecision={setDecision}
        userId={userId}
        defaultMessage={defaultMessage}



      />
      <div className="title">Home Page for {user.username}!</div>

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
