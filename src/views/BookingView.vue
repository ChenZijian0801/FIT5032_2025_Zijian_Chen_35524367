<template>
  <div class="container mt-4">
    <h1 class="mb-4 text-center">Book an Appointment</h1>
    <p class="text-center text-muted">Click on an available date to book a consultation.</p>
    <div class="card p-3">
      <FullCalendar :options="calendarOptions" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

const events = ref([
  // Mock pre-existing appointments
  { title: 'Booked Slot', start: new Date().toISOString().slice(0, 10), allDay: true, backgroundColor: '#dc3545' },
]);

const calendarOptions = {
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  events: events.value,
  dateClick: handleDateClick, // Handle date clicks
  selectable: true,
};

function handleDateClick(arg) {
  // BR (D.3) Hint: Booking conflict management
  const isBooked = events.value.some(event => event.start === arg.dateStr);

  if (isBooked) {
    alert('This date is already booked. Please choose another date.');
    return;
  }

  if (confirm(`Do you want to book an appointment for ${arg.dateStr}?`)) {
    events.value.push({
      title: 'Your Appointment',
      start: arg.dateStr,
      allDay: true,
      backgroundColor: '#3E8A86'
    });
    alert('Appointment successfully booked!');
  }
}
</script>