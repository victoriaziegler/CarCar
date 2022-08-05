import React from "react";

class ManufacturerList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {manufacturers: []}
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:8100/api/manufacturers/');
        if (response.ok) {
        const data = await response.json();
        this.setState({manufacturers: data.manufacturers});
        }
    }

    render() {
        return (
            <React.Fragment>
                <h2 className="display-5 fw-bold">Manufacturers</h2>
                <table className="table table-dark table-striped border-warning">
                    <thead>
                        <tr>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.manufacturers.map(manufacturer => {
                        return (
                            <tr key={manufacturer.id}>
                                <td>{manufacturer.name}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}
export default ManufacturerList
