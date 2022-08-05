import React from 'react';

class NewVehicleModelForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      picture_url: "",
      manufacturer: "",
      manufacturers: [],
    }

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeManufacturer = this.handleChangeManufacturer.bind(this);
    this.handleChangePicture = this.handleChangePicture.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    delete data.manufacturers
    data.manufacturer_id = data.manufacturer
    delete data.manufacturer

    const vehicleModelUrl = 'http://localhost:8100/api/models/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(vehicleModelUrl, fetchConfig);
    if (response.ok) {
      const newVehicleModel = await response.json();
      const cleared = {
        name: "",
        picture_url: "",
        manufacturer: "",
      };
      this.setState(cleared);
    }
  }

  handleChangeName(event) {
    const value = event.target.value;
    this.setState({ name: value });
  }

  handleChangePicture(event) {
    const value = event.target.value;
    this.setState({ picture_url: value });
  }

  handleChangeManufacturer(event) {
    const value = event.target.value;
    this.setState({ manufacturer: value });
  }

  async componentDidMount() {
    const url = 'http://localhost:8100/api/manufacturers/';

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      this.setState({ manufacturers: data.manufacturers });
    }
  }

  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a Vehicle Model!</h1>
            <form onSubmit={this.handleSubmit} id="create-vehicle-model-form">
              <div className="form-floating mb-3">
                <input onChange={this.handleChangeName} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                <label htmlFor="name">Model name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleChangePicture} value={this.state.picture_url} placeholder="Picture" required type="text" name="picture_url" id="picture_url" className="form-control" />
                <label htmlFor="picture_url">Picture URL</label>
              </div>
              <div className="form-floating mb-3">
                <select onChange={this.handleChangeManufacturer} value={this.state.manufacturer} placeholder="Manufacturer" required name="manufacturer" id="manufacturer" className="form-select">
                  <option value="">Choose a manufacturer</option>
                  {this.state.manufacturers.map(manufacturer => {
                    return (
                      <option key={manufacturer.id} value={manufacturer.id}>
                        {manufacturer.name}
                      </option>
                    )
                  })}
                </select>
              </div>
              <button className="btn btn-primary">Add</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NewVehicleModelForm;

