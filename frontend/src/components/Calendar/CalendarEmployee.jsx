import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import "./Calendar.css";

export default class CalendarEmployee extends React.Component {
  render() {
    return (
      <FullCalendar className = 'calendar-container'
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        events={[
          // { title: 'Emily Out', date: '2023-01-21' },
          // { title: 'event 2', date: '2019-04-02' }
        ]}
      />
    )
  }
}

// import React from 'react'

// export default function Calendar(){
//     document.addEventListener('DOMContentLoaded', function() {
//         var calendarEl = document.getElementById('calendar');
      
//         var calendar = new FullCalendar.Calendar(calendarEl, {
//           initialView: 'dayGridMonth',
//           initialDate: '2023-01-07',
//           headerToolbar: {
//             left: 'prev,next today',
//             center: 'title',
//             right: 'dayGridMonth,timeGridWeek,timeGridDay'
//           },
//           events: [
//             {
//               title: 'All Day Event',
//               start: '2023-01-01'
//             },
//             {
//               title: 'Long Event',
//               start: '2023-01-07',
//               end: '2023-01-10'
//             },
//             {
//               groupId: '999',
//               title: 'Repeating Event',
//               start: '2023-01-09T16:00:00'
//             },
//             {
//               groupId: '999',
//               title: 'Repeating Event',
//               start: '2023-01-16T16:00:00'
//             },
//             {
//               title: 'Conference',
//               start: '2023-01-11',
//               end: '2023-01-13'
//             },
//             {
//               title: 'Meeting',
//               start: '2023-01-12T10:30:00',
//               end: '2023-01-12T12:30:00'
//             },
//             {
//               title: 'Lunch',
//               start: '2023-01-12T12:00:00'
//             },
//             {
//               title: 'Meeting',
//               start: '2023-01-12T14:30:00'
//             },
//             {
//               title: 'Birthday Party',
//               start: '2023-01-13T07:00:00'
//             },
//             {
//               title: 'Click for Google',
//               url: 'http://google.com/',
//               start: '2023-01-28'
//             }
//           ]
//         });
      
//         calendar.render();
//       });
//   return (
//     <div>
//         <div id='calendar'></div>
//     </div>
//   )
// }
