import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

//CSS
import "../../assets/css/Inicio.css";

class Inicio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className="inicio">
                Hola
            </div>
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
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Inicio));