import React from "react";


class AutomobileList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            automobiles: [],
        }
        this.getAutomobiles = this.getAutomobiles.bind(this);
    }


    async getAutomobiles() {
        const autoURL = 'http://localhost:8100/api/automobiles/';
        try {
            const autoResponse = await fetch(autoURL);
            if (autoResponse.ok) {
                const autoData = await autoResponse.json()
                this.setState({
                    automobiles: autoData.autos,
                })
            };
        } catch (e) {
            console.error(e);
        }
    }

    async componentDidMount() {
        this.getAutomobiles();
    }

    render() {
        return (
            <React.Fragment>
                <h2 className="display-5 fw-bold">Automobiles</h2>
                <table className="table table-dark table-striped border-warning">
                    <thead>
                        <tr>
                            <th>VIN</th>
                            <th>Color</th>
                            <th>Year</th>
                            <th>Model</th>
                            <th>Manufacturer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.automobiles.map(automobile => {
                            return (
                                <tr key={automobile.id}>
                                    <td>{automobile.vin}</td>
                                    <td>{automobile.color}</td>
                                    <td>{automobile.year}</td>
                                    <td>{automobile.model.name}</td>
                                    <td>{automobile.model.manufacturer.name}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}

export default AutomobileList