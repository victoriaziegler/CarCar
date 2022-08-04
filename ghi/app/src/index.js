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
  const salesResponse = await fetch('http://localhost:8090/api/sales');
  const salesPeopleResponse = await fetch('http://localhost:8090/api/sales_people');

  let manufacturerData, automobileData, salesData, salesPeopleData;

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

  if (salesResponse.ok) {
    salesData = await salesResponse.json();
  } else {
    console.error(salesResponse);
  }

  if (salesPeopleResponse.ok) {
    salesPeopleData = await salesPeopleResponse.json();
  } else {
    console.error(salesPeopleResponse);
  }


  root.render(
    <React.StrictMode>
        <App manufacturers={manufacturerData} automobiles={automobileData} sales={salesData} salesPeople={salesPeopleData} />
    </React.StrictMode>
  );
}

loadInventory();