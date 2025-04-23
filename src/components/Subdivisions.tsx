// src/components/Subdivisions.tsx
import React, { useEffect, useState, useMemo } from 'react';
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

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

// Leaflet icon fix for Vite
delete (L.Icon.Default as any).prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl:   'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Helper to pick text color based on theme
const getTextColor = () =>
  document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#1f2937';

// Helpers for tooltip styling
const getTooltipBgColor = () =>
  document.documentElement.classList.contains('dark') ? '#1f2937' : '#ffffff';
const getTooltipBorderColor = () =>
  document.documentElement.classList.contains('dark') ? '#e5e7eb22' : '#1f293722';

// Shared Chart.js options (stacked axes + styled tooltips)
const useChartOptions = () => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { labels: { color: getTextColor() } },
    title:  { display: false, color: getTextColor() },
    tooltip: {
      backgroundColor: getTooltipBgColor(),
      titleColor:      getTextColor(),
      bodyColor:       getTextColor(),
      borderColor:     getTooltipBorderColor(),
      borderWidth:     1,
    },
  },
  scales: {
    x: { ticks: { color: getTextColor() }, grid: { color: getTextColor() + '22' }, stacked: true },
    y: { ticks: { color: getTextColor() }, grid: { color: getTextColor() + '22' }, stacked: true },
  },
});

// Color map for each sport
const colorMap: Record<string,string> = {
  'Push ups': '#EF4444',
  'Pickle Ball': '#F59E0B',
  'Table Tennis': '#3B82F6',
  'Tennis': '#10B981',
  'Cardio/Distance Tracking (Walk)': '#F97316',
  'Cardio/Distance Tracking (Jog)': '#8B5CF6',
  'Badminton': '#9333EA',
  'Carroms': '#F43F5E',
  'Plank': '#6366F1',
};

// Inline TSV data (trimmed here; insert your full lines)
// Inline TSV data
const rawTSV = `
Sub division\tMen’s Competitions\tWomen’s Competitions
Woods at Dawson\tTable Tennis\t
Woods at Dawson\tPush ups, Table Tennis, Tennis\t
Woods at Dawson\tPickle Ball, Table Tennis\t
Woods at Dawson\tPush ups, Pickle Ball, Tennis, Cardio/Distance Tracking (Jog)\t
Woods at Dawson\tPush ups, Pickle Ball\t
Woods at Dawson\tPush ups, Cardio/Distance Tracking (Walk)\t
Woods at Dawson\t\tCardio/Distance Tracking (Walk)
Woods at Dawson\tCardio/Distance Tracking (Walk), Cardio/Distance Tracking (Jog)\t
Woods at Dawson\tPush ups, Cardio/Distance Tracking (Walk)\t
Woods at Dawson\t\tCardio/Distance Tracking (Walk), Badminton
Woods at Dawson\t\tCardio/Distance Tracking (Walk), Plank
Woods at Dawson\tPush ups, Pickle Ball, Tennis, Cardio/Distance Tracking (Walk)\t
Woods at Dawson\t\tCardio/Distance Tracking (Walk)
Woods at Dawson\t\tCardio/Distance Tracking (Walk)
Woods at Dawson\t\tCardio/Distance Tracking (Walk)
Woods at Dawson\t\tCardio/Distance Tracking (Walk), Carroms, Badminton
Woods at Dawson\tPush ups, Pickle Ball, Table Tennis\t
Woods at Dawson\tPickle Ball, Table Tennis\t
Woods at Dawson\t\tCardio/Distance Tracking (Walk)
Woods at Dawson\t\tCardio/Distance Tracking (Walk)
Woods at Dawson\t\tCardio/Distance Tracking (Walk), Badminton
Woods at Dawson\t\tCardio/Distance Tracking (Walk), Plank
Woods at Dawson\t\tCardio/Distance Tracking (Walk)
Woods at Dawson\tTable Tennis, Cardio/Distance Tracking (Walk)\t
Woods at Dawson\t\tCardio/Distance Tracking (Walk), Plank
Woods at Dawson\tCardio/Distance Tracking (Walk)\t
Woods at Dawson\t\tCardio/Distance Tracking (Walk)
Woods at Dawson\tCardio/Distance Tracking (Walk), Cardio/Distance Tracking (Jog)\t
Woods at Dawson\tPush ups\t
Woods at Dawson\t\tCarroms, Badminton
Woods at Dawson\t\tCarroms, Badminton
Woods at Dawson\tTable Tennis, Tennis\t
Woods at Dawson\t\tCardio/Distance Tracking (Walk), Carroms, Plank, Badminton
Woods at Dawson\t\tCardio/Distance Tracking (Walk)
Sosebe Creek\tCardio/Distance Tracking (Jog)\t
Sosebe Creek\tTable Tennis, Cardio/Distance Tracking (Walk), Cardio/Distance Tracking (Jog)\t
Sosebe Creek\tTable Tennis\t
Sosebe Creek\tPush ups, Cardio/Distance Tracking (Walk)\t
Sosebe Creek\t\tCardio/Distance Tracking (Walk)
Sosebe Creek\t\tCardio/Distance Tracking (Walk), Plank
Sosebe Creek\t\tCardio/Distance Tracking (Walk)
Sosebe Creek\t\tCardio/Distance Tracking (Walk), Badminton
Sosebe Creek\t\tCardio/Distance Tracking (Walk)
Sosebe Creek\tPickle Ball, Table Tennis, Cardio/Distance Tracking (Walk)\t
Sosebe Creek\t\tCardio/Distance Tracking (Walk)
Sosebe Creek\t\tCardio/Distance Tracking (Walk)
Sosebe Creek\t\tCardio/Distance Tracking (Walk)
Sosebe Creek\tCardio/Distance Tracking (Walk)\t
Sosebe Creek\tCardio/Distance Tracking (Walk)\t
Sosebe Creek\tCardio/Distance Tracking (Walk)\t
Sosebe Creek\t\tCardio/Distance Tracking (Walk)
Sosebe Creek\tPickle Ball, Table Tennis\t
Sosebe Creek\t\tBadminton
Sosebe Creek\t\tCardio/Distance Tracking (Walk)
Sosebe Creek\tCardio/Distance Tracking (Walk)\t
Sosebe Creek\t\tCardio/Distance Tracking (Walk), Plank
Sosebe Creek\t\tCardio/Distance Tracking (Walk)
Sosebe Creek\tTable Tennis\t
Sosebe Creek\t\tPlank, Badminton
Sosebe Creek\t\tCardio/Distance Tracking (Walk), Carroms, Badminton
Sosebe Creek\tCardio/Distance Tracking (Jog)\t
Sosebe Creek\tPickle Ball\t
Sosebe Creek\t\tCardio/Distance Tracking (Walk)
Sosebe Creek\t\tCardio/Distance Tracking (Walk), Carroms, Plank, Badminton
Sosebe Creek\t\tCarroms
Sosebe Creek\t\tCarroms
Sosebe Creek\tTable Tennis\t
Sosebe Creek\tPickle Ball, Cardio/Distance Tracking (Walk)\t
Sosebe Creek\tPickle Ball, Cardio/Distance Tracking (Walk)\t
Sosebe Creek\tPush ups, Cardio/Distance Tracking (Walk)\t
Sosebe Creek\t\tCarroms
Sosebe Creek\t\tCarroms, Badminton
Sosebe Creek\tTennis\t
Sosebe Creek\tTable Tennis, Tennis\t
Sosebe Creek\tTennis\t
other\tCardio/Distance Tracking (Walk)\t
other\tPickle Ball, Cardio/Distance Tracking (Walk)\t
other\t\tCardio/Distance Tracking (Walk)
Oaks at Dawson\tPickle Ball\t
Oaks at Dawson\tPickle Ball\t
Oaks at Dawson\t\tCarroms
Kenneson Creek\tPickle Ball\t
Kenneson Creek\tPickle Ball\tBadminton
Kenneson Creek\tPickle Ball, Cardio/Distance Tracking (Walk), Cardio/Distance Tracking (Jog)\t
Kenneson Creek\tPickle Ball, Table Tennis\t
Etowah Preserve\t\tCardio/Distance Tracking (Walk), Carroms, Badminton
Etowah Preserve\tCardio/Distance Tracking (Walk)\t
Etowah Preserve\t\tBadminton
Etowah Preserve\t\tCarroms, Badminton
Etowah Preserve\tPush ups, Table Tennis, Tennis\t
Etowah Preserve\tPush ups, Pickle Ball\t
Etowah Preserve\tPickle Ball\t
Etowah Preserve\tCardio/Distance Tracking (Walk)\t
Etowah Preserve\t\tCardio/Distance Tracking (Walk), Badminton
Etowah Preserve\tCardio/Distance Tracking (Walk)\t
Etowah Preserve\tPickle Ball\tCardio/Distance Tracking (Walk), Badminton
Etowah Preserve\tPush ups, Pickle Ball, Table Tennis, Cardio/Distance Tracking (Walk), Cardio/Distance Tracking (Jog)\t
Etowah Preserve\t\tCarroms
Etowah Preserve\tPickle Ball, Tennis\t
Etowah Preserve\t\tCardio/Distance Tracking (Walk), Carroms, Badminton
Etowah Preserve\t\tCardio/Distance Tracking (Walk)
Etowah Preserve\t\tPlank
Etowah Preserve\t\tCardio/Distance Tracking (Walk)
Etowah Preserve\tCardio/Distance Tracking (Walk)\t
Etowah Preserve\t\tCardio/Distance Tracking (Walk)
Etowah Preserve\t\tCardio/Distance Tracking (Walk)
Etowah Preserve\tPickle Ball, Cardio/Distance Tracking (Walk), Cardio/Distance Tracking (Jog)\t
Etowah Preserve\t\tCardio/Distance Tracking (Walk)
Etowah Preserve\t\tBadminton
Etowah Preserve\t\tCardio/Distance Tracking (Walk)
Etowah Preserve\tTennis\t
Etowah Preserve\tPickle Ball\t
Etowah Preserve\t\tCardio/Distance Tracking (Walk), Carroms
Etowah Preserve\t\tCardio/Distance Tracking (Walk), Carroms
Etowah Preserve\t\tCardio/Distance Tracking (Walk)
Dawson Grove\tTable Tennis, Cardio/Distance Tracking (Walk)\t
Crossby Square\tPickle Ball, Table Tennis, Cardio/Distance Tracking (Jog)\t
Conner Farm\tTennis\t
Conner Farm\tTennis, Cardio/Distance Tracking (Walk)\t
Conner Farm\tTennis\t
Conner Farm\tTennis\t
Conner Farm\tTennis\t
Addison Groove\tPush ups, Pickle Ball, Table Tennis, Tennis\tBadminton
`;


type RawEntry = { subdivision: string; mens: string; womens: string };

// Map marker coordinates
const subdivisionsMap = [
  { name: 'Sosebee Creek',   lat: 34.343527, lng: -84.070764 },
  { name: 'Woods at Dawson', lat: 34.356506, lng: -84.064244 },
  // …other subdivisions…
];

const Subdivisions: React.FC = () => {
  const [options, setOptions] = useState(useChartOptions());

  // Recompute options on theme toggle
  useEffect(() => {
    const observer = new MutationObserver(() => setOptions(useChartOptions()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Parse TSV and build all five datasets
  const {
    staticSubdivisionData,
    staticMenData,
    staticWomenData,
    menLabels, menDatasets,
    womenLabels, womenDatasets
  } = useMemo(() => {
    const lines = rawTSV.trim().split('\n');
    const entries: RawEntry[] = lines.slice(1).map(line => {
      const [subdivision, mens, womens] = line.split('\t');
      return { subdivision, mens: mens || '', womens: womens || '' };
    });

    // Unique subdivisions
    const subs: string[] = [];
    entries.forEach(e => { if (!subs.includes(e.subdivision)) subs.push(e.subdivision); });

    // Build count maps
    const buildMap = (key: 'mens'|'womens') => {
      const map: Record<string,Record<string,number>> = {};
      subs.forEach(s => map[s] = {});
      entries.forEach(({ subdivision, [key]: list }) => {
        if (!list) return;
        list.split(',').map(s => s.trim()).forEach(sport => {
          map[subdivision][sport] = (map[subdivision][sport] || 0) + 1;
        });
      });
      return map;
    };
    const menMap   = buildMap('mens');
    const womenMap = buildMap('womens');

    // Unique sports
    const menSports = Array.from(new Set(entries.flatMap(e => e.mens.split(',').map(s => s.trim()).filter(Boolean))));
    const womenSports = Array.from(new Set(entries.flatMap(e => e.womens.split(',').map(s => s.trim()).filter(Boolean))));

    // Stacked datasets
    const menDatasets = menSports.map(sport => ({
      label: sport,
      data: subs.map(sub => menMap[sub][sport] || 0),
      backgroundColor: colorMap[sport] || '#999',
    }));
    const womenDatasets = womenSports.map(sport => ({
      label: sport,
      data: subs.map(sub => womenMap[sub][sport] || 0),
      backgroundColor: colorMap[sport] || '#999',
    }));

    // Static first-three charts (hard-coded)
    const staticSubdivisionData = {
      labels: [
        'Sosebe Creek (39)',
        'Woods at Dawson (33)',
        'Etowah Preserve (21)',
        'Conner Farm (5)',
        'Oaks at Dawson (3)',
        'Addison Groove (2)',
        'Kenneson Creek (4)',
        'Crosby Square (1)',
        'Dawson Grove (1)',
        'Other (3)',
      ],
      datasets: [{
        data: [39, 33, 21, 5, 3, 2, 4, 1, 1, 3],
        backgroundColor: [
          '#3B82F6','#F97316','#8B5CF6',
          '#10B981','#14B8A6','#F43F5E',
          '#FACC15','#6366F1','#4ADE80','#D946EF',
        ],
      }],
    };
    const staticMenData = {
      labels: ['Push ups','Pickle Ball','Table Tennis','Tennis','Cardio Walk','Cardio Jog'],
      datasets: [{ label: 'Participants', data: [15,28,22,17,28,10], backgroundColor: '#1E3A8A' }],
    };
    const staticWomenData = {
      labels: ['Cardio Walk','Carroms','Plank','Badminton'],
      datasets: [{ label: 'Participants', data: [44,17,9,21], backgroundColor: '#9333EA' }],
    };

    return {
      staticSubdivisionData,
      staticMenData,
      staticWomenData,
      menLabels: subs,
      menDatasets,
      womenLabels: subs,
      womenDatasets,
    };
  }, []);

  return (
    <motion.div
      className="max-w-6xl mx-auto px-4 py-12 space-y-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-center text-blue-800 dark:text-blue-300 mb-6">
        🏘️ Community Subdivisions
      </h2>

      {/* First 3 static charts */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            🏡 Subdivision Participation
          </h3>
          <div className="h-64"><Pie data={staticSubdivisionData} options={options} /></div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            👟 Men’s Competitions
          </h3>
          <div className="h-64"><Bar data={staticMenData} options={options} /></div>
        </div>
        <div className="md:col-span-2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            💪 Women’s Competitions
          </h3>
          <div className="h-64"><Bar data={staticWomenData} options={options} /></div>
        </div>
      </div>

      {/* Next 2 stacked charts */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            🧔 Men’s Competitions by Subdivision
          </h3>
          <div className="h-80">
            <Bar
              data={{ labels: menLabels, datasets: menDatasets }}
              options={{
                ...options,
                plugins: {
                  ...options.plugins,
                  title: {
                    display: true,
                    text: "Men’s Competitions (stacked)",
                    color: getTextColor(),
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            💁‍♀️ Women’s Competitions by Subdivision
          </h3>
          <div className="h-80">
            <Bar
              data={{ labels: womenLabels, datasets: womenDatasets }}
              options={{
                ...options,
                plugins: {
                  ...options.plugins,
                  title: {
                    display: true,
                    text: "Women’s Competitions (stacked)",
                    color: getTextColor(),
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-center mb-4 text-blue-700 dark:text-blue-200">
          📍 Subdivisions Map
        </h3>
        <MapContainer
          center={[34.345, -84.093]}
          zoom={12}
          scrollWheelZoom={false}
          className="w-full h-64 rounded-lg shadow-lg"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {subdivisionsMap.map(loc => (
            <Marker key={loc.name} position={[loc.lat, loc.lng]}>
              <Popup>{loc.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </motion.div>
  );
};

export default Subdivisions;
