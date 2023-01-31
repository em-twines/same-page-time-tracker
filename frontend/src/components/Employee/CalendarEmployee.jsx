import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import MuiEmployee from "./MuiEmployee";
import moment from "moment";

export default function CalendarEmployee({
  requests_for_pto,
  getAllRequests,
  setEvents,
  eventsDefined,
  decision,
  setDecision,
  deletion,
  setDeletion,
  getRequests,
  hours_requested,
  setHoursRequested,
  getUserInfo,
}) {
  const [open, setOpen] = useState(false);
  const [eventInQuestionEmployee, setEventInQuestionEmployee] = useState({});
  const [openChild, setOpenChild] = useState(false);

  const handleOpen = () => setOpenChild(true);
  const [eventsDefinedEmployee, setEventsEmployee] = useState();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [eventInQuestion, setEventInQuestion] = useState({});
  const [hours, setHours] = useState(0);
  const [date, setDate] = useState();

  const handleEventClick = (clickInfo) => {
    handleOpen();
    setMessage(clickInfo.event.extendedProps.details);
    setDate(clickInfo.event.start);
    setHours(clickInfo.event.extendedProps.hours);
    setEventInQuestionEmployee(clickInfo.event);
  };

  function getEventsObjectsEmployee() {
    let today = moment().format("YYYY-MM-DD");
    let events = requests_for_pto.map((el) => {
      let eventColor = "#383be0";
      if (el.is_pending === false) {
        //if denied
        if (el.decision === false) {
          if (today > el.day) {
            eventColor = "#C38D9E50";
          } else {
            eventColor = "#C38D9E98";
          }
        } else if (el.decision === true) {
          if (today > el.day) {
            eventColor = "#41B3A350";
          } else {
            eventColor = "#41B3A398";
          }
        }
      } else {
        if (today > el.day) {
          eventColor = "#85DCB90";
        } else {
          eventColor = "#85DCB";
        }
      }

      return {
        id: el.id,
        title: `PTO Request`,
        start: el.day,
        color: eventColor,

        extendedProps: {
          details: el.request_text,
          hours: el.hours_requested,
          status: el.is_pending,
          response: el.decision,
        },
      };
    });
    setEventsEmployee(events);
  }

  useEffect(() => {
    getEventsObjectsEmployee();
  }, [requests_for_pto]);

  return (
    <div className="demo-app">
      <MuiEmployee
        open={open}
        handleOpen={handleOpen}
        setOpen={setOpen}
        title={decision}
        eventInQuestionEmployee={eventInQuestionEmployee}
        setEventInQuestionEmployee={setEventInQuestionEmployee}
        eventsDefined={eventsDefined}
        getEventsObjectsEmployee={getEventsObjectsEmployee}
        deletion={deletion}
        setDeletion={setDeletion}
        openChild={openChild}
        setOpenChild={setOpenChild}
        getRequests={getRequests}
        hours_requested={hours_requested}
        setHoursRequested={setHoursRequested}
        hours={hours}
        message={message}
        date={date}
      />

      <div className="demo-app-main">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          events={eventsDefinedEmployee}
          eventClick={handleEventClick}
        />
        <div></div>
      </div>
    </div>
  );
}
