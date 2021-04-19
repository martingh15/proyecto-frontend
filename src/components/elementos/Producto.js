import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

//Actions
import {createPedido, saveCreatePedido, fetchPedidoById, updatePedido, saveUpdatePedido} from "../../actions/PedidoActions"

//Constants
import c from "../../constants/constants";

//Components
import Loader from "./Loader";

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
            cantidad: null,
            guardando: false
        }
    }

    componentDidMount() {
        if (this.props.pedidos.byId.abierto.id && this.state.cantidad === null) {
            let cantidad = this.getCantidad();
            this.setState({
                cantidad: cantidad
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let cambioActivo = prevProps.pedidos.byId.abierto.id !== this.props.pedidos.byId.abierto.id;
        if (cambioActivo && this.state.cantidad === null) {
            let cantidad = this.getCantidad();
            this.setState({
                cantidad: cantidad
            })
        }
        if (prevProps.pedidos.create.isCreating && !this.props.pedidos.create.isCreating) {
            this.setState({
                guardando: false
            });
        }
    }

    agregarProducto(producto, cantidad) {
        let pedido = this.actualizarPedido(producto, cantidad);
        this.setState({
            guardando: true
        });
        this.props.createPedido(pedido);
        this.props.saveCreatePedido();
    }

    actualizarPedido(producto, cantidad) {
        let pedido        = this.getPedidoActual();
        let linea         = this.getLineaProducto(producto, pedido);
        let nuevas        = pedido.lineas;
        let idLinea       = linea.id > 0 ? linea.id : 0;
        if (idLinea > 0) {
            delete pedido.lineas[idLinea];
        }
        let nuevaCantidad = cantidad + linea.cantidad;
        linea.cantidad    = nuevaCantidad;
        nuevas[idLinea]   = linea;
        pedido.lineas     = nuevas;
        this.setState({
            cantidad: nuevaCantidad
        })
        return pedido;
    }

    getLineaProducto(producto, pedido) {
        let lineas = pedido.lineas;
        let linea = null;
        pedido.lineasIds.map(id => {
            let item = lineas[id];
            if (item !== undefined && item.producto_id === producto.id) {
                linea = item;
            }
        });
        if (linea === null) {
            return {
                id: 0,
                cantidad: 0,
                producto_id: producto.id
            };
        }
        return linea;
    }

    createPedido(pedido, idProducto) {
        let linea = {};
        linea.cantidad = 1;
        linea.producto = idProducto;
        pedido.lineas.push(linea);
        return pedido;
    }

    getPedidoActual() {
        const abierto = this.props.pedidos.byId.abierto;
        if (isNaN(abierto.id)) {
            return {
                id: 0,
                lineas: [],
                lineasIds: []
            };
        }
        return abierto;
    }

    getCantidad() {
        const producto = this.props.producto;
        const abierto  = this.props.pedidos.byId.abierto;
        let cantidad   = 0;
        if (Array.isArray(abierto.lineas) && abierto.lineas.length === 0) {
            return cantidad;
        }
        abierto.lineasIds.map(id => {
            let linea = abierto.lineas[id];
            if (linea !== undefined && linea.producto_id === producto.id) {
                cantidad = linea.cantidad;
            }
        })
        return cantidad;
    }

    render() {
        const props    = this.props;
        let {cantidad, guardando} = this.state;
        const producto = props.producto;
        if (cantidad === null) {
            cantidad = 0;
        }

        let path = productoVacio;
        if (producto.imagen) {
            try {
                path = c.BASE_PUBLIC + "img/productos/" + producto.imagen;
            } catch (e) {
            }
        }
        let gestionCantidad = cantidad === 0 ?
            <Button variant="outlined" color="primary" className="cancelar" onClick={() => this.agregarProducto(producto, 1)}>
                <ShoppingCartIcon className="icono-material hvr-grow"/>Agregar
            </Button>
            :
            <div className="producto-derecha-carrito-cantidad-gestion">
                <button
                    className="mr-2"
                    onClick={() => this.agregarProducto(producto, -1)}>
                    -
                </button>
                <span>{cantidad}</span>
                <button
                    className="ml-2"
                    onClick={() => this.agregarProducto(producto, 1)}>
                    +
                </button>
            </div>;
        console.log(guardando)
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
                            {
                                guardando ? <Loader display={true} /> : gestionCantidad
                            }
                        </div>
                        <p className="producto-derecha-precio font-weight-bold text-right pr-2 m-0 text-nowrap">
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
        createPedido: (pedido) => {
          dispatch(createPedido(pedido))
        },
        saveCreatePedido: (volverA) => {
            dispatch(saveCreatePedido(volverA))
        },
        fetchPedidoById: (pedido) => {
            dispatch(fetchPedidoById(pedido))
        },
        updatePedido: (pedido) => {
            dispatch(updatePedido(pedido))
        },
        saveUpdatePedido: (volverA) => {
            dispatch(saveUpdatePedido(volverA))
        },
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Producto));
