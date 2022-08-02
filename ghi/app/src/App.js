import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import AutomobileList from './AutomobileList';


function App(props) {
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
          <Route path="automobiles">
            <Route index element={<AutomobileList automobiles={props.automobiles} />} />
            {/* <Route path="new" element={<AutomobileForm />} /> */}
          </Route> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

