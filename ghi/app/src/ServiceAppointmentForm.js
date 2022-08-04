import React from 'react'

class ServiceAppointmentForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
        vin: '',
        owner_name: '',
        date: '',
        time: '',
        reason: '',
        technician: '',
        technicians: [],
    }
    // "vin",
    //     "owner_name",
    //     "date",
    //     "time",
    //     "technician",
    //     "reason",
    //     "finished",
    //     "vip",
    this.handleVinChange = this.handleVinChange.bind(this)
    this.handleOwnerNameChange = this.handleOwnerNameChange.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleTimeChange = this.handleTimeChange.bind(this)
    this.handleReasonChange = this.handleReasonChange.bind(this)
    this.handleTechnicianChange = this.handleTechnicianChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
}


async handleSubmit(event) {
    event.preventDefault();
    const datos = {...this.state};
    delete datos.technicians;
    console.log(datos);

    const servicesUrl = 'http://localhost:8080/api/services/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(datos),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(servicesUrl, fetchConfig);
    if (response.ok) {
      const newService = await response.json();
      console.log(newService);

      const cleared = {
        vin: '',
        owner_name: '',
        date: '',
        time: '',
        technician: '',
        reason: '',
        technician: '',
      };
      this.setState(cleared);
    }
}

handleOwnerNameChange(event) {
    const value = event.target.value;
    this.setState({owner_name: value})
}

handleDateChange(event) {
    const value = event.target.value;
    this.setState({date: value})
}

handleVinChange(event) {
    const value = event.target.value;
    this.setState({vin: value})
}

handleTimeChange(event) {
    const value = event.target.value;
    this.setState({time: value})
}

handleReasonChange(event) {
    const value = event.target.value;
    this.setState({reason: value})
}

handleTechnicianChange(event) {
    const value = event.target.value;
    this.setState({technician: value})
}

async componentDidMount() {
    const url = 'http://localhost:8080/api/technicians/';

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();

      this.setState({technicians: data.technicians});

    }
  }

render () {
    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new service appointment!</h1>
                    <form onSubmit={this.handleSubmit} id="create-service-form">
                    <div className="form-floating mb-3">
                        <input onChange={this.handleVinChange} value={this.state.vin} placeholder="Vin" required type="text" name="vin" id="vin" className="form-control"/>
                        <label htmlFor="vin">Vin</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleOwnerNameChange} value={this.state.owner_name} placeholder="Owner_name" required type="text" name="owner_name" id="owner_name" className="form-control"/>
                        <label htmlFor="owner_name">Owner name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleDateChange} value={this.state.date} placeholder="Date" required type="text" name="date" id="date" className="form-control"/>
                        <label htmlFor="date">Date</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleTimeChange} value={this.state.time} placeholder="Time" required type="text" name="time" id="time" className="form-control"/>
                        <label htmlFor="time">Time</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleReasonChange} value={this.state.reason} placeholder="Reason" required type="text" name="reason" id="reason" className="form-control"/>
                        <label htmlFor="reason">Reason</label>
                    </div>
                    <div className="mb-3">
                        <select onChange={this.handleTechnicianChange} value={this.state.technician} required name="technician" id="technician" className="form-select">
                        <option value="">Choose a technician</option>
                        {this.state.technicians.map(technician => {
                            return (
                                <option key={technician.id} value={technician.name}>
                                {technician.name}
                                </option>
                            )
                        })}
                        </select>
                    </div>
                    <button className="btn btn-primary">Create an appointment!</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
}


export default ServiceAppointmentForm;
