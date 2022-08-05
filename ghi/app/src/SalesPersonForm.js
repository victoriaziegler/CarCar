import React from 'react';

class SalesPersonForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            employeeNumber: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeEmployeeNumber = this.handleChangeEmployeeNumber.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        data.employee_number = data.employeeNumber;
        delete data.employeeNumber
        const salesPeopleUrl = 'http://localhost:8090/api/sales_people/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(salesPeopleUrl, fetchConfig);
        if (response.ok) {
            const newSalesPerson = await response.json();
            const cleared = {
                name: '',
                employeeNumber: '',
            }
            this.setState(cleared);
        }
    }

    handleChangeName(event) {
        const value = event.target.value;
        this.setState({ name: value });
    }

    handleChangeEmployeeNumber(event) {
        const value = event.target.value;
        this.setState({ employeeNumber: value });
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Add a new sales person:</h1>
                        <form onSubmit={this.handleSubmit} id="create-sales-person-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChangeName} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                                <label htmlFor="name">Employee Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChangeEmployeeNumber} value={this.state.employeeNumber} placeholder="Employee Number" required type="number"
                                    name="employee_number" id="employee_number" className="form-control" />
                                <label htmlFor="employee_number">Employee Number</label>
                            </div>
                            <button className="btn btn-primary">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SalesPersonForm;
