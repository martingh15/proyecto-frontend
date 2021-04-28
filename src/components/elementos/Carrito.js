import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//Api
import auth from "../../api/authentication";

//Actions
import { saveFinalizarPedido } from "../../actions/PedidoActions";

//Components
import ItemCarrito from "./CarritoItem";

//CSS
import '../../assets/css/Carrito.css';

//Libraries
import isEmpty from "lodash/isEmpty";
import Swal from "sweetalert2";
import Button from '@material-ui/core/Button';

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
                    borrando={this.props.borrando}
                    productoGuardando={this.props.producto}
                    borrarLinea={(idProducto) => this.props.borrarLinea(idProducto)}
                    agregarProducto={(producto, cantidad) => this.props.agregarProducto(producto, cantidad)}
                />
            );
        });
        return compras;
    }

    finalizarPedido(sinLineas) {
        if (sinLineas) {
            return;
        }
        const abierto = this.props.pedidos.byId.abierto;
        const valido  = abierto.id > 0 && auth.idUsuario();
        if (!valido) {
            return;
        }
        Swal.fire({
            title: `¿Está seguro de cerrar el pedido? `,
            icon: 'question',
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: true,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: 'rgb(88, 219, 131)',
            cancelButtonColor: '#bfbfbf',
        }).then((result) => {
            if (result.isConfirmed) {
                this.props.saveFinalizarPedido(abierto.id);
            }
        });

    }

    render() {
        const {mostrar, blur}  = this.props;
        let claseBlur    = blur ? "forzar-blur" : "";
        let compras      = this.getLineasCarrito();
        let deshabilitar = compras.length === 0;
        let total        = 0;
        let pedido       = this.props.pedidos.byId.abierto;
        if (pedido.id) {
            total = pedido.total;
        }
        return (
            <nav className={`carrito ${claseBlur}`} style={{right: !mostrar ? "-300px" : "0"}}>
                <div className="carrito-botones">
                    <Button variant="outlined" color="secondary" className="finalizar" disabled={deshabilitar} onClick={() => this.finalizarPedido(deshabilitar)}>
                        Finalizar pedido
                    </Button>
                    <Button variant="outlined" color="primary" className="cancelar" disabled={deshabilitar} onClick={() => this.props.cancelarPedido(deshabilitar)}>
                        Cancelar
                    </Button>
                </div>
                <div className="carrito-compras">
                    {compras}
                    <span style={{display: total > 0 ? "block" : "none"}} className="text-right font-weight-bold">Subtotal: $ {total}</span>
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
        saveFinalizarPedido: (id) => {
            dispatch(saveFinalizarPedido(id))
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Carrito));
