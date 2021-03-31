import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

//Constants
import * as rutas from '../../constants/rutas.js';
import * as roles from '../../constants/roles.js';

//Components
import Loader from "../elementos/Loader";

//CSS
import "../../assets/css/Gestion.css";

//Elementos
import TarjetaMenu from "../elementos/TarjetaMenu";

//Imagenes
import imgUsuarios from "../../assets/img/menu/gestion-usuario.svg";
import imgCompras from "../../assets/img/menu/compras.svg";

class Gestion extends React.Component {
    constructor(props) {
        super(props);
    }

    getImagenPorRuta(ruta) {
        switch (ruta) {
            case rutas.COMPRAS:
                return imgCompras;
            case rutas.USUARIOS_LISTAR:
                return imgUsuarios;
        }
    }

    getOperacion(operacion, rol) {
        let usuario      = this.props.usuarios.update.logueado;
        let rolesUsuario = usuario && usuario.rolesArray ? usuario.rolesArray : [];
        let tieneRol     = rolesUsuario.includes(rol);
        if (!tieneRol) {
            return;
        }
        let alt         = operacion && operacion.alt ? operacion.alt : "";
        let key         = Math.floor(Math.random() * 100);
        let ruta        = operacion && operacion.ruta ? operacion.ruta : "";
        let titulo      = operacion && operacion.titulo ? operacion.titulo : "";
        let descripcion = operacion && operacion.descripcion ? operacion.descripcion : "";
        if (ruta !== "") {
            let rutaValida = rutas.validarRuta(ruta);
            ruta = rutaValida ? ruta : "#";
        }
        let imagen = this.getImagenPorRuta(ruta);
        return(
            <TarjetaMenu
                key={key}
                titulo={titulo}
                descripcion={descripcion}
                alt={alt}
                title={titulo}
                ruta={ruta}
                img={imagen}
                rol={rol}
            />
        );
    }

    getOperaciones(rol) {
        const logueado         = this.props.usuarios.update.logueado;
        const operaciones      = logueado && logueado.id ? logueado.operaciones : [];
        let   operacionesAdmin = [];
        operaciones.map((operacion) => {
            let existe = this.getOperacion(operacion, rol);
            if (existe) {
                operacionesAdmin.push(existe);
            }
        });
        let renderOperacionesAdmin =  (
            <div className="contenedor-operaciones">
                <div className="operaciones">
                    {operacionesAdmin}
                </div>
            </div>
        );
        if (operaciones.length === 0) {
            renderOperacionesAdmin = (<div></div>);
        }
        return renderOperacionesAdmin;
    }

    render() {
        let operacionesAdmin = this.getOperaciones(roles.ROL_ADMIN);
        let buscando = this.props.usuarios.update.isFetchingUsuarioLogueado;
        return (
            <div className="gestion">
                {buscando ?
                        <div className="tarjeta-body">
                            <span className="mb-5">Buscando operaciones de gestión...</span>
                            <Loader display={buscando} />
                        </div>
                    :
                        operacionesAdmin}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        usuarios: state.usuarios,
        roles: state.roles,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Gestion));