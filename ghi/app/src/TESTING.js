// import React from "react";

// class ServiceAppointmentList extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {services: []}

//     // this.deleteShoe = this.deleteShoe.bind(this);
//     this.deleteService = this.deleteService.bind(this);
//   }

//   async componentDidMount() {
//     const response = await fetch('http://localhost:8080/api/services/')
//     if (response.ok) {
//       const data = await response.json()
//       this.setState({ services: data.services })
//     }
//   }
//   async deleteService(service) {
//     const cancelUrl = `http://localhost:8080/api/services/${service.id}`
//     const fetchConfig = {
//       method: "delete"
//     }
//     await fetch(cancelUrl, fetchConfig)

//     const delId = this.state.services.indexOf(service)
//     const remainingServices = [...this.state.services]
//     remainingServices.splice(delId, 1)
//     this.setState({ services: remainingServices })
//   }

//   async xxxxx(id) {
//     const changeUrl = `http://localhost:8080/api/services/${serv}/`
//     const fetchConfig = {
//         method: "put",
//         body: JSON.stringify({finished: true}),
//         headers: {
//         'Content-Type': 'application/json',
//         },
//     }
//     const response = await fetch(changeUrl, fetchConfig)
//     if (response.ok) {
//       const updated = await response.json()
//       console.log(updated)
//     }
//     const newAppointments = this.state.services.filter((service) => {return service.id === this.state.id})
//     this.setState({services: newAppointments})
    
//     // async handleSubmit(event) {
//     //   event.preventDefault();

//     //   const datos = this.state.services.filter((service) => {return service.vin === this.state.vin})
//     //   console.log(datos)
//     //   this.setState({services: datos})

//     // const delId = this.state.services.indexOf(service)
//     // const remainingServices = [...this.state.services]
//     // remainingServices.splice(delId, 1)
//     // this.setState({ services: remainingServices })

// }


//   render() {
//     return (
//         <> 
//         <h1>Service Appointments</h1>
//         <table className="table table-dark table-striped border-warning">
//           <thead>
//             <tr>
//               <th>Vin</th>
//               <th>Customer name</th>
//               <th>Date</th>
//               <th>Time</th>
//               <th>Technician</th>
//               <th>Reason</th>
//               <th>Vip</th>
//               <th>Cancel</th>
//               <th>Done?</th>
//             </tr>
//           </thead>
//           <tbody>
//           {this.state.services.map(service => {
//               return (
//                 <tr key={service.id}>
//                     <td>{service.vin}</td>
//                     <td>{service.owner_name}</td>
//                     <td>{service.date}</td>
//                     <td>{service.time}</td>
//                     <td>{service.technician.name}</td>
//                     <td>{service.reason}</td>
//                     <td>{service.vip ? "VIP" : "Nope"}</td>
//                     <td><button className="btn btn-outline-danger" onClick={() => this.deleteService(service)}>Cancel</button></td>
//                     <td><button className='btn btn-light' onClick={() => this.finishService(service.id)}>Finish</button></td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table> </>
//     )
//   }
// }
  
// export default xxxxx