import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import AutomobileList from './AutomobileList';
import VehicleModelsList from './VehicleModels';
import NewVehicleModelForm from './NewVehicleModelForm';
import AutomobileForm from './AutomobileForm';
import SalesPersonForm from './SalesPersonForm';
import NewCustomerForm from './NewCustomerForm';
import SaleRecordForm from './SaleRecordForm';
import SalesList from './SalesList';
import SalesPersonHistory from './SalesPersonHistory';
import TechnicianForm from './TechnicianForm';
import ServiceAppointmentForm from './ServiceAppointmentForm';
import ServiceAppointmentList from './ServiceAppointmentList';

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/models" element={<VehicleModelsList />} />
          <Route path="/technicians/new" element={<TechnicianForm />} />
          <Route path="/services/new" element={<ServiceAppointmentForm />} />
          <Route path="/services/" element={<ServiceAppointmentList />} />
          <Route path="/models/create" element={<NewVehicleModelForm />} />
          <Route path="manufacturers">
            <Route index element={<ManufacturerList manufacturers={props.manufacturers} />} />
            <Route path="new" element={<ManufacturerForm />} />
          </Route> 
          <Route path="automobiles">
            <Route index element={<AutomobileList automobiles={props.automobiles} />} />
            <Route path="new" element={<AutomobileForm />} />
          </Route> 
          <Route path="sales_people/new" element={<SalesPersonForm />} />
          <Route path="customers/new" element={<NewCustomerForm />} />
          <Route path="sales">
            <Route index element={<SalesList sales={props.sales} />} />
            <Route path="new" element={<SaleRecordForm />} />
          </Route>
          <Route path="sales_person_record" element={<SalesPersonHistory sales={props.sales} salespeople={props.salesPeopleData} />} /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

