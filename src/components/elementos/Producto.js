import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

//Actions
import {saveCreatePedido, fetchPedidoById} from "../../actions/PedidoActions"

//Constants
import c from "../../constants/constants";

//CSS
import "../../assets/css/Producto.css";

//Images
import productoVacio from "../../assets/img/emptyImg.jpg";

//MateriaUI
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

class Producto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pedido: null
        }
    }

    agregarProducto(producto, cantidad) {
        let pedido = this.getPedidoActual();
        if (!Array.isArray(pedido.lineas)) {
            pedido.lineas = [];
        }
        let linea = {};
        linea.cantidad = cantidad;
        linea.producto = producto.id;
        pedido.lineas.push(linea);
        this.props.saveCreatePedido(pedido);
    }

    getPedidoActual() {
        let abierto = this.props.pedidos.byId.abierto;
        if (!abierto.id) {
            return {
                id: null,
                lineas: []
            };
        }
        return abierto;
    }

    render() {
        const props    = this.props;
        const producto = props.producto;

        let path = productoVacio;
        if (producto.imagen) {
            try {
                path = c.BASE_PUBLIC + "img/productos/" + producto.imagen;
            } catch (e) {
            }
        }
        return (
            <article key={producto.id} className="producto">
                <div className="producto-izquierda">
                    <img src={path} onError={(e) => e.target.src = productoVacio} alt="Imagen de producto" />
                </div>
                <div className="producto-derecha">
                    <div className="producto-derecha-titulos">
                        <h2>{producto.nombre}</h2>
                        <h3>{producto.descripcion}</h3>
                    </div>
                    <div className="producto-derecha-carrito">
                        <div className="producto-derecha-carrito-cantidad">
                            <Button variant="outlined" color="primary" className="cancelar" onClick={() => this.agregarProducto(producto)}>
                                <ShoppingCartIcon className="icono-material hvr-grow"/>Agregar
                            </Button>
                        </div>
                        <p className="producto-derecha-precio font-weight-bold text-right pr-2 m-0">
                            $ {producto.precioVigente}
                        </p>
                    </div>
                </div>
            </article>
        )
    }
}

function mapStateToProps(state) {
    return {
        pedidos: state.pedidos
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveCreatePedido: (pedido) => {
            dispatch(saveCreatePedido(pedido))
        },
        fetchPedidoById: (pedido) => {
            dispatch(fetchPedidoById(pedido))
        }
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Producto));
