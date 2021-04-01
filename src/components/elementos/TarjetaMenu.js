import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import history from "../../history";

//CSS
import "../../assets/css/TarjetaMenu.css";

class TarjetaMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const props = this.props;
        return (
            <button onClick={() => history.push(props.ruta)} key={props.key} className="tarjeta-menu">
                <div className={"tarjeta hvr-grow"} onClick={props.click}>
                    <span className="text-capitalize rol">{props.rol}</span>
                    <h2>{props.titulo}</h2>
                    <img src={props.img} alt={props.alt} title={props.title} />
                    <p>{props.descripcion}</p>
                </div>
            </button>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TarjetaMenu));