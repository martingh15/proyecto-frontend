import React from 'react';

//Routes-redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//Components
import ItemCarrito from "./CarritoItem";

//CSS
import '../../assets/css/Carrito.css';

//Libraries
import isEmpty from "lodash/isEmpty";

//MateriaUI
import Button from '@material-ui/core/Button';
import Producto from "./Producto";

class Carrito extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    getLineasPedidoActivo() {
        const activo = this.props.pedidos.byId.abierto;
        if (isEmpty(activo)) {
            return [];
        }
        let lineas = [];
        activo.lineasIds.map(id => {
            let linea = activo.lineas[id];
            if (linea) {
                let producto = this.props.productos.byId.productos[linea.producto_id];
                linea.producto = producto ? producto : {};
            }
            lineas.push(linea);
        });
        return lineas;
    }

    getLineasCarrito() {
        let lineas  = this.getLineasPedidoActivo();
        let compras = [];
        lineas.forEach(linea => {
            let clave = Math.random();
            compras.push(
                <ItemCarrito
                    key={clave}
                    linea={linea}
                    guardando={this.props.guardando}
                    productoGuardando={this.props.producto}
                    borrarLinea={(idProducto) => this.props.borrarLinea(idProducto)}
                    agregarProducto={(producto, cantidad) => this.props.agregarProducto(producto, cantidad)}
                />
            );
        });
        return compras;
    }

    render() {
        const {mostrar}  = this.props;
        let compras      = this.getLineasCarrito();
        let deshabilitar = compras.length === 0;
        return (
            <nav className="carrito" style={{right: !mostrar ? "-300px" : "0"}}>
                <div className="carrito-botones">
                    <Button variant="outlined" color="secondary" className="finalizar" disabled={deshabilitar}>
                        Finalizar pedido
                    </Button>
                    <Button variant="outlined" color="primary" className="cancelar" disabled={deshabilitar}>
                        Cancelar
                    </Button>
                </div>
                <div className="carrito-compras">
                    {compras}
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return {
        pedidos: state.pedidos,
        productos: state.productos,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Carrito));
