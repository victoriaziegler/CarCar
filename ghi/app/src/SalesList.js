import React from "react";

class SalesList extends React.Component {
    constructor(props) {
        super(props)
        this.state = { sales: [] }
    }

    async componentDidMount() {
        const salesResponse = await fetch(`http://localhost:8090/api/sales/`);
        if (salesResponse.ok) {
            const salesData = await salesResponse.json();
            this.setState({ sales: salesData.sales });
        }
    }

    render() {
        return (
            <React.Fragment>
                <h2 className="display-5 fw-bold">All Sales</h2>
                <table className="table table-dark table-striped border-warning">
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
