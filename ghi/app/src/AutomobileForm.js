import React from 'react';

class AutomobileForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: "",
            year: "",
            vin: "",
            models: [],
        };

        this.handleChangeColor = this.handleChangeColor.bind(this);
        this.handleChangeYear = this.handleChangeYear.bind(this);
        this.handleChangeVin = this.handleChangeVin.bind(this);
        this.handleChangeModel = this.handleChangeModel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        delete data.models;

        const autoUrl = 'http://localhost:8100/api/automobiles/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(autoUrl, fetchConfig);
        if (response.ok) {
            const newAutoMobile = await response.json();
            const cleared = {
                color: '',
                year: '',
                vin: '',
                model_id: '',
            }
            this.setState(cleared);
        }
    }

    handleChangeColor(event) {
        const value = event.target.value;
        this.setState({ color: value });
    }
    handleChangeYear(event) {
        const value = event.target.value;
        this.setState({ year: value });
    }
    handleChangeVin(event) {
        const value = event.target.value;
        this.setState({ vin: value });
    }
    handleChangeModel(event) {
        const value = event.target.value;
        this.setState({ model_id: value });
    }

    async componentDidMount() {
        const MobileUrl = 'http://localhost:8100/api/models/';
    
        const response = await fetch(MobileUrl);
    
        if (response.ok) {
          const data = await response.json();
          this.setState({models: data.models});
        }
      }


    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Add a new automobile!:</h1>
                        <form onSubmit={this.handleSubmit} id="create-automobile-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChangeColor} value={this.state.color} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
                                <label htmlFor="color">Color</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChangeYear} value={this.state.year} placeholder="Year" required type="text" name="year" id="year" className="form-control" />
                                <label htmlFor="year">Year</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChangeVin} value={this.state.vin} placeholder="Vin" required type="text" name="vin" id="vin" className="form-control" />
                                <label htmlFor="vin">VIN</label>
                            </div>
                            <div className="mb-3">
                                <select value={this.state.model_id} onChange={this.handleChangeModel} required name="model_id" id="model_id" className="form-select">
                                <option value="">Choose a Model</option>
                                {this.state.models.map(model => {
                                        return (
                                        <option key={model.id} value={model.id}>
                                            {model.name}
                                        </option>
                                        );
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

export default AutomobileForm;