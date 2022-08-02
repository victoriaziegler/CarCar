import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import VehicleModelsList from './VehicleModels';

function App(props) {
  if (props.manufacturers === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers">
            <Route index element={<ManufacturerList manufacturers={props.manufacturers} />} />
            <Route path="new" element={<ManufacturerForm />} />
          </Route> 
          <Route path="/models" element={<VehicleModelsList models={props.models} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

