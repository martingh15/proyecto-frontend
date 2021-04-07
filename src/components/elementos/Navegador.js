import React from 'react';

//Routes-redux
import history from "../../history";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//Actions
import { logout } from "../../actions/AuthenticationActions";
import {fetchUsuarioLogueadoIfNeeded} from "../../actions/UsuarioActions";

//Api
import auth from "../../api/authentication";

//Constants
import * as rutas from '../../constants/rutas.js';

//CSS
import '../../assets/css/Navegador.css';

//Images
import logo from "../../assets/img/logo.png";

class Navegador extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            esAdmin: null,
        }
    }

    componentDidMount() {
        window.scroll(0, 0);
        let logueado = this.props.usuarios.update.logueado;
        if (auth.idUsuario() && logueado.id === undefined) {
            this.props.fetchUsuarioLogueadoIfNeeded();
        }
        if (this.props.usuarios.update.logueado.nombre) {
            this.setNombreUsuarioLogueado();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let logueado = this.props.usuarios.update.logueado;
        if (prevProps.usuarios.update.logueado.nombre !== logueado.nombre
            && (this.state.nombre === "" || this.state.nombre !== logueado.nombre)) {
            this.setNombreUsuarioLogueado();
        }
        if (this.state.esAdmin === null && logueado.id) {
            this.setState({
                esAdmin: logueado.esAdmin
            });
        }
    }

    setNombreUsuarioLogueado() {
        let nombre = this.props.usuarios.update ? this.props.usuarios.update.logueado.nombre : "";
        this.setState({
            nombre: nombre ? nombre.trim() : ""
        });
    }

    redirectTo(ruta) {
        if (ruta === "") {
            return;
        }
        if (!this.props.authentication.currentlySending && ruta === rutas.LOGOUT) {
            this.props.logout();
            window.location.reload();
        } else if(!this.props.authentication.currentlySending) {
            history.push(ruta);
        }

    }

    getRutaActiva(ruta) {
        let rutaActual = window.location.pathname;
        let esActual   = rutaActual === ruta;
        let esRutaGestion = this.comprobarEsRutaGestion(ruta, rutaActual);
        return esActual || esRutaGestion;
    }

    comprobarEsRutaGestion(ruta, rutaActual) {
        let esAltaUsuarios     = rutaActual.indexOf(rutas.USUARIOS_ALTA_ADMIN) === 0;
        let esEditarUsuarios   = rutaActual.indexOf(rutas.USUARIOS_EDITAR_ADMIN) === 0;
        let esListadoUsuarios  = rutaActual.indexOf(rutas.USUARIOS_LISTAR) === 0;
        let esListadoProductos = rutaActual.indexOf(rutas.PRODUCTOS_LISTAR_ADMIN) === 0;
        let esAltaProductos    = rutaActual.indexOf(rutas.PRODUCTO_ALTA) === 0;
        return ruta === rutas.GESTION && (esAltaUsuarios || esListadoUsuarios || esEditarUsuarios || esListadoProductos || esAltaProductos);
    }

    render() {
        const { nombre, esAdmin } = this.state;
        const logueado = this.props.authentication.token;
        const ItemMenu = props => {
            let display     = props.mostrar ? "" : "no-mostrar";
            let grow        = props.grow ? "hvr-grow" : "";
            let ruta        = props.ruta;
            let tipo        = props.tipo;
            let activa      = this.getRutaActiva(props.ruta);
            let claseActiva = activa ? "activo" : "";
            return(
                <button
                    className={`itemMenu ${display} ${grow} ${claseActiva}`}
                    onClick={() => this.redirectTo(ruta)}
                    style={{cursor: props.grow ? "pointer" : "unset"}}
                >
                    {props.texto}
                </button>
            )
        };

        const NoLogueado = props => (
            <>
                <ItemMenu
                    mostrar={props.mostrar}
                    grow={true}
                    texto={"Login"}
                    ruta={rutas.LOGIN}
                />
                <ItemMenu
                    mostrar={props.mostrar}
                    grow={false}
                    texto={"Registro"}
                    ruta={rutas.USUARIOS_ALTA_COMUN}
                />
            </>
        );
        const Logueado = props => (
            <>
                <ItemMenu
                    mostrar={props.mostrar}
                    grow={false}
                    texto={nombre !== "" ? "Hola " + nombre + "!" : ""}
                    ruta={""}
                    tipo={"boton"}
                />
                <ItemMenu
                    mostrar={props.mostrar}
                    grow={true}
                    texto={"Mi perfil"}
                    ruta={rutas.USUARIOS_EDITAR_COMUN}
                />
                <ItemMenu
                    mostrar={props.mostrar}
                    grow={true}
                    texto={"Salir"}
                    ruta={rutas.LOGOUT}
                />
            </>
        );
        return (
            <nav className="navegador">
                <div className="izquierda">
                    <img className="logo" src={logo}
                         onClick={() => this.redirectTo(rutas.INICIO)}
                         alt="Logo sistema gestión"
                         title="Logo sistema de gestión gastronómico"
                    />
                    <ItemMenu
                        mostrar={true}
                        grow={true}
                        texto={"Almacén"}
                        ruta={rutas.ALMACEN}
                    />
                    <ItemMenu
                        mostrar={true}
                        grow={true}
                        texto={"Menu"}
                        ruta={rutas.MENU}
                    />
                    <ItemMenu
                        mostrar={esAdmin}
                        grow={true}
                        texto={"Gestión"}
                        admin={true}
                        ruta={rutas.GESTION}
                    />
                </div>
                <div className="derecha">
                    <NoLogueado mostrar={!logueado}/>
                    <Logueado mostrar={logueado}/>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return {
        authentication: state.authentication,
        usuarios: state.usuarios
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(logout())
        },
        fetchUsuarioLogueadoIfNeeded: () => {
            dispatch(fetchUsuarioLogueadoIfNeeded())
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navegador));
