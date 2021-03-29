import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

//Actions
import {saveUpdateUsuario, updateUsuario, resetUsuarios, fetchUsuarios} from "../../../actions/UsuarioActions";

//Boostrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

//Constants
import * as rutas from '../../../constants/rutas.js';

//Components
import Loader from "../../elementos/Loader";

//CSS
import "../../../assets/css/Usuarios/Editar.css";

//Images
import blackEye from "../../../assets/img/eye.png";
import whiteEye from "../../../assets/img/view.png";

//Librerias
import history from "../../../history";
import clone from 'lodash/clone';

class Editar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fueModificado: false,
            imgPassword: blackEye,
            tipo: 'password',
            usuario: {},
        }

        this.confirmaPass = React.createRef();
    }

    componentDidMount() {
        if (this.props.usuarios.update.activo.nombre_modificado === undefined) {
            var usuario = [];
            usuario['nombre_modificado'] = this.props.usuarios.update.activo.nombre;
            this.props.updateUsuario(usuario);
        }
        let id = parseInt(this.props.match.params['id']);
        if (id > 0) {
            this.props.resetUsuarios();
            this.props.fetchUsuarios();
        }
        const volverA    = this.getQuery('volverA');
        const valido     = rutas.validarRuta(volverA);
        let botonVolverA = "";
        if (valido) {
            botonVolverA =
                <button className="boton-submit btn btn-light" onClick={() => history.push(volverA)} title="Volver">
                    Volver
                </button>;
        }
        this.setState({ botonVolverA: botonVolverA, volverAValido: valido });
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
        if (prevProps.usuarios.byId.isFetching && !this.props.usuarios.byId.isFetching && this.props.usuarios.allIds.length > 0) {
            let id      = this.props.match.params['id'];
            let usuario = this.props.usuarios.byId.usuarios[id];
            if (usuario !== undefined) {
                this.setState({
                    usuario: usuario,
                });
            }
        }
    }

    componentWillUnmount() {
        var cambio                      = {};
        cambio['password']              = "";
        cambio['confirmaPass']          = "";
        cambio['password_confirmation'] = "";
        this.props.updateUsuario(cambio);
    }

    getQuery(query) {
        const search = new URLSearchParams(window.location.search);
        return search.get(query);
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

    getTituloPorRuta() {
        let actual = this.props.location.pathname;
        switch (actual) {
            case rutas.GESTION_USUARIOS:
                return "Editar usuario";
            case rutas.MI_PERFIL:
                return "Mi perfil";
        }
        return "Editar usuario";
    }

    getUsuarioEditar(usuario) {
        usuario.password          = '';
        usuario.confirmaPass      = '';
        usuario.nombre_modificado = usuario.nombre;
        return usuario;
    }

    render() {
        const {fueModificado, imgPassword, tipo, volverAValido, botonVolverA } = this.state;
        let id      = parseInt(this.props.match.params['id']);
        let usuario = this.props.usuarios.update.activo;
        if (id > 0) {
            usuario = this.getUsuarioEditar(this.state.usuario);
        }
        let passwordVacias = true;
        if (usuario) {
            passwordVacias =
                (usuario.password === "" || usuario.password === undefined)
                || (usuario.password_confirmation === "" || usuario.password_confirmation === undefined);
        }

        const ToogleClave = () => {
            return(
                <img onClick={(e) => this.onClickEye()} src={imgPassword} className="ver-password" alt="Mostrar/ocultar contraseña"/>
            );
        };
        let titulo = this.getTituloPorRuta();
        return (
            <div className="datos-usuario">
                <Form className="tarjeta-body" onSubmit={(e) => {
                    this.submitForm(e)
                }}>
                    <h4>{titulo}</h4>
                    <Form.Group>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            id="nombre_modificado"
                            type="nombre"
                            value={usuario ? usuario.nombre_modificado : ""}
                            onChange={(e) => this.onChangeUsuario(e)}
                            placeholder="Nombre"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            id="email"
                            type="email"
                            value={usuario ? usuario.email : ""}
                            onChange={(e) => this.onChangeUsuario(e)}
                            placeholder="Email"
                            disabled={true}
                        />
                    </Form.Group>
                    <Form.Group style={{display: id > 0 ? "block" : "none"}}>
                        <Form.Label>DNI</Form.Label>
                        <Form.Control
                            id="dni"
                            type="dni"
                            value={usuario ? usuario.dni : ""}
                            onChange={(e) => this.onChangeUsuario(e)}
                            placeholder="Dni"
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
                                value={usuario ? usuario.password : ""}
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
                                value={usuario ? usuario.confirmaPass : ""}
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
                        {volverAValido ? botonVolverA : ""}
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
        fetchUsuarios: () => {
            dispatch(fetchUsuarios())
        },
        resetUsuarios: () => {
            dispatch(resetUsuarios())
        }
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Editar));