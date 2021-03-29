import React from 'react';
import {withRouter, useLocation} from 'react-router-dom'
import {connect} from 'react-redux';

//Actions
import {resetPassword} from "../../../actions/AuthenticationActions";
import {createUsuario, saveCreateUsuario} from "../../../actions/UsuarioActions";

//Constants
import * as rutas from '../../../constants/rutas.js';
import * as roles from '../../../constants/roles.js';

//Boostrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

//Components
import Loader from "../../elementos/Loader";

//CSS
import '../../../assets/css/Usuarios/Registro.css';

//Images
import blackEye from "../../../assets/img/eye.png";
import whiteEye from "../../../assets/img/view.png";

//Librerias
import history from "../../../history";
import Swal from 'sweetalert2';

class Alta extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgPassword: blackEye,
            tipo: 'password',
            botonVolverA: '',
            volverAValido: false
        };

        this.inputConfirmaPasw = React.createRef();
    }

    componentDidMount() {
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
        let tipoRuta  = this.props.match.params['tipo'];
        let logueado  = this.props.usuarios.update.activo;
        let tipoAdmin = tipoRuta === rutas.REGISTRO_TIPO_ADMIN;
        if ((!tipoAdmin && this.props.authentication.token) || (tipoAdmin && logueado && logueado.id && !logueado.esAdmin) ) {
            history.push(rutas.INICIO);
        }
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
        var cambio          = {};
        var mensaje         = "";
        cambio[e.target.id] = e.target.value;
        let tipoRuta  = this.props.match.params['tipo'];
        let tipoAdmin = tipoRuta === rutas.REGISTRO_TIPO_ADMIN;
        let logueado = this.props.usuarios.create.nuevo;
        if (logueado.tipoRegistro === undefined || logueado.tipoRegistro === "") {
            cambio["tipoRegistro"] = tipoAdmin ? "admin" : "comun";
        }
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

    onChangeRolUsuario(id) {
        var cambio  = {};
        var valor   = true;
        var usuario = this.props.usuarios.create.nuevo;
        switch (id) {
            case 'esAdministrador':
                if (usuario.esAdministrador) {
                    valor = false;
                }
        }
        cambio[id] = valor;
        this.props.createUsuario(cambio);
    }

    showErrores(errores) {
        let texto = "";
        errores.map((e) => {
            texto = texto + `<li style="width: fit-content;text-align: initial;">${e}</li>`;
            return true;
        });
        Swal.fire({
            title: 'Faltan completar campos',
            icon: 'info',
            html:
                `Le ha faltado completar los siguientes campos,` +
                `<ul style="margin-left: 30px;">${texto}</ul>`,
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText: 'Aceptar',
        });
    }

    validarUsuario() {
        let errores = [];
        let usuario = this.props.usuarios.create.nuevo;
        let tipoRuta  = this.props.match.params['tipo'];
        let tipoAdmin = tipoRuta === rutas.REGISTRO_TIPO_ADMIN;
        if (usuario.nombre === undefined || usuario.nombre === "") {
            errores.push("Nombre");
        }
        if (usuario.email === undefined || usuario.email === "") {
            errores.push("Correo");
        }
        if (tipoAdmin && (usuario.dni === undefined || usuario.dni === "")) {
            errores.push("Dni");
        }
        if (errores.length > 0) {
            this.showErrores(errores);
            return false;
        } else {
            return true;
        }
    }

    getQuery(query) {
        const search = new URLSearchParams(window.location.search);
        return search.get(query);
    }

    submitForm(e) {
        e.preventDefault();
        let tipoRuta   = this.props.match.params['tipo'];
        let tipoAdmin  = tipoRuta === rutas.REGISTRO_TIPO_ADMIN;
        let valido     = this.validarUsuario();
        let linkVolver = this.getQuery('volverA');
        if (!tipoAdmin && this.props.usuarios.create.nuevo.password_confirmation === this.props.usuarios.create.nuevo.password) {
            this.props.saveCreateUsuario(false, linkVolver);
        } else if (tipoAdmin && valido) {
            this.props.saveCreateUsuario(true, linkVolver);
        }
    }

    render() {
        const {imgPassword, tipo, botonVolverA, volverAValido} = this.state;
        const tipoRuta  = this.props.match.params['tipo'];
        const usuario   = this.props.usuarios.create.nuevo;
        const tipoAdmin = tipoRuta === rutas.REGISTRO_TIPO_ADMIN;
        const Ojo = () => {
            return(
                <img onClick={(e) => this.onClickEye()} src={imgPassword} className="ver-password" alt="Mostrar/ocultar contraseña"/>
            );
        };
        return (
            <div className="registro">
                <div className="registro-contenedor">
                    <Form className="tarjeta-body" onSubmit={(e) => {this.submitForm(e)}}>
                        <h4>{!tipoAdmin ? "Registro" : "Registrar usuario"}</h4>
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
                        { !tipoAdmin ?
                            <div className="claves">
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
                            </div>
                            :
                            <div className="contenedor-roles">
                                <Form.Group>
                                    <Form.Label>DNI</Form.Label>
                                    <input
                                        id="dni"
                                        className="form-control"
                                        type="number"
                                        onChange={(e) => this.onChangeUsuario(e)}
                                        placeholder="Ingrese DNI"
                                        max="99999999"
                                        required={true}
                                    />
                                    <Form.Text className="text-muted">
                                        Esta será la contraseña del usuario que está creando.
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="d-flex flex-column">
                                    <Form.Label>Roles</Form.Label>
                                    <div className="form-check form-check-inline" onClick={() => this.onChangeRolUsuario('esAdministrador')}>
                                        <input className="form-check-input" type="checkbox" id="esAdministrador" checked={usuario && usuario.esAdministrador ? usuario.esAdministrador : false} onChange={() => {}}/>
                                            <label className="form-check-label" htmlFor="inlineCheckbox1">Administrador</label>
                                    </div>
                                    <div className="form-check form-check-inline" onClick={() => this.onChangeRolUsuario('esMozo')}>
                                        <input className="form-check-input" type="checkbox" id="esMozo" checked={usuario && usuario.esMozo ? usuario.esMozo : false} onChange={() => {}}/>
                                            <label className="form-check-label" htmlFor="inlineCheckbox2">Mozo</label>
                                    </div>
                                    <div className="form-check form-check-inline" onClick={() => this.onChangeRolUsuario('esVendedor')}>
                                        <input className="form-check-input" type="checkbox" id="esVendedor" checked={usuario && usuario.esVendedor ? usuario.esVendedor : false} onChange={() => {}}/>
                                            <label className="form-check-label" htmlFor="inlineCheckbox3">Vendedor</label>
                                    </div>
                                </Form.Group>
                            </div>
                        }
                        {
                            this.props.usuarios.create.isCreating ?
                                <Loader display={true}/>
                                :
                                <div className="d-flex">
                                    <Button className="boton-submit" variant="primary" type="submit">
                                        {!tipoAdmin ? "Registrarse" : "Guardar usuario"}
                                    </Button>
                                    {volverAValido ? botonVolverA : ""}
                                </div>
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
        saveCreateUsuario: (admin, volverA) => {
            dispatch(saveCreateUsuario(admin, volverA))
        },
        resetPassword: (usuario) => {
            dispatch(resetPassword(usuario))
        },
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Alta));
