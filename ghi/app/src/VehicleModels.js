import React from "react";

class VehicleModelsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {vehiclesModels: []}
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:8100/api/models/')
    if (response.ok) {
      const data = await response.json()
      this.setState({ vehiclesModels: data.models })
    }
  }

  render() {
    return (
        <> 
        <h1>Vehicle Models</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Manufacturer</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
            {this.state.vehiclesModels.map(vehicle => {
              return (
                <tr key={vehicle.id}>
                    <td>{vehicle.name}</td>
                    <td>{vehicle.manufacturer.name}</td>
                    <td><img src={vehicle.picture_url} width="200" /></td>
                </tr>
              );
            })}
          </tbody>
        </table> </>
    )
  }
}
  
export default VehicleModelsList
