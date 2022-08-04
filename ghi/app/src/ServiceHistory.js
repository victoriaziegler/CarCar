import React from "react";

class ServicesAppointmentsHistory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            vin: '',
            services: []}
    

    this.handleVinChange=this.handleVinChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)    

    }
    handleVinChange(event) {
        const value = event.target.value;
        this.setState({vin: value})
    }
    async handleSubmit(event) {
        event.preventDefault();

        const datos = this.state.services.filter((service) => {return service.vin === this.state.vin})
        console.log(datos)
        this.setState({services: datos})
    }

    // await fetch(changeUrl, fetchConfig)
    // const delId = this.state.services.indexOf(service)
    // const remainingServices = [...this.state.services]
    // remainingServices.splice(delId, 1)
    // this.setState({ services: remainingServices })
    
    async componentDidMount() {
        const servicesUrl = 'http://localhost:8080/api/services/'

        const response = await fetch(servicesUrl)
        if (response.ok) {
            const specificCar = await response.json()
            this.setState({services: specificCar.services})      
        }
      }
    
    render () {
        return (
            <>
            {/* <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form> */}
            <h1>Service History</h1>
            <form className="form-inline" onSubmit={this.handleSubmit}
            id="specific-car-history">
            <div>
            <input onChange={this.handleVinChange} value={this.state.vin} type="search"placeholder="Car's Vin..."
            className="p-3 mb-2 bg-dark text-white" name="vin" aria-label="Search" id="vin" />
            <button variant="outline-success" className="p-3 mb-2 bg-warning text-dark">Search</button>
            </div>
            </form>
            <table className="table table-dark table-striped border-warning">
              <thead>
                <tr>
                  <th>VIN</th>
                  <th>Customer Name</th>
                  <th>Appointment Date</th>
                  <th>Appointment Time</th>
                  <th>Assigned Technician</th>
                  <th>Service Reason</th>
                </tr>
              </thead>
              <tbody>
                {this.state.services.map(service => {
                  return (
                    <tr key={service.vin}>
                      <td>{service.vin}</td>
                      <td>{service.owner_name}</td>
                      <td>{service.date}</td>
                      <td>{service.time}</td>
                      <td>{service.technician.name}</td>
                      <td>{service.reason}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            
            </>
        )        
    }
}



  
export default ServicesAppointmentsHistory

// "vin",
// "owner_name",
// "date",
// "time",
// "technician",
// "reason",
// "finished",
// "vip",
// "id"