import React from 'react';

//Routes-redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//CSS
import '../../assets/css/Carrito.css';

//MateriaUI
import Button from '@material-ui/core/Button';

class Carrito extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {mostrar} = this.props;
        let deshabilitar = true;
        return (
            <nav className="carrito" style={{right: mostrar ? "-300px" : "0"}}>
                <div className="carrito-botones">
                    <Button variant="outlined" color="secondary" className="finalizar" disabled={deshabilitar}>
                        Finalizar pedido
                    </Button>
                    <Button variant="outlined" color="primary" className="cancelar" disabled={deshabilitar}>
                        Cancelar
                    </Button>
                </div>
            </nav>
        );
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Carrito));
