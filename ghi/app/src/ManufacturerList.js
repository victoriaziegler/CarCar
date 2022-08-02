import React from "react";


function ManufacturerList(props) {
    return (
        <React.Fragment>
            <h2 className="display-5 fw-bold">Manufacturers</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                {props.manufacturers.map(manufacturer => {
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

export default ManufacturerList
