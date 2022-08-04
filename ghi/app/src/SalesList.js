import React from "react";

class SalesList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {sales: []}
    }

    async componentDidMount() {
        const salesResponse = await fetch(`http://localhost:8090/api/sales_person_record/1/`);
        if (salesResponse.ok) {
        const salesData = await salesResponse.json();
        console.log(salesData);
        this.setState({sales: salesData.sales});
        }
    }

    render() {
        return (
            <React.Fragment>
                <h2 className="display-5 fw-bold">All Sales</h2>
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
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}
export default SalesList
