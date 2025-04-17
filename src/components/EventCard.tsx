// src/components/EventCard.tsx
import React from 'react';

const EventCard = ({ title, category, type, date, onClick }: any) => (
  <div onClick={onClick} className="cursor-pointer border rounded-lg p-4 shadow-md bg-white dark:bg-gray-700 dark:text-white hover:shadow-lg transition-all duration-300">
    <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-1">{title}</h3>
    <p className="text-sm text-gray-600 dark:text-gray-300">Category: {category}</p>
    <p className="text-sm text-gray-600 dark:text-gray-300">Type: {type}</p>
    <p className="text-sm text-gray-600 dark:text-gray-300">Date: {date}</p>
  </div>
);

export default EventCard;