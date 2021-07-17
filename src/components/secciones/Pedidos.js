import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
//Actions
import { fetchPedidos, resetPedidos } from "../../actions/PedidoActions";
//Api
import auth from "../../api/authentication";
//CSS
import "../../assets/css/Pedidos.css";
//Constants
import * as rutas from '../../constants/rutas.js';
//Components
import Loader from "../elementos/Loader";
import Titulo from "../elementos/Titulo";






class Pedidos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buscando: true,
            noHayPedidos: false
        }
    }

    componentDidMount() {
        let idUsuario = auth.idUsuario();
        this.props.resetPedidos();
        this.props.fetchPedidos(idUsuario);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let allIds = this.props.pedidos.allIds;
        let pedidos = this.props.pedidos.byId;
        let prePedidos = prevProps.pedidos.byId;
        let deleting = this.props.pedidos.delete;
        let preDeleting = prevProps.pedidos.delete;
        let busco = prePedidos.isFetching && !pedidos.isFetching;
        let borro = preDeleting.isDeleting && !deleting.isDeleting;
        if ((busco || borro) && allIds.length === 0) {
            this.setState({
                noHayPedidos: true,
            })
        }
        if (prePedidos.isFetching && !pedidos.isFetching) {
            this.setState({
                buscando: false,
            })
        }
    }

    render() {
        const { noHayPedidos, buscando } = this.state;
        let Pedidos = [];
        if (noHayPedidos) {
            Pedidos =
                <tr className="text-center">
                    <td colSpan="4">No hay pedidos cargados</td>
                </tr>;
        }
        this.props.pedidos.allIds.map(idPedido => {
            let pedido = this.props.pedidos.byId.pedidos[idPedido];
            if (pedido && pedido.id) {
                Pedidos.push(
                    <tr key={pedido.id}>
                        <td>{pedido.fecha_texto}</td>
                        <td>{pedido.estado_texto}</td>
                        <td>{pedido.total_texto}</td>
                        <td></td>
                    </tr>
                );
            }
        });
        const Cargando =
            <tr>
                <td></td>
                <td colspan="2"><Loader display={true} /></td>
                <td></td>
            </tr>;
        return (
            <div className="tabla-listado">
                <div className="table-responsive tarjeta-body listado">
                    <div className="d-flex justify-content-between">
                        <Titulo ruta={rutas.ALMACEN} titulo={"Pedidos"} clase="tabla-listado-titulo" />
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Estado</th>
                                <th>Total</th>
                                <th>Operaciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {buscando ? Cargando : Pedidos}
                        </tbody>
                    </table>
                </div>
            </div>
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
        fetchPedidos: (idUsuario) => {
            dispatch(fetchPedidos(idUsuario))
        },
        resetPedidos: () => {
            dispatch(resetPedidos())
        },
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Pedidos));