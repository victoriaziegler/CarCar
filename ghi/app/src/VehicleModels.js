import React from "react";

class VehicleModelsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {models: []}

    this.deleteModel = this.deleteModel.bind(this);
  }

//   async componentDidMount() {
//     const response = await fetch('http://localhost:8100/api/models/')
//     if (response.ok) {
//       const data = await response.json()
//       this.setState({ models: data.models })
//     }
//   }

  async deleteModel(model) {
    const deleteUrl = `http://localhost:8100/api/models/${model.id}`
    const fetchConfig = {
      method: "delete"
    }
    await fetch(deleteUrl, fetchConfig)

    const idx = this.state.models.indexOf(model)
    const updated_models = [...this.state.models]
    updated_models.splice(idx, 1)
    this.setState({ models: updated_models })
  }

  render() {
    return (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Manufacturer</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
            {this.state.models.map(model => {
              return (
                <tr key={model.id}>
                    <td>{model.name}</td>
                    <td>{model.manufacturer}</td>
                    <td><img src={model.picture_url} width="300" /></td>
                    <td><button className="btn btn-danger" onClick={() => this.deleteModel(model)}>Delete</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
    )
  }
}
  
export default VehicleModelsList
