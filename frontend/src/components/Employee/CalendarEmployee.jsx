import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import MuiEmployee from "./MuiEmployee";

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

  const handleOpen = () => setOpen(true);
  const [eventsDefinedEmployee, setEventsEmployee] = useState();

  const handleEventClick = (clickInfo) => {
    handleOpen();
    setEventInQuestionEmployee(clickInfo.event);
    console.log(clickInfo.event);
  };

  function getEventsObjectsEmployee() {
    let events = requests_for_pto.map((el) => {
      // '#CFC5CE';
      let eventColor = "#383be0";
      if (el.is_pending === false) {
        //if denied
        if (el.decision === false) {
          eventColor = "#e0384675";
        } else {
          //if approved
          eventColor = "#52ab6275";
        }
      }
      // TODO: Add a past events color here
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
