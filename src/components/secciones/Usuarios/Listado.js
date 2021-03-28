import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

//Actions
import {resetUsuarios, fetchUsuarios} from "../../../actions/UsuarioActions";

//Boostrap
import Loader from "../../elementos/Loader";

//CSS
import "../../../assets/css/Usuarios/Listado.css";

//Librerias
import history from "../../../history";

class Listado extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        this.props.resetUsuarios();
        this.props.fetchUsuarios();
    }

    getRolesUsuario(usuario) {
        let roles = "";
        usuario.roles.map(rol => {
            let nombreRol = rol.nombre;
            let rolUpper = nombreRol.charAt(0).toUpperCase() + nombreRol.slice(1);
            roles += rolUpper;
            if (roles !== "") {
                roles += ", ";
            }
        });
        roles = roles.slice(0, -2);
        return roles;
    }

    render() {
        const Usuarios = [];
        this.props.usuarios.allIds.map(idUsuario => {
            let usuario = this.props.usuarios.byId.usuarios[idUsuario];
            if (usuario && usuario.id) {
                let roles = this.getRolesUsuario(usuario);
                Usuarios.push(
                    <tr key={usuario.id}>
                        <td>{usuario.nombre}</td>
                        <td>{usuario.email}</td>
                        <td>{usuario.dni}</td>
                        <td>{roles}</td>
                    </tr>
                );
            }
        });
        return (
            <div className="tabla-usuarios">
                <div className="table-responsive tarjeta-body"
                     style={{display: Usuarios.length > 0 ? "block" : "none"}}>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Dni</th>
                            <th>Roles</th>
                        </tr>
                        </thead>
                        <tbody>
                            {Usuarios}
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