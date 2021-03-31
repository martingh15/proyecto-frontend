import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

//Actions
import {resetUsuarios, fetchUsuarios} from "../../../actions/UsuarioActions";

//Constants
import * as rutas from '../../../constants/rutas.js';

//Components
import Loader from "../../elementos/Loader";

//CSS
import "../../../assets/css/Usuarios/Listado.css";

//Icons
import AddBoxIcon from '@material-ui/icons/AddBox';

//Librerias
import Swal from 'sweetalert2';

//Images
import lapiz from "../../../assets/icon/pencil.png";
import tacho from "../../../assets/icon/delete.png";

class Listado extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            noHayUsuarios: false,
            buscando: true
        }
    }

    componentDidMount() {
        this.props.resetUsuarios();
        this.props.fetchUsuarios();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let allIds      = this.props.usuarios.allIds;
        let usuarios    = this.props.usuarios.byId;
        let preUsuarios = prevProps.usuarios.byId;
        if (preUsuarios.isFetching && !usuarios.isFetching && allIds.length === 0) {
            this.setState({
                noHayUsuarios: true,
            })
        }
        if (preUsuarios.isFetching && !usuarios.isFetching) {
            this.setState({
                buscando: false,
            })
        }
    }

    getRolesUsuario(usuario) {
        let roles = [];
        let esAdmin    = usuario.esAdmin;
        if (esAdmin) {
            roles.push('Administrador');
        }
        let esVendedor = usuario.esVendedor;
        if (esVendedor) {
            roles.push('Vendedor');
        }
        let esMozo     = usuario.esMozo;
        if (esMozo) {
            roles.push('Mozo');
        }
        let esComensal     = usuario.esComensal;
        if (esComensal) {
            roles.push('Comensal');
        }
        return roles.join(", ");
    }

    modalBorrar(usuario) {
        Swal.fire({
            title: `Está seguro de borrar el usuario '${usuario.nombre}'`,
            icon: 'warning',
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: true,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: 'rgb(88, 219, 131)',
            cancelButtonColor: '#bfbfbf',
        }).then((result) => {
            if (result.isConfirmed) {
                //Hacer operación borrar usuario

            }
        })
    }

    getOperacionesUsuario(usuario) {
        let id         = usuario.id;
        let rutaEditar = rutas.getUrlUsuario(id, rutas.ACCION_EDITAR, rutas.TIPO_ADMIN, rutas.USUARIOS_LISTAR);
        return (
            <div>
                <a href={rutaEditar} title="Editar "
                   className="operacion">
                    <img src={lapiz} className="icono-operacion" alt="Editar usuario"/>
                    Editar
                </a>
                <p onClick={() => this.modalBorrar(usuario)} title="Borrar"
                   className="operacion">
                    <img src={tacho} className="icono-operacion" alt="Borrar usuario"/>
                    Borrar
                </p>
            </div>
        );
    }

    render() {
        const { noHayUsuarios, buscando } = this.state;
        let Usuarios = [];
        if (noHayUsuarios) {
            Usuarios =
                <tr className="text-center">
                    <td colSpan="5">No hay usuarios cargados</td>
                </tr>;
        }
        this.props.usuarios.allIds.map(idUsuario => {
            let usuario = this.props.usuarios.byId.usuarios[idUsuario];
            if (usuario && usuario.id) {
                let roles       = this.getRolesUsuario(usuario);
                let operaciones = this.getOperacionesUsuario(usuario);
                Usuarios.push(
                    <tr key={usuario.id}>
                        <td>{usuario.nombre}</td>
                        <td>{usuario.email}</td>
                        <td>{usuario.dni}</td>
                        <td>{roles}</td>
                        <td>{operaciones}</td>
                    </tr>
                );
            }
        });
        const Cargando =
        <tr>
            <td></td>
            <td></td>
            <td><Loader display={true}/></td>
            <td></td>
            <td></td>
        </tr>;
        return (
            <div className="tabla-usuarios">
                <div className="table-responsive tarjeta-body listado">
                    <div className="d-flex justify-content-between">
                        <h1 className="tabla-usuarios-titulo">Usuarios</h1>
                        <a href={rutas.USUARIOS_ALTA_ADMIN + `?volverA=${rutas.USUARIOS_LISTAR}`}
                           data-toggle="tooltip" data-original-title="" title="">
                            <AddBoxIcon style={{ color:  '#5cb860'}}/>
                        </a>
                    </div>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Dni</th>
                            <th>Roles</th>
                            <th>Operaciones</th>
                        </tr>
                        </thead>
                        <tbody>
                            {buscando ? Cargando : Usuarios}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        usuarios: state.usuarios
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsuarios: () => {
            dispatch(fetchUsuarios())
        },
        resetUsuarios: () => {
            dispatch(resetUsuarios())
        }
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Listado));