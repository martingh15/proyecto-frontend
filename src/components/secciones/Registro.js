import React from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

//Actions
import {resetPassword} from "../../actions/AuthenticationActions";
import {createUsuario, saveCreateUsuario, resetCreateUsuario} from "../../actions/UsuarioActions";

//Constants
import * as rutas from '../../constants/rutas.js';

//Boostrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

//Components
import Loader from "../elementos/Loader";

//CSS
import '../../assets/css/Registro.css';

//Images
import blackEye from "../../assets/img/eye.png";
import whiteEye from "../../assets/img/view.png";

//Librerias
import history from "../../history";

class Registro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgPassword: blackEye,
            tipo: 'password'
        };

        this.inputConfirmaPasw = React.createRef();
    }

    componentDidMount() {
        if (this.props.authentication.token) {
            history.push(rutas.INICIO);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.imgPassword !== this.state.imgPassword && this.state.imgPassword === blackEye) {
            this.toogleClave(false);
        }
        if (prevState.imgPassword !== this.state.imgPassword && this.state.imgPassword === whiteEye) {
            this.toogleClave(true);
        }
    }

    toogleClave(mostrar) {
        this.setState(prevState => ({
            tipo: mostrar ? 'text' : 'password'
        }))
    }

    onClickEye() {
        this.setState(prevState => ({
            imgPassword: prevState.imgPassword === blackEye ? whiteEye : blackEye,
        }));
    }

    onChangeUsuario(e) {
        var cambio = {};
        var mensaje = "";
        cambio[e.target.id] = e.target.value;
        this.props.createUsuario(cambio);
        if (e.target.id === "password_confirmation") {
            if (this.props.usuarios.create.nuevo.password !== e.target.value) {
                mensaje = "Las contraseñas no coinciden";
            } else {
                mensaje = "";
            }
            this.inputConfirmaPasw.current.setCustomValidity(mensaje);
        }
    }

    submitForm(e) {
        e.preventDefault();
        if (this.props.usuarios.create.nuevo.password_confirmation === this.props.usuarios.create.nuevo.password) {
            this.props.saveCreateUsuario();
        }
    }

    render() {
        const {imgPassword, tipo} = this.state;
        const Ojo = () => {
            return(
                <img onClick={(e) => this.onClickEye()} src={imgPassword} className="ver-password" alt="Mostrar/ocultar contraseña"/>
            );
        };
        return (
            <div className="registro">
                <div className="registro-contenedor">
                    <Form className="tarjeta-body" onSubmit={(e) => {this.submitForm(e)}}>
                        <h4>Registro</h4>
                        <Form.Group>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                id="nombre"
                                type="nombre"
                                onChange={(e) => this.onChangeUsuario(e)}
                                placeholder="Ingresar nombre"
                                required={true}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Correo</Form.Label>
                            <Form.Control
                                id="email"
                                type="email"
                                onChange={(e) => this.onChangeUsuario(e)}
                                placeholder="Ingresar email"
                                required={true}
                            />
                            <Form.Text className="text-muted">
                                No le compartiremos el email a nadie.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Contraseña</Form.Label>
                            <div className="contenedor-contrasenia">
                                <input
                                    id="password"
                                    className="form-control"
                                    type={tipo}
                                    onChange={(e) => this.onChangeUsuario(e)}
                                    placeholder="Contraseña"
                                    minLength="8"
                                    required={true}
                                />
                                <Ojo />
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Confirmar contraseña</Form.Label>
                            <div className="contenedor-contrasenia">
                                <input
                                    id="password_confirmation"
                                    className="form-control"
                                    ref={this.inputConfirmaPasw}
                                    type={tipo}
                                    onChange={(e) => this.onChangeUsuario(e)}
                                    placeholder="Confirma contraseña"
                                    minLength="8"
                                    required={true}
                                />
                                <Ojo />
                            </div>
                        </Form.Group>
                        {
                            this.props.usuarios.create.isCreating ?
                                <Loader display={true}/>
                                :
                                <Button className="boton-submit" variant="primary" type="submit">
                                    Registrarse
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
        usuarios: state.usuarios
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        createUsuario: (usuario) => {
            dispatch(createUsuario(usuario))
        },
        resetCreateUsuario: () => {
            dispatch(resetCreateUsuario())
        },
        saveCreateUsuario: () => {
            dispatch(saveCreateUsuario())
        },
        resetPassword: (usuario) => {
            dispatch(resetPassword(usuario))
        },
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Registro));
