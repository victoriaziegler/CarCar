import React from "react";

class SalesPersonHistory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sales: [],
            salesPeople: [],
        }
        this.handleSalesPersonChange = this.handleSalesPersonChange.bind(this);
    }

    handleSalesPersonChange(event) {
        const value = event.target.value;
        this.setState({salesPerson: value})
    }


    async componentDidMount() {
        const salesPersonResponse = await fetch('http://localhost:8090/api/sales_people/');
        const salesResponse = await fetch('http://localhost:8090/api/sales/');
        try {
            if (salesPersonResponse.ok && salesResponse.ok) {
                const salesPersonData = await salesPersonResponse.json();
                const salesData = await salesResponse.json()
                console.log("SALES PERSON", salesPersonData);
                console.log("SALES", salesData)
                this.setState({
                    'salesPeople': salesPersonData.sales_people,
                    'sales': salesData.sales,
                });
            };
        } catch (e) {
            console.error(e);
        }
    }

    render() {
        return (
            <React.Fragment>
                <h2 className="display-5 fw-bold">Sales Person History</h2>
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
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Sales Person</th>
                            <th>Employee Number</th>
                            <th>Purchaser</th>
                            <th>VIN</th>
                            <th>Sale Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.sales.map(sale => {
                            return (
                                <tr key={sale.id}>
                                    <td>{sale.sales_person.name}</td>
                                    <td>{sale.sales_person.employee_number}</td>
                                    <td>{sale.customer.name}</td>
                                    <td>{sale.automobile.vin}</td>
                                    <td>${sale.price}</td>
                                </tr>
                            );
                        })}
                    {/* {this.state.sales.filter(sale => sale.salesPerson.id.toString()===this.state.salesPerson).map(sale => {
                        return (
                            <tr key={sale.id}>
                                <td>{sale.sales_person.name}</td>
                                <td>{sale.sales_person.employee_number}</td>
                                <td>{sale.customer.name}</td>
                                <td>{sale.automobile.vin}</td>
                                <td>${sale.price}</td>
                            </tr>
                        );
                    })} */}
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}
export default SalesPersonHistory
