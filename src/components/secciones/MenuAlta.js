import React from 'react';

import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import {createMenu, saveCreateMenu} from "./../../actions/MenuActions"

import "../../assets/css/MenuAlta.css";

//Boostrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Loader from "../elementos/Loader";

class MenuAlta extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {
       
    }

    onChangeMenu(e) {
        var cambio = {};
        cambio[e.target.id] = e.target.value;
        this.props.createMenu(cambio);
    }

    submitForm(e) {
        e.preventDefault();
        this.props.saveCreateMenu();
    }

    render() {
        var menu = this.props.menu.create.nuevo;
        return (
            <div className="alta-menu">
                <div className="alta-menu-contenedor">                        
                    <Form className="tarjeta-body" onSubmit={(e) => {this.submitForm(e)}}>
                        <h1>Alta de menu</h1>
                        <Form.Group>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                id="nombre"
                                type="text"
                                value={menu ? menu.nombre : ""}
                                onChange={(e) => this.onChangeMenu(e)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                id="precio"
                                type="number"
                                min={0}
                                value={menu ? menu.precio : ""}
                                onChange={(e) => this.onChangeMenu(e)}
                            />
                        </Form.Group>
                        {
                            this.props.authentication.currentlySending ?
                                <Loader display={true} />
                                :
                                <Button className="boton-submit" variant="primary" type="submit">
                                    Guardar
                                </Button>
                        }
                    </Form>
                </div>                              
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        authentication: state.authentication,
        menu: state.menu
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        createMenu: (menu) => {
            dispatch(createMenu(menu))
        },
        saveCreateMenu: () => {
            dispatch(saveCreateMenu())
        },
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuAlta));
