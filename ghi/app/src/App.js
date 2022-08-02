import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import AutomobileList from './AutomobileList';
import VehicleModelsList from './VehicleModels';
import NewVehicleModelForm from './NewVehicleModelForm';
import AutomobileForm from './AutomobileForm';

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/models" element={<VehicleModelsList />} />
          {/* <Route path="/models/create" element={<VehicleModelsList />} /> */}
          <Route path="/models/create" element={<NewVehicleModelForm />} />
          <Route path="manufacturers">
            <Route index element={<ManufacturerList manufacturers={props.manufacturers} />} />
            <Route path="new" element={<ManufacturerForm />} />
          </Route> 
          <Route path="automobiles">
            <Route index element={<AutomobileList automobiles={props.automobiles} />} />
            <Route path="/automobiles/new" element={<AutomobileForm />} />
          </Route> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

