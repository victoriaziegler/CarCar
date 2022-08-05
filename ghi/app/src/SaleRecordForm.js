import React from 'react';

class SaleRecordForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            automobiles: [],
            salesPeople: [],
            customers: [],
            price: '',
        };
        this.handleAutomobileChange = this.handleAutomobileChange.bind(this);
        this.handleSalesPersonChange = this.handleSalesPersonChange.bind(this);
        this.handleCustomerChange = this.handleCustomerChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleAutomobileChange(event) {
        const value = event.target.value;
        this.setState({automobile: value})
    }

    handleSalesPersonChange(event) {
        const value = event.target.value;
        this.setState({salesPerson: value})
    }

    handleCustomerChange(event) {
        const value = event.target.value;
        this.setState({customer: value})
    }

    handlePriceChange(event) {
        const value = event.target.value;
        this.setState({price: value})
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        data.sales_person = data.salesPerson;
        delete data.customers;
        delete data.salesPeople;
        delete data.salesPerson;
        delete data.automobiles;

        const salesUrl = 'http://localhost:8090/api/sales/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'applications/json',
            },
        };
        const response = await fetch(salesUrl, fetchConfig);


        let autoUrl = `http://localhost:8100/api/automobiles/${data.automobile}/`
        let config = {
            method: "put",
            body: JSON.stringify({is_sold: true}),
            headers: {
                'Content-Type': 'applications/json',
            },
        };
        let autoResponse = await fetch(autoUrl, config);


        if (autoResponse.ok && response.ok) {
            const newSale = await response.json();

            const cleared = {
                automobile: '',
                salesPerson: '',
                customer: '',
                price: '',             
            };
            this.setState(cleared);
        }
    }

    async componentDidMount() {
        const autoresponse = await fetch('http://localhost:8100/api/automobiles/');
    
        if(autoresponse.ok) {
            const autodata = await autoresponse.json();

            let filteredAutos = {}
            let filtered = []
            for (let autos in autodata) {
                for (let i = 0; i < (autodata[autos]).length; i++) {
                    if (autodata[autos][i]["is_sold"] === false) {
                        filtered.push(autodata[autos][i])
                    }
                }
            filteredAutos[autos] = filtered
            this.setState({'automobiles': filteredAutos.autos})
        }
    }

        const salesPersonResponse = await fetch('http://localhost:8090/api/sales_people/');

        if(salesPersonResponse.ok) {
            const salesPersonData = await salesPersonResponse.json();
            this.setState({'salesPeople': salesPersonData.sales_people})
        }

        const customerResponse = await fetch('http://localhost:8090/api/customers/')

        if(customerResponse.ok) {
            const customerData = await customerResponse.json();
            this.setState({'customers': customerData.customers})
        }
    }

    render () {
        return (
            <div className="my-5 container">
                <div className="row">
                    <div className="offset-3 col-6">
                        <div className="shadow p-4 mt-4">
                            <h1>Create a new sale record</h1>
                            <form onSubmit={this.handleSubmit} id="create-sale-record-form">
                            <div className="mb-3">
                                    <select onChange={this.handleAutomobileChange} value={this.state.automobile} required name="automobile" id="automobile" className="form-select">
                                        <option value="">Choose an automobile</option>
                                        {this.state.automobiles.map(automobile => {
                                            return (
                                                <option key={automobile.vin} value={automobile.vin}>
                                                    {automobile.vin}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <select onChange={this.handleSalesPersonChange} value={this.state.salesPerson} required name="sales_person" id="sales_person" className="form-select">
                                        <option value="">Choose a sales person</option>
                                        {this.state.salesPeople.map(salesPerson => {
                                            return (
                                                <option key={salesPerson.id} value={salesPerson.id}>
                                                    {salesPerson.name}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <select onChange={this.handleCustomerChange} value={this.state.customer} required name="customer" id="customer" className="form-select">
                                        <option value="">Choose a customer</option>
                                        {this.state.customers.map(customer => {
                                            return (
                                                <option key={customer.id} value={customer.id}>
                                                    {customer.name}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={this.handlePriceChange} value={this.state.price} placeholder="Price" required type="number" name="price"
                                        id="price" className="form-control"/>
                                    <label htmlFor="price">Price</label>
                                </div>
                                <button className="btn btn-primary">Create</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SaleRecordForm;