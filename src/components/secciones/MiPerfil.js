import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

//Actions
import {saveUpdateUsuario, updateUsuario} from "../../actions/UsuarioActions";

//Boostrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Loader from "../elementos/Loader";

//CSS
import "../../assets/css/MiPerfil.css";

//Images
import blackEye from "../../assets/img/eye.png";
import whiteEye from "../../assets/img/view.png";

//Librerias
import history from "../../history";

class MiPerfil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fueModificado: false,
            imgPassword: blackEye,
            tipo: 'password'
        }

        this.confirmaPass = React.createRef();
    }

    componentDidMount() {
        if (this.props.usuarios.update.activo.nombre_modificado === undefined) {
            var usuario = [];
            usuario['nombre_modificado'] = this.props.usuarios.update.activo.nombre;
            this.props.updateUsuario(usuario);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.usuarios.update.activo.nombre !== this.props.usuarios.update.activo.nombre) {
            var usuario = [];
            usuario['nombre_modificado'] = this.props.usuarios.update.activo.nombre;
            this.props.updateUsuario(usuario);
        }
        if (prevState.imgPassword !== this.state.imgPassword && this.state.imgPassword === blackEye) {
            this.toogleClave(false);
        }
        if (prevState.imgPassword !== this.state.imgPassword && this.state.imgPassword === whiteEye) {
            this.toogleClave(true);
        }
    }

    componentWillUnmount() {
        var cambio                      = {};
        cambio['password']              = "";
        cambio['confirmaPass']          = "";
        cambio['password_confirmation'] = "";
        this.props.updateUsuario(cambio);
    }

    toogleClave(mostrar) {
        this.setState(prevState => ({
            tipo: mostrar ? 'text' : 'password'
        }))
    }

    onChangeUsuario(e) {
        var cambio = {};
        cambio[e.target.id] = e.target.value;
        if (e.target.id === "confirmaPass") {
            cambio["password_confirmation"] = e.target.value;
        }
        this.props.updateUsuario(cambio);
        let error = "";
        if ((e.target.id === "password" && this.props.usuarios.update.activo.confirmaPass !== e.target.value)
            || (e.target.id === "confirmaPass" && this.props.usuarios.update.activo.password !== e.target.value)) {
            error = "Las contraseñas no coinciden";
        }
        this.confirmaPass.current.setCustomValidity(error);
        if (!this.state.fueModificado) {
            this.setState({
                fueModificado: true
            });
        }
    }

    submitForm(e) {
        e.preventDefault();
        if (this.props.usuarios.update.activo.confirmaPass === this.props.usuarios.update.activo.password) {
            this.props.saveUpdateUsuario();
        }
    }

    onClickEye() {
        this.setState(prevState => ({
            imgPassword: prevState.imgPassword === blackEye ? whiteEye : blackEye,
        }));
    }

    render() {
        const usuarioLogueado = this.props.usuarios.update.activo;
        const {fueModificado, verPassword, imgPassword, tipo } = this.state;
        const passwordVacias =
            (usuarioLogueado.password === "" || usuarioLogueado.password === undefined)
            || (usuarioLogueado.password_confirmation === "" || usuarioLogueado.password_confirmation === undefined);
        const ToogleClave = () => {
            return(
                <img onClick={(e) => this.onClickEye()} src={imgPassword} className="ver-password" alt="Mostrar/ocultar contraseña"/>
            );
        };
        return (
            <div className="datos-usuario">
                <Form className="tarjeta-body" onSubmit={(e) => {
                    this.submitForm(e)
                }}>
                    <h4>Mi perfil
                    </h4>
                    <Form.Group>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            id="nombre_modificado"
                            type="nombre"
                            value={usuarioLogueado ? usuarioLogueado.nombre_modificado : ""}
                            onChange={(e) => this.onChangeUsuario(e)}
                            placeholder="Nombre de usuarios"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            id="email"
                            type="email"
                            value={usuarioLogueado ? usuarioLogueado.email : ""}
                            onChange={(e) => this.onChangeUsuario(e)}
                            placeholder="Email"
                            disabled={true}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Contraseña</Form.Label>
                        <div className="contenedor-contrasenia">
                            <input
                                id="password"
                                className="form-control input-clave"
                                type={tipo}
                                onChange={(e) => this.onChangeUsuario(e)}
                                value={usuarioLogueado ? usuarioLogueado.password : ""}
                                required={!passwordVacias}
                                autoComplete={"new-password"}
                                placeholder="Contraseña"
                                minLength="8"
                            />
                            <ToogleClave/>
                        </div>
                        <Form.Text className="text-muted">
                            Si no desea cambiar la contraseña deje los campos de contraseña vacíos.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Contraseña</Form.Label>
                        <div className="contenedor-contrasenia">
                            <input
                                id="confirmaPass"
                                ref={this.confirmaPass}
                                className="form-control input-clave"
                                type={tipo}
                                onChange={(e) => this.onChangeUsuario(e)}
                                value={usuarioLogueado ? usuarioLogueado.confirmaPass : ""}
                                required={!passwordVacias}
                                autoComplete={"new-password"}
                                placeholder="Confirmar Contraseña"
                                minLength="8"
                            />
                            <ToogleClave/>
                        </div>
                    </Form.Group>
                    <Loader display={this.props.usuarios.update.isUpdating}/>
                    <div className="botones" style={{ display: this.props.usuarios.update.isUpdating ? "none" : "flex" }}>
                        <Button
                            className="boton-submit" variant="primary" type="submit"
                            disabled={!fueModificado}>
                            Actualizar datos
                        </Button>
                        <Button
                            onClick={ () => history.push('/perfil')}
                            className="boton-submit" variant="info" type="submit">
                            Volver
                        </Button>
                    </div>
                </Form>
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
        updateUsuario: (usuario) => {
            dispatch(updateUsuario(usuario))
        },
        saveUpdateUsuario: () => {
            dispatch(saveUpdateUsuario())
        },
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MiPerfil));