import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import VehicleModelsList from './VehicleModels';
import NewVehicleModelForm from './NewVehicleModelForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/models" element={<VehicleModelsList />} />
          {/* <Route path="/models/create" element={<VehicleModelsList />} /> */}
          <Route path="/models/create" element={<NewVehicleModelForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
