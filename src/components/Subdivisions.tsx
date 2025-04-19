import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

// Fix Leaflet icon issues with Vite
delete (L.Icon.Default as any).prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const subdivisions = [
  { name: 'Sosebee Creek', lat: 34.343527, lng: -84.070764 }, // Source: Compass&#8203;:contentReference[oaicite:3]{index=3}
  { name: 'Woods at Dawson', lat: 34.356506, lng: -84.064244 }, // :contentReference[oaicite:4]{index=4}&#8203;:contentReference[oaicite:5]{index=5}
  { name: 'Dawson Grove', lat: 34.3402, lng: -84.1033 }, // :contentReference[oaicite:6]{index=6}&#8203;:contentReference[oaicite:7]{index=7}
  { name: 'Crosby Square', lat: 34.42638, lng: -84.138556 }, // :contentReference[oaicite:8]{index=8}&#8203;:contentReference[oaicite:9]{index=9}
  { name: 'Oaks at Dawson', lat: 34.42638, lng: -84.138556 }, // :contentReference[oaicite:10]{index=10}&#8203;:contentReference[oaicite:11]{index=11}
  { name: 'Ellorie Estates', lat: 34.330472, lng: -84.095752 }, // :contentReference[oaicite:12]{index=12}&#8203;:contentReference[oaicite:13]{index=13}
  { name: 'Addison Grove', lat: 34.333502, lng: -84.086081 }, // :contentReference[oaicite:14]{index=14}&#8203;:contentReference[oaicite:15]{index=15}
  { name: 'Kenneson Creek', lat: 34.316495, lng: -84.097573 }, // :contentReference[oaicite:16]{index=16}&#8203;:contentReference[oaicite:17]{index=17}
  { name: 'Etowah Preserve', lat: 34.35319, lng: -84.128995 }, // :contentReference[oaicite:18]{index=18}&#8203;:contentReference[oaicite:19]{index=19}
  { name: 'Conner Farm', lat: 34.319114, lng: -84.098765 }, // :contentReference[oaicite:20]{index=20}&#8203;:contentReference[oaicite:21]{index=21}
  { name: 'Other', lat: 34.3300, lng: -84.0900 }, // :contentReference[oaicite:22]{index=22}&#8203;:contentReference[oaicite:23]{index=23}
];


// Pie chart based on actual data you provided
const subdivisionData = {
  labels: [
    'Sosebe Creek (39)',
    'Woods at Dawson (33)',
    'Etowah Preserve (21)',
    'Conner Farm (5)',
    'Oaks at Dawson (3)',
    'Addison Groove (2)',
    'Kenneson Creek (4)',
    'Crossby Square (1)',
    'Dawson Grove (1)',
    'Other (3)',
  ],
  datasets: [
    {
      data: [39, 33, 21, 5, 3, 2, 4, 1, 1, 3],
      backgroundColor: [
        '#3B82F6', '#F97316', '#8B5CF6', '#10B981', '#14B8A6',
        '#F43F5E', '#FACC15', '#6366F1', '#4ADE80', '#D946EF'
      ],
    },
  ],
};

// Men's competition chart
const menData = {
  labels: ['Push ups', 'Pickle Ball', 'Table Tennis', 'Tennis', 'Cardio Walk', 'Cardio Jog'],
  datasets: [
    {
      label: 'Participants',
      data: [15, 28, 22, 17, 28, 10],
      backgroundColor: '#1E3A8A',
    },
  ],
};

// Women's competition chart
const womenData = {
  labels: ['Cardio Walk', 'Carroms', 'Plank', 'Badminton'],
  datasets: [
    {
      label: 'Participants',
      data: [44, 17, 9, 21],
      backgroundColor: '#9333EA',
    },
  ],
};

const Subdivisions = () => (
  <motion.div
    className="max-w-6xl mx-auto px-4 py-12 space-y-12"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
  >
    <h2 className="text-3xl font-bold text-center text-blue-800 dark:text-blue-300 mb-6">
      🏘️ Community Subdivisions
    </h2>

    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">🏡 Subdivision Participation</h3>
        <div className="h-[300px] sm:h-[350px]">
          <Pie data={subdivisionData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">👟 Men’s Competitions</h3>
        <div className="h-[300px] sm:h-[350px]">
          <Bar data={menData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>

      <div className="md:col-span-2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">💪 Women’s Competitions</h3>
        <div className="h-[300px] sm:h-[350px]">
          <Bar data={womenData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>
    </div>

    <div className="mt-12">
      <h3 className="text-2xl font-bold text-center mb-4 text-blue-700 dark:text-blue-200">
        📍 Subdivisions Map
      </h3>
      <MapContainer
        center={[34.345, -84.093]}
        zoom={12}
        scrollWheelZoom={false}
        className="w-full h-[500px] rounded-lg shadow-lg z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {subdivisions.map((loc) => (
          <Marker key={loc.name} position={[loc.lat, loc.lng]}>
            <Popup>{loc.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  </motion.div>
);

export default Subdivisions;
