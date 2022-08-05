import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown bg-dark">
              <a className="nav-link dropdown-toggle bg-dark" data-bs-toggle="dropdown">Manufacturers</a>
              <div className="dropdown-menu bg-dark">
              <li className="nav-item">
                <NavLink className="nav-link" to="/manufacturers">Manufacturers</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/manufacturers/new">Add A Manufacturer</NavLink>
              </li>
              </div>
            </li>
            <li className="nav-item dropdown bg-dark">
              <a className="nav-link dropdown-toggle bg-dark" data-bs-toggle="dropdown">Automobiles</a>
              <div className="dropdown-menu bg-dark">
              <li className="nav-item">
                <NavLink className="nav-link" to="/automobiles">Automobiles</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/automobiles/new">Add An Automobile</NavLink>
              </li>
              </div>
            </li>
            <li className="nav-item dropdown bg-dark">
              <a className="nav-link dropdown-toggle bg-dark" data-bs-toggle="dropdown">Vehicles</a>
              <div className="dropdown-menu bg-dark">
              <li className="nav-item">
                <NavLink className="nav-link" to="/models">Vehicle Models</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/models/create">Add A Vehicle Model</NavLink>
              </li>
              </div>
            </li>
            <li className="nav-item dropdown bg-dark">
            <a className="nav-link dropdown-toggle bg-dark" data-bs-toggle="dropdown">Sales</a>
            <div className="dropdown-menu bg-dark">
              <li className="nav-item">
                <NavLink className="nav-link" to="/sales">All Sales</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/sales_person_record">Sales Person's History</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/sales/new">Add A Sale Record</NavLink>
              </li>
              </div>
            </li>
            <li className="nav-item dropdown bg-dark">
              <a className="nav-link dropdown-toggle bg-dark" data-bs-toggle="dropdown">Services Appointments</a>
              <div className="dropdown-menu bg-dark">
              <li className="nav-item">
              <NavLink className="nav-link" to="/services/new">Add Service appointment</NavLink>
              </li>
              <li className="nav-item">
              <NavLink className="nav-link" to="/services">List of Appointments</NavLink>
              </li>
              <li className="nav-item">
              <NavLink className="nav-link" to="/services/search">Service History by VIN</NavLink>
              </li>
              </div>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/customers/new">Add A Customer</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sales_people/new">Add A Sales Person</NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/technicians/new">Add Technician</NavLink>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
