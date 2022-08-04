import React from 'react';

class NewCustomerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            address: "",
            phone: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        const customerUrl = 'http://localhost:8090/api/customers/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(customerUrl, fetchConfig);
        if (response.ok) {
            const newCustomer = await response.json();
            const cleared = {
                name: '',
                address: '',
                phone: '',
            }
            this.setState(cleared);
        }
    }

    handleChangeName(event) {
        const value = event.target.value;
        this.setState({ name: value });
    }

    handleChangeAddress(event) {
        const value = event.target.value;
        this.setState({ address: value });
    }

    handleChangePhone(event) {
        const value = event.target.value;
        this.setState({ phone: value });
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Add a new customer:</h1>
                        <form onSubmit={this.handleSubmit} id="create-customer-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChangeName} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                                <label htmlFor="name">Customer Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChangeAddress} value={this.state.address} placeholder="Address" required type="text" name="address" id="address" className="form-control" />
                                <label htmlFor="address">Customer Address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChangePhone} value={this.state.phone} placeholder="Phone" required type="text" name="phone" id="phone" className="form-control" />
                                <label htmlFor="phone">Customer Phone</label>
                            </div>
                            <button className="btn btn-primary">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewCustomerForm;
