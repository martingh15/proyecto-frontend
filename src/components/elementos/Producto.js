import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

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
        this.state = {}
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
                            <Button variant="outlined" color="primary" className="cancelar" >
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
    };
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Producto));