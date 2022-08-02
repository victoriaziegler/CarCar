import React from 'react';

class ManufacturerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };

        const locationUrl = 'http://localhost:8100/api/manufacturers/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(locationUrl, fetchConfig);
        if (response.ok) {
            const newManufacturer = await response.json();
            const cleared = {
                name: '',
            }
            this.setState(cleared);
        }
    }

    handleChangeName(event) {
        const value = event.target.value;
        this.setState({ name: value });
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Add a new manufacturer:</h1>
                        <form onSubmit={this.handleSubmit} id="create-conference-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChangeName} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                                <label htmlFor="name">Manufacturer Name</label>
                            </div>
                            <button className="btn btn-primary">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ManufacturerForm;
