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

// Leaflet icon fix
delete (L.Icon.Default as any).prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl:   'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Theme and tooltip helpers
const getTextColor = (): string =>
  document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#1f2937';
const getTooltipBgColor = (): string =>
  document.documentElement.classList.contains('dark') ? '#1f2937' : '#ffffff';
const getTooltipBorderColor = (): string =>
  document.documentElement.classList.contains('dark') ? '#e5e7eb22' : '#1f293722';

// Shared chart options
const useChartOptions = () => ({
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 800, easing: 'easeOutQuart' },
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
    x: { ticks: { color: getTextColor() }, grid: { color: getTextColor() + '22' } },
    y: { ticks: { color: getTextColor() }, grid: { color: getTextColor() + '22' } },
  },
});

// Sport color map
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

// Pie slice palette
const pieColors: string[] = [
  '#3B82F6', '#F97316', '#8B5CF6', '#10B981', '#14B8A6',
  '#F43F5E', '#FACC15', '#6366F1', '#4ADE80', '#D946EF',
];

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

type Entry = { subdivision: string; mens: string; womens: string };

// Map markers
const subdivisionsMap = [
  { name: 'Sosebee Creek',   lat: 34.343527, lng: -84.070764 },
  { name: 'Woods at Dawson', lat: 34.356506, lng: -84.064244 },
  { name: 'Dawson Grove',    lat: 34.3402,   lng: -84.1033   },
  { name: 'Crosby Square',   lat: 34.42638,  lng: -84.138556 },
  { name: 'Oaks at Dawson',  lat: 34.42638,  lng: -84.138556 },
  { name: 'Ellorie Estates', lat: 34.330472, lng: -84.095752 },
  { name: 'Addison Groove',  lat: 34.333502, lng: -84.086081 },
  { name: 'Kenneson Creek',  lat: 34.316495, lng: -84.097573 },
  { name: 'Etowah Preserve', lat: 34.35319,  lng: -84.128995 },
  { name: 'Conner Farm',     lat: 34.319114, lng: -84.098765 },
  { name: 'Other',           lat: 34.3300,   lng: -84.0900   },
];

export default function Subdivisions() {
  const [subFilter, setSubFilter] = useState('All');
  const [sportFilter, setSportFilter] = useState('All');
  const chartOptions = useChartOptions();

  // Parse TSV entries
  const entries: Entry[] = useMemo(() =>
    rawTSV.trim().split('\n').slice(1).map(line => {
      const [subdivision, mens, womens] = line.split('\t');
      return { subdivision, mens: mens || '', womens: womens || '' };
    }), []);

  // Filters
  const subdivisions = useMemo(() => ['All', ...new Set(entries.map(e => e.subdivision))], [entries]);
  const sports = useMemo(() => {
    const s = new Set<string>();
    entries.forEach(({ mens, womens }) => {
      mens.split(',').forEach(x => x.trim() && s.add(x.trim()));
      womens.split(',').forEach(x => x.trim() && s.add(x.trim()));
    });
    return ['All', ...Array.from(s)];
  }, [entries]);

  // Filtered entries
  const filtered = useMemo(() =>
    entries.filter(({ subdivision, mens, womens }) =>
      (subFilter === 'All' || subdivision === subFilter) &&
      (sportFilter === 'All' || mens.includes(sportFilter) || womens.includes(sportFilter))
    ), [entries, subFilter, sportFilter]);

  // Chart data
  const { pieData, menBarData, womenBarData, menStack, womenStack } = useMemo(() => {
    // Pie
    const subCounts: Record<string, number> = {};
    filtered.forEach(({ subdivision, mens, womens }) => {
      subCounts[subdivision] = (subCounts[subdivision] || 0)
        + (mens ? mens.split(',').length : 0)
        + (womens ? womens.split(',').length : 0);
    });
    const pieLabels = Object.keys(subCounts);
    const pieValues = pieLabels.map(l => subCounts[l]);

    // Men bar
    const menList: string[] = [];
    filtered.forEach(({ mens }) =>
      mens.split(',').map(x => x.trim()).filter(Boolean).forEach(x => menList.push(x))
    );
    const menCounts: Record<string, number> = {};
    menList.forEach(x => menCounts[x] = (menCounts[x] || 0) + 1);
    const menLabels = Object.keys(menCounts);
    const menValues = menLabels.map(l => menCounts[l]);

    // Women bar
    const womenList: string[] = [];
    filtered.forEach(({ womens }) =>
      womens.split(',').map(x => x.trim()).filter(Boolean).forEach(x => womenList.push(x))
    );
    const womenCounts: Record<string, number> = {};
    womenList.forEach(x => womenCounts[x] = (womenCounts[x] || 0) + 1);
    const womenLabels = Object.keys(womenCounts);
    const womenValues = womenLabels.map(l => womenCounts[l]);

    // Stacked
    const subs = Array.from(new Set(filtered.map(e => e.subdivision)));
    const buildMap = (key: 'mens' | 'womens') => {
      const m: Record<string, Record<string, number>> = {};
      subs.forEach(s => m[s] = {});
      filtered.forEach(e =>
        e[key].split(',').map(x => x.trim()).filter(Boolean)
          .forEach(sp => m[e.subdivision][sp] = (m[e.subdivision][sp] || 0) + 1)
      );
      return m;
    };
    const menMap = buildMap('mens');
    const womenMap = buildMap('womens');
    const menSports = Array.from(new Set(menList));
    const womenSports = Array.from(new Set(womenList));
    const menStackDs = menSports.map(sp => ({ label: sp, data: subs.map(s => menMap[s][sp] || 0), backgroundColor: colorMap[sp] || '#999' }));
    const womenStackDs = womenSports.map(sp => ({ label: sp, data: subs.map(s => womenMap[s][sp] || 0), backgroundColor: colorMap[sp] || '#999' }));

    return {
      pieData: { labels: pieLabels, datasets: [{ data: pieValues, backgroundColor: pieLabels.map((_, i) => pieColors[i % pieColors.length]), borderColor: getTextColor(), borderWidth: 1 }] },
      menBarData: { labels: menLabels, datasets: [{ label: 'Men participants', data: menValues, backgroundColor: '#1E3A8A' }] },
      womenBarData: { labels: womenLabels, datasets: [{ label: 'Women participants', data: womenValues, backgroundColor: '#9333EA' }] },
      menStack:   { labels: subs, datasets: menStackDs.map(ds => ({ ...ds })) },
      womenStack: { labels: subs, datasets: womenStackDs.map(ds => ({ ...ds })) },
    };
  }, [filtered]);

  return (
    <motion.div className="max-w-6xl mx-auto px-4 py-8 space-y-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      {/* Header & Filters */}
      <h2 className="text-3xl font-bold text-center text-blue-800 dark:text-blue-300 mb-4">🏘️ Community Subdivisions</h2>
      <div className="flex flex-wrap gap-4 justify-center items-center mb-6">
        <span className="text-lg font-medium text-gray-700 dark:text-gray-300">Subdivisions:</span>
        <select className="p-2 border rounded" value={subFilter} onChange={e => setSubFilter(e.target.value)}>
          {subdivisions.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <span className="text-lg font-medium text-gray-700 dark:text-gray-300 ml-4">Sport:</span>
        <select className="p-2 border rounded" value={sportFilter} onChange={e => setSportFilter(e.target.value)}>
          {sports.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Charts Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Pie */}
        <motion.div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">🏡 Subdivision Distribution</h3>
          <div className="h-64"><Pie data={pieData} options={chartOptions} /></div>
        </motion.div>
        {/* Men’s Bar */}
        <motion.div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">👟 Men’s Competitions</h3>
          <div className="h-64"><Bar data={menBarData} options={chartOptions} /></div>
        </motion.div>
        {/* Women’s Bar*/}
        <motion.div className="md:col-span-2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">💪 Women’s Competitions</h3>
          <div className="h-64"><Bar data={womenBarData} options={chartOptions} /></div>
        </motion.div>
        {/* Men’s Stacked */}
        <motion.div className="bg-white dark:bg-gray-800 p-4 rounded corners shadow" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">🧔 Men’s by Subdivision</h3>
          <div className="h-80">
            <Bar
              data={menStack}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  title: { display: true, text: "Men’s Competitions by Subdivision", color: getTextColor() }
                },
                scales: {
                  x: { ...chartOptions.scales.x, stacked: true },
                  y: { ...chartOptions.scales.y, stacked: true }
                }
              }}
            />
          </div>
        </motion.div>
        {/* Women’s Stacked */}
        <motion.div className="bg-white dark:bg-gray-800 p-4 rounded corners shadow" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">💁‍♀️ Women’s by Subdivision</h3>
          <div className="h-80">
            <Bar
              data={womenStack}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  title: { display: true, text: "Women’s Competitions by Subdivision", color: getTextColor() }
                },
                scales: {
                  x: { ...chartOptions.scales.x, stacked: true },
                  y: { ...chartOptions.scales.y, stacked: true }
                }
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Map */}
      <div>
        <h3 className="text-2xl font-bold text-center text-blue-700 dark:text-blue-200 mb-2">📍 Subdivision Map</h3>
        <MapContainer center={[34.345, -84.093]} zoom={12} scrollWheelZoom={false} className="w-full h-64 rounded-lg shadow">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
          {subdivisionsMap.map(loc => (
            <Marker key={loc.name} position={[loc.lat, loc.lng]}>
              <Popup>{loc.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </motion.div>
  );
}

