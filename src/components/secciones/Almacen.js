import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

//Actions
import { fetchProductosIfNeeded } from "../../actions/ProductoActions";

//Components
import Producto from "../elementos/Producto";

//CSS
import "../../assets/css/Almacen.css";

class Almacen extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchProductosIfNeeded();
    }

    render() {
        let productos = this.props.productos.allIds.map(id => {
            let producto = this.props.productos.byId.productos[id];
            if (producto !== undefined) {
                return (<Producto producto={producto}/>);
            }
        });
        return (
            <div className="almacen">
                <div className="tarjeta-body">
                    <h1>Almacén</h1>
                    <div className="almacen-productos">
                        {productos}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        productos: state.productos,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProductosIfNeeded: () => {
            dispatch(fetchProductosIfNeeded())
        },
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Almacen));