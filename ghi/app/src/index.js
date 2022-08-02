import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

async function loadInventory() {
  const manufacturerResponse = await fetch('http://localhost:8100/api/manufacturers/');
  const automobileResponse = await fetch('http://localhost:8100/api/automobiles/');
  let manufacturerData, automobileData;

  if (manufacturerResponse.ok) {
    manufacturerData = await manufacturerResponse.json();
  } else {
    console.error(manufacturerResponse);
  }

  if (automobileResponse.ok) {
    automobileData = await automobileResponse.json();
  } else {
    console.error(automobileResponse);
  }

  root.render(
    <React.StrictMode>
        <App manufacturers={manufacturerData} automobiles={automobileData} />
    </React.StrictMode>
  );
}

loadInventory();