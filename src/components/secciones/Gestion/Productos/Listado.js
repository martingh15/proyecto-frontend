import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

//Actions
import {resetProductos, fetchProductosIfNeeded} from "../../../../actions/ProductoActions";

//CSS
import "../../../../assets/css/Listado.css";

//Constants
import c from "../../../../constants/constants";
import * as rutas from "../../../../constants/rutas";

//Componentes
import AddBoxIcon from "@material-ui/icons/AddBox";
import Loader from "../../../elementos/Loader";

//Images
import productoVacio from "../../../../assets/img/emptyImg.jpg";

class Listado extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buscando:       true,
            noHayProductos: false
        }
    }

    componentDidMount() {
        this.props.resetProductos();
        this.props.fetchProductosIfNeeded();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let allIds       = this.props.productos.allIds;
        let productos    = this.props.productos.byId;
        let preProductos = prevProps.productos.byId;
        if (preProductos.isFetching && !productos.isFetching && allIds.length === 0) {
            this.setState({
                noHayProductos: true,
            })
        }
        if (preProductos.isFetching && !productos.isFetching) {
            this.setState({
                buscando: false,
            })
        }
    }

    getOperacionesProducto(producto) {
        return "";
    }

    render() {
        const { noHayProductos, buscando } = this.state;
        let Productos = [];
        if (noHayProductos) {
            Productos =
                <tr className="text-center">
                    <td colSpan="5">No hay productos cargados</td>
                </tr>;
        }
        this.props.productos.allIds.map(idProducto => {
            let producto = this.props.productos.byId.productos[idProducto];
            if (producto && producto.id) {
                let operaciones = this.getOperacionesProducto(producto);
                let path = productoVacio;
                if (producto.imagen) {
                    try {
                        path = c.BASE_PUBLIC + "img/productos/" + producto.imagen;
                    } catch (e) {
                    }
                }
                Productos.push(
                    <tr key={producto.id}>
                        <td className="td-imagen">
                            <img src={path} onError={(e) => e.target.src = productoVacio} alt="Imagen de producto" />
                        </td>
                        <td>{producto.nombre}</td>
                        <td>{producto.categoriaNombre}</td>
                        <td>{producto.precioTexto}</td>
                        <td>{operaciones}</td>
                    </tr>
                );
            }
        });
        const Cargando =
            <tr>
                <td colSpan={5}><Loader display={true}/></td>
            </tr>;
        return (
            <div className="tabla-listado">
                <div className="table-responsive tarjeta-body listado">
                    <div className="d-flex justify-content-between">
                        <h1 className="tabla-listado-titulo">Productos</h1>
                        <a href={rutas.PRODUCTO_ALTA + `?volverA=${rutas.PRODUCTOS_LISTAR_ADMIN}`}
                           data-toggle="tooltip" data-original-title="" title="">
                            <AddBoxIcon style={{ color:  '#5cb860'}}/>
                        </a>
                    </div>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Categoria</th>
                            <th>Precio</th>
                            <th>Operaciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {buscando ? Cargando : Productos}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        productos: state.productos
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetProductos: () => {
            dispatch(resetProductos())
        },
        fetchProductosIfNeeded: () => {
            dispatch(fetchProductosIfNeeded())
        }
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Listado));