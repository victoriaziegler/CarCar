import React from "react";

class ServiceAppointmentList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { services: [] }
    this.deleteService = this.deleteService.bind(this);
    this.finishService = this.finishService.bind(this);
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:8080/api/services/')
    if (response.ok) {
      const data = await response.json()
      this.setState({ services: data.services })
    }
  }
  async deleteService(service) {
    const cancelUrl = `http://localhost:8080/api/services/${service.id}`
    const fetchConfig = {
      method: "delete"
    }
    await fetch(cancelUrl, fetchConfig)

    const delId = this.state.services.indexOf(service)
    const remainingServices = [...this.state.services]
    remainingServices.splice(delId, 1)
    this.setState({ services: remainingServices })
  }

  async finishService(service) {
    const changeUrl = `http://localhost:8080/api/services/${service}/`

    const fetchConfig = {
      method: "put",
      body: JSON.stringify({
        finished: true,
      }
      ),
      headers: {
        'Content-Type': 'application/json',
      },
    }
    await fetch(changeUrl, fetchConfig)
    const delId = this.state.services.indexOf(service)
    const remainingServices = [...this.state.services]
    remainingServices.splice(delId, 1)
    this.setState({ services: remainingServices })

  }


  render() {
    return (
      <>
        <h1>Service Appointments</h1>
        <table className="table table-dark table-striped border-warning">
          <thead>
            <tr>
              <th>Vin</th>
              <th>Customer name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Technician</th>
              <th>Reason</th>
              <th>Vip</th>
              <th>Cancel</th>
              <th>Done?</th>
            </tr>
          </thead>
          <tbody>
            {this.state.services.map(service => {
              return (
                (service.finished === false) ?
                  <tr key={service.id}>
                    <td>{service.vin}</td>
                    <td>{service.owner_name}</td>
                    <td>{service.date}</td>
                    <td>{service.time}</td>
                    <td>{service.technician.name}</td>
                    <td>{service.reason}</td>
                    <td>{service.vip ? "VIP" : "Nope"}</td>
                    <td><button className="btn btn-outline-danger" onClick={() => this.deleteService(service)}>Cancel</button></td>
                    <td><button className='btn btn-light' onClick={() => this.finishService(service.id)}>Finish</button></td>
                  </tr>
                  : null
              );
            })}
          </tbody>
        </table> </>
    )
  }
}

export default ServiceAppointmentList