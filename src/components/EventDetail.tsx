import React from 'react';

const EventDetail = ({ event }: any) => {
  const { title, description, category, type, date } = event;

  const renderExtraDetails = () => {
    if (title.includes('Pushup Challenge')) {
        return (
          <div className="mt-10 flex flex-col md:flex-row gap-10 items-center md:items-start">
            <div className="md:w-1/2 flex justify-center">
              <img
                src="/pushup-challenge.jpg"
                alt="Pushup"
                className="rounded-xl shadow-lg w-full max-w-md object-contain"
              />
            </div>
            <div className="md:w-1/2 text-left">
              <h3 className="text-2xl font-bold mb-2 text-blue-700 dark:text-blue-300">💪 Pushup Challenge</h3>
              <h4 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-200">📋 Challenge Guidelines</h4>
              <ul className="list-disc list-inside">
                <li>Each community must nominate a team of 2 participants.</li>
                <li>If more than 2 individuals register from the same community, SPOCs will conduct internal trials before May 17 to finalize the team.</li>
                <li>In the finals, total pushups performed by both team members will be combined for a single team score.</li>
                <li>The team with the highest combined number of correctly performed pushups wins.</li>
                <li>Form and accuracy will be judged—each rep must be performed with proper posture and control.</li>
                <li>This challenge will take place in-person on <strong>May 17</strong> at a <strong>TBD venue</strong>.</li>
              </ul>
            </div>
          </div>
        );
      }
  
      // Plank Challenge (Updated)
    if (title.includes('Plank Challenge')) {
      return (
        <div className="mt-10 flex flex-col md:flex-row gap-10 items-center md:items-start">
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/plank-challenge.jpg"
              alt="Plank"
              className="rounded-xl shadow-lg w-full max-w-md object-contain"
            />
          </div>
          <div className="md:w-1/2 text-left">
            <h3 className="text-2xl font-bold mb-2 text-blue-700 dark:text-blue-300">🧘‍♀️ Plank Challenge</h3>
            <h4 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-200">📋 Challenge Guidelines</h4>
            <ul className="list-disc list-inside">
              <li><strong>Format:</strong> Individual competition – one person at a time. Timer starts in correct position.</li>
              <li><strong>Plank Position:</strong> Elbow plank only. Elbows below shoulders. Body must stay straight.</li>
              <li><strong>Time Tracking:</strong> Time continues only in correct position. Any break = timer stops.</li>
              <li><strong>Rounds:</strong> One attempt per participant.</li>
              <li><strong>Clothing:</strong> Wear comfortable workout gear. Use a mat or soft surface.</li>
            </ul>
          </div>
        </div>
      );
    }

    // Carroms Challenge
    if (title.includes('Carroms')) {
      return (
        <div className="mt-10 flex flex-col md:flex-row gap-10 items-center md:items-start">
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/carroms-challenge.jpg"
              alt="Carroms"
              className="rounded-xl shadow-lg w-full max-w-md object-contain"
            />
          </div>
          <div className="md:w-1/2 text-left">
            <h3 className="text-2xl font-bold mb-2 text-blue-700 dark:text-blue-300">🎯 Carroms Competition</h3>
            <h4 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-200">📋 Challenge Guidelines</h4>
            <ul className="list-disc list-inside">
              <li><strong>Teams:</strong> Doubles (2 per team). Format will be finalized based on registrations.</li>
              <li><strong>Goal:</strong> Pocket all your coins before your opponent. Queen (Red) must be covered in next shot.</li>
              <li><strong>Playing Rules:</strong>
                <ul className="ml-5 list-disc">
                  <li>Pocket your coin → continue turn.</li>
                  <li>Miss → opponent’s turn.</li>
                  <li>No back and side flicks.</li>
                  <li>Striker pocketed → 1 of your coins returned to board.</li>
                  <li>Directly pocket opponent’s coin → turn ends.</li>
                  <li>Uncovered Queen → placed back at center.</li>
                  <li>Rough play → opponent gets to place one coin back.</li>
                </ul>
              </li>
              <li><strong>Position Rules:</strong> You may hit coins on arrows. Cannot directly hit opponent’s coin.</li>
            </ul>
          </div>
        </div>
      );
    }
  
    if (title.includes('Badminton Competition')) {
      return (
        <div className="mt-10 flex flex-col md:flex-row gap-10 items-center md:items-start">
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/badminton-challenge.jpg"
              alt="Badminton"
              className="rounded-xl shadow-lg w-full max-w-md object-contain"
            />
          </div>
          <div className="md:w-1/2 text-left">
            <h3 className="text-2xl font-bold mb-2 text-blue-700 dark:text-blue-300">🏸 Badminton Competition</h3>
            <h4 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-200">📋 Challenge Guidelines</h4>
            <ul className="list-disc list-inside">
              <li>This competition is conducted in doubles format only.</li>
              <li>All matches follow a best-of-three sets format, with each set played to 21 points.</li>
              <li>If multiple players register from the same community, internal selection matches will be organized by the community SPOC.</li>
              <li>Only 2 players from each community will be selected to represent in the finals.</li>
              <li>The final matches will be held on <strong>May 17th</strong> at a venue <strong>To Be Decided</strong>.</li>
            </ul>
          </div>
        </div>
      );
    }

    if (title.includes('Table Tennis Competition')) {
      return (
        <div className="mt-10 flex flex-col md:flex-row gap-10 items-center md:items-start">
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/table-tennis-challenge.jpg"
              alt="Table Tennis"
              className="rounded-xl shadow-lg w-full max-w-md object-contain"
            />
          </div>
          <div className="md:w-1/2 text-left">
            <h3 className="text-2xl font-bold mb-2 text-blue-700 dark:text-blue-300">🏓 Table Tennis Competition</h3>
            <h4 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-200">📋 Challenge Guidelines</h4>
            <ul className="list-disc list-inside">
              <li>This event will be held in doubles format only.</li>
              <li>Each match consists of the best-of-three games, each played to 11 points.</li>
              <li>Communities with more than 2 participants will conduct internal trials through their SPOC.</li>
              <li>The top 2 players selected will represent the community in the finals.</li>
              <li>Final matches take place on <strong>May 17th</strong> at a <strong>TBD venue</strong>.</li>
            </ul>
          </div>
        </div>
      );
    }
    if (title.includes('Cardio/Distance Tracking (Walk)')) {
        return (
          <div className="mt-10 flex flex-col md:flex-row gap-10 items-center md:items-start">
            <div className="md:w-1/2 flex justify-center">
              <img
                src="/cardio-walk.jpg"
                alt="Cardio Walk"
                className="rounded-xl shadow-lg w-full max-w-md object-contain"
              />
            </div>
            <div className="md:w-1/2 text-left">
              <h3 className="text-2xl font-bold mb-2 text-blue-700 dark:text-blue-300">🚶 Cardio Walk Challenge</h3>
              <h4 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-200">📋 Challenge Guidelines</h4>
              <ul className="list-disc list-inside">
                <li><strong>Timeline:</strong> April 19 – May 15</li>
                <li>Challenge is based on the highest total number of steps logged during the challenge period.</li>
                <li>Steps must be tracked using the Pacer app. Make sure it is actively logging throughout.</li>
                <li>To join the Pacer Challenge:</li>
                <ul className="ml-5 list-disc">
                  <li>Men's Code: <code className="text-blue-700 dark:text-blue-300 font-semibold">BB6FSY97</code></li>
                  <li>Women's Code: <code className="text-blue-700 dark:text-blue-300 font-semibold">BKS92XP3</code></li>
                </ul>
              </ul>
            </div>
          </div>
        );
      }
  
      if (title.includes('Cardio/Distance Tracking (Jog)')) {
        return (
          <div className="mt-10 flex flex-col md:flex-row gap-10 items-center md:items-start">
            <div className="md:w-1/2 flex justify-center">
              <img
                src="/cardio-jog.jpg"
                alt="Cardio Jog"
                className="rounded-xl shadow-lg w-full max-w-md object-contain"
              />
            </div>
            <div className="md:w-1/2 text-left">
              <h3 className="text-2xl font-bold mb-2 text-blue-700 dark:text-blue-300">🏃 Cardio Jog Challenge</h3>
              <h4 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-200">📋 Challenge Guidelines</h4>
              <ul className="list-disc list-inside">
                <li><strong>Timeline:</strong> April 19 – May 15</li>
                <li>The challenge winner is determined by the highest distance logged in miles.</li>
                <li>Participants must use the Pacer app to log their jog sessions consistently.</li>
                <li>Join the Pacer Challenge with the code:</li>
                <ul className="ml-5 list-disc">
                  <li>Men's Jog Code: <code className="text-blue-700 dark:text-blue-300 font-semibold">BD2P17BP</code></li>
                </ul>
                <li>Keep pushing your limits and inspire others!</li>
              </ul>
            </div>
          </div>
        );
      }
      

    if (title.includes('Tennis Competition')) {
      return (
        <div className="mt-10 flex flex-col md:flex-row gap-10 items-center md:items-start">
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/tennis-challenge.jpg"
              alt="Tennis"
              className="rounded-xl shadow-lg w-full max-w-md object-contain"
            />
          </div>
          <div className="md:w-1/2 text-left">
            <h3 className="text-2xl font-bold mb-2 text-blue-700 dark:text-blue-300">🎾 Tennis Competition</h3>
            <h4 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-200">📋 Challenge Guidelines</h4>
            <ul className="list-disc list-inside">
              <li>Only doubles format matches will be conducted for this competition.</li>
              <li>Each community will select 2 representatives through SPOC-led internal matches, if needed.</li>
              <li>Final competition takes place on <strong>May 17th</strong> at a <strong>TBD venue</strong>.</li>
            </ul>
          </div>
        </div>
      );
    }

    return (
      <p className="text-md text-gray-600 dark:text-gray-300 mt-4">More info coming soon, including rules, venue details, and gallery!</p>
    );
  };

  return (
    <section className="max-w-5xl mx-auto px-4 mt-12 text-center">
      <h2 className="text-3xl font-bold text-blue-800 dark:text-blue-300 mb-4">{title}</h2>
      <p className="text-lg text-gray-700 dark:text-gray-200 mb-2">{description}</p>
      <p className="text-md text-gray-500 dark:text-gray-300 mb-4">Category: {category} | Type: {type} | Date: {date}</p>
      {renderExtraDetails()}
    </section>
  );
};

export default EventDetail;
