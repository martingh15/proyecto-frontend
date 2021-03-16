import React from 'react';

//Routes-redux
import history from "../../history";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//Actions
import { logout } from "../../actions/AuthenticationActions";

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
            nombre: ''
        }
    }

    componentDidMount() {
        if (this.props.usuarios.update.activo.nombre) {
            this.setNombreUsuarioLogueado();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.usuarios.update.activo.nombre !== this.props.usuarios.update.activo.nombre
            && (this.state.nombre === "" || this.state.nombre !== this.props.usuarios.update.activo.nombre)) {
            this.setNombreUsuarioLogueado();
        }
    }

    setNombreUsuarioLogueado() {
        let nombre = this.props.usuarios.update ? this.props.usuarios.update.activo.nombre : "";
        this.setState({
            nombre: nombre ? nombre.trim() : ""
        });
    }

    redirectTo(ruta) {
        if (!this.props.authentication.currentlySending && ruta === rutas.LOGOUT) {
            this.props.logout();
            window.location.reload();
        } else if(!this.props.authentication.currentlySending) {
            history.push(ruta);
        }

    }

    render() {
        const { nombre } = this.state;
        const logueado = this.props.authentication.token;
        const ItemMenu = props => {
            let display = props.mostrar ? "" : "no-mostrar";
            let grow    = props.grow ? "hvr-grow" : "";
            let ruta    = props.ruta;
            if (ruta === rutas.LOGOUT) {
                return (
                    <button
                        className={`itemMenu ${display} ${grow}`}
                        onClick={() => this.redirectTo(ruta)}
                    >
                        {props.texto}
                    </button>
                );
            }
            return(
                <a
                    href={ruta}
                    className={`itemMenu ${display} ${grow}`}
                    onClick={() => this.redirectTo(ruta)}
                >
                    {props.texto}
                </a>
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
                    ruta={rutas.REGISTRO}
                />
            </>
        );
        const Logueado = props => (
            <>
                <ItemMenu
                    mostrar={props.mostrar}
                    grow={true}
                    texto={nombre !== "" ? "Hola " + nombre + "!" : ""}
                    ruta={rutas.INICIO}
                />
                <ItemMenu
                    mostrar={props.mostrar}
                    grow={true}
                    texto={"Mi perfil"}
                    ruta={rutas.PERFIL}
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
                        mostrar={true}
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
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navegador));
