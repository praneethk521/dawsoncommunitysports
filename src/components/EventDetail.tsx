import React from 'react';

const EventDetail = ({ event }: any) => (
  <section className="max-w-4xl mx-auto px-4 mt-12 text-center">
    <h2 className="text-3xl font-bold text-blue-800 dark:text-blue-300 mb-4">{event.title}</h2>
    <p className="text-lg text-gray-700 dark:text-gray-200 mb-2">{event.description}</p>
    <p className="text-md text-gray-500 dark:text-gray-300 mb-4">Category: {event.category} | Type: {event.type} | Date: {event.date}</p>
    <p className="text-md text-gray-600 dark:text-gray-300">More info coming soon, including rules, venue details, and gallery!</p>
  </section>
);

export default EventDetail;