import React from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar'; // Rename the import
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Set up localizer to use moment.js for date formatting
const localizer = momentLocalizer(moment);

class MyCalendar extends React.Component {
   // Function to get event properties including color
   eventStyleGetter = (event, start, end, isSelected) => {
       let backgroundColor = '';
       switch(event.color) { // Assuming each event has a 'type' property to determine its type
           case 'blue':
               backgroundColor = 'blue'; // Color for pending events
               break;
           case 'green':
               backgroundColor = 'green'; // Color for upcoming events
               break;
           case 'red':
               backgroundColor = 'red'; // Color for passed events
               break;
           default:
               backgroundColor = 'gray'; // Default color
       }
       return {
           style: {
               backgroundColor: backgroundColor,
               borderRadius: '5px', // Optional: Add border radius for a rounded look
               color: 'white', // Optional: Set text color to white for better contrast
               border: 'none' // Optional: Remove border
           }
       };
   };

   render() {
       return (
           <div style={{ height: 500 }}>
               <BigCalendar
                   localizer={localizer}
                   events={this.props.events}
                   startAccessor="start"
                   endAccessor="end"
                   eventPropGetter={this.eventStyleGetter} // Assign event properties including color
               />
           </div>
       );
   }
}

export default MyCalendar;
