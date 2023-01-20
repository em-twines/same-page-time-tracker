import React, { useState , useEffect} from 'react';

import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'


export default function CalendarManager({user, requests_for_pto, setRequests, getAllRequests, handleEvents}){
// const[weekendsVisible, setWeekendsVisible] = useState(true);

    const handleEventClick = (clickInfo) => {
          alert(clickInfo.event.day)
        }
    

    function renderEventContent(eventInfo) {
        return (
          <>
            <i>{eventInfo.event.title}</i>
            <b>{eventInfo.timeText}</b>
            
          </>
        )
    }
    let events = requests_for_pto.map((el) => {
      return{
        title: `${el.user, console.log(el)} out`,
        date: el.day
      }
    })
      
    useEffect(() => {
      getAllRequests();
    }, [])
    
    return (
      <div className='demo-app'>
        {/* {this.renderSidebar()} */}
        <div className='demo-app-main'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            // weekends={this.state.weekendsVisible}
            
            events={events}
            // alternatively, use the `events` setting to fetch from a feed
            // initialEvents={requests_for_pto}
            // events={requests_for_pto}
            // select={handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={handleEventClick}
            eventsSet={handleEvents()}// called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          />
          <div>
          {/* <div className='demo-app-sidebar'> */}
        {/* <div className='demo-app-sidebar-section'> */}
          {/* <h2>Instructions</h2>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul> */}
        {/* </div>  */}
        {/* <div className='demo-app-sidebar-section'> */}
          {/* <label>
            <input
              type='checkbox'
              checked={state.weekendsVisible}
              onChange={handleWeekendsToggle}
            ></input>
            toggle weekends
          </label> */}
        </div>
        <div className='demo-app-sidebar-section'>
          <h2>All Events ({requests_for_pto.length})</h2>
          <ul>
            {/* {this.state.currentEvents.map(renderSidebarEvent)} */}
          </ul>
        </div> 
      </div>
        </div>
      // </div>
    
    )
}
//   renderSidebar() {
//     return (
//       <div className='demo-app-sidebar'>
//         <div className='demo-app-sidebar-section'>
//           {/* <h2>Instructions</h2>
//           <ul>
//             <li>Select dates and you will be prompted to create a new event</li>
//             <li>Drag, drop, and resize events</li>
//             <li>Click an event to delete it</li>
//           </ul>
//         </div> */}
//         {/* <div className='demo-app-sidebar-section'>
//           <label>
//             <input
//               type='checkbox'
//               checked={this.state.weekendsVisible}
//               onChange={this.handleWeekendsToggle}
//             ></input>
//             toggle weekends
//           </label>
//         </div>
//         <div className='demo-app-sidebar-section'>
//           <h2>All Events ({this.state.currentEvents.length})</h2>
//           <ul>
//             {this.state.currentEvents.map(renderSidebarEvent)}
//           </ul>*/}
//         </div> 
//       </div>
//     )
//   }

//   handleWeekendsToggle = () => {
//     this.setState({
//       weekendsVisible: !this.state.weekendsVisible
//     })
//   }

//   handleDateSelect = (selectInfo) => {
//     let title = prompt('Please enter a new title for your event')
//     let calendarApi = selectInfo.view.calendar

//     calendarApi.unselect() // clear date selection

//     if (title) {
//       calendarApi.addEvent({
//         id: createEventId(),
//         title,
//         start: selectInfo.startStr,
//         end: selectInfo.endStr,
//         allDay: selectInfo.allDay
//       })
//     }
//   }

 



// function renderSidebarEvent(event) {
//   return (
//     <li key={event.id}>
//       <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
//       <i>{event.title}</i>
//     </li>
//   )
// }
