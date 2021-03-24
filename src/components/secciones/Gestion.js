import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

//Constants
import * as rutas from '../../constants/rutas.js';

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
            case rutas.USUARIOS:
                return imgUsuarios;
        }
    }

    render() {
        const logueado    = this.props.usuarios.update.activo;
        const operaciones = logueado && logueado.id ? logueado.operaciones : [];
        const Operaciones = operaciones.map((operacion) => {
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
                />
            );
        });
        return (
            <div className="gestion">
                {Operaciones}
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
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Gestion));