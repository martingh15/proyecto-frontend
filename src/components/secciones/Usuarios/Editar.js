import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

//Actions
import {saveUpdateUsuario, updateUsuario, resetUsuarios, fetchUsuarios, resetUpdateUsuario} from "../../../actions/UsuarioActions";

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
import Swal from "sweetalert2";

class Editar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tipo: 'password',
            imgPassword: blackEye,
            fueModificado: false
        }

        this.confirmaPass = React.createRef();
    }

    componentDidMount() {
        this.props.resetUpdateUsuario();
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
        let id     = this.props.match.params['id'];
        let activo = this.props.usuarios.update.activo;
        if (prevState.imgPassword !== this.state.imgPassword && this.state.imgPassword === blackEye) {
            this.toogleClave(false);
        }
        if (prevState.imgPassword !== this.state.imgPassword && this.state.imgPassword === whiteEye) {
            this.toogleClave(true);
        }
        if (prevProps.usuarios.byId.isFetching && !this.props.usuarios.byId.isFetching && this.props.usuarios.allIds.length > 0) {
            let usuario = this.props.usuarios.byId.usuarios[id];
            if (usuario && usuario.id) {
                this.props.updateUsuario(usuario);
            } else {
                this.redirigirListado();
            }
        }
        let logueado = this.props.usuarios.update.logueado;
        if (id === undefined && activo.id === undefined && logueado && logueado.id) {
            this.props.updateUsuario(logueado);
        }
    }

    componentWillUnmount() {
        var cambio                      = {};
        cambio['password']              = "";
        cambio['confirmaPass']          = "";
        cambio['password_confirmation'] = "";
        this.props.updateUsuario(cambio);
    }

    redirigirListado() {
        Swal.fire({
            title: `No se ha encontrado el usuario a editar`,
            icon: 'warning',
            showCloseButton: true,
            showCancelButton: false,
            focusConfirm: true,
            confirmButtonText: 'Continuar',
            confirmButtonColor: 'rgb(88, 219, 131)',
        }).then(() => {
            history.push(rutas.USUARIOS_LISTAR);
        })
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
        this.setState({
            fueModificado: true
        });
    }

    validarRoles() {
        let usuario    = this.props.usuarios.update.activo;
        let esMozo     = usuario.esMozo;
        let esAdmin    = usuario.esAdmin;
        let esVendedor = usuario.esVendedor;
        let esComensal = usuario.esComensal;
        if (!esMozo && !esAdmin && !esVendedor && !esComensal) {
            this.redirigirListado();
        }
    }

    submitForm(e) {
        e.preventDefault();
        if (this.props.usuarios.update.activo.confirmaPass === this.props.usuarios.update.activo.password) {
            let id           = parseInt(this.props.match.params['id']);
            let editar       = this.props.match.params['accion'] === 'editar';
            let noEsLogueado = id > 0;
            let rolesValidos = this.validarRoles();
            if (rolesValidos) {
                this.props.saveUpdateUsuario(noEsLogueado);
            }
        }
    }

    onClickEye() {
        this.setState(prevState => ({
            imgPassword: prevState.imgPassword === blackEye ? whiteEye : blackEye,
        }));
    }

    getTituloPorRuta() {
        let accion = this.props.match.params['accion'];
        switch (accion) {
            case rutas.ACCION_ALTA:
                return "Crear usuario";
            case rutas.ACCION_EDITAR:
                return "Editar usuario";
        }
        return "Mi perfil";
    }

    onChangeRolUsuario(id) {
        var cambio  = {};
        var valor   = true;
        var usuario = this.props.usuarios.update.activo;
        switch (id) {
            case 'esAdmin':
                if (usuario.esAdmin) {
                    valor = false;
                }
                break;
            case 'esMozo':
                if (usuario.esMozo) {
                    valor = false;
                }
                break;
            case 'esVendedor':
                if (usuario.esVendedor) {
                    valor = false;
                }
                break;
            case 'esComensal':
                if (usuario.esComensal) {
                    valor = false;
                }
                break;
        }
        if (usuario.esAdmin && !usuario.logueado || !usuario.esAdmin) {
            cambio[id] = valor;
        }
        this.props.updateUsuario(cambio);
        this.setState({
            fueModificado: true
        });
    }

    render() {
        const {fueModificado, imgPassword, tipo, volverAValido, botonVolverA } = this.state;
        let id      = parseInt(this.props.match.params['id']);
        let usuario = this.props.usuarios.update.activo;
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
        let esAdmin = usuario && usuario.esAdmin ? usuario.esAdmin : false;
        return (
            <div className="datos-usuario">
                <Form className="tarjeta-body" onSubmit={(e) => {
                    this.submitForm(e)
                }}>
                    <h4>{titulo}</h4>
                    <Form.Group>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            id="nombre"
                            type="nombre"
                            value={usuario && usuario.nombre ? usuario.nombre : ""}
                            onChange={(e) => this.onChangeUsuario(e)}
                            placeholder="Nombre"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            id="email"
                            type="email"
                            value={usuario && usuario.email ? usuario.email : ""}
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
                            value={usuario && usuario.dni ? usuario.dni : ""}
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
                                value={usuario && usuario.password ? usuario.password : ""}
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
                                value={usuario && usuario.confirmaPass ? usuario.confirmaPass : ""}
                                required={!passwordVacias}
                                autoComplete={"new-password"}
                                placeholder="Confirmar Contraseña"
                                minLength="8"
                            />
                            <ToogleClave/>
                        </div>
                    </Form.Group>
                    <Form.Group className="d-flex flex-column">
                        <Form.Label>Roles</Form.Label>
                        <div className="form-check form-check-inline" onClick={() => this.onChangeRolUsuario('esAdmin')}>
                            <input className="form-check-input" type="checkbox" id="esAdmin" disabled={esAdmin && usuario.logueado} checked={esAdmin} onChange={() => {}}/>
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
                        <div className="form-check form-check-inline" onClick={() => this.onChangeRolUsuario('esComensal')}>
                            <input className="form-check-input" type="checkbox" id="esComensal" checked={usuario && usuario.esComensal ? usuario.esComensal : false} onChange={() => {}}/>
                            <label className="form-check-label" htmlFor="inlineCheckbox3">Comensal</label>
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
        usuarios: state.usuarios,
        authentication: state.authentication
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUsuario: (usuario) => {
            dispatch(updateUsuario(usuario))
        },
        saveUpdateUsuario: (noEsLogueado) => {
            dispatch(saveUpdateUsuario(noEsLogueado))
        },
        fetchUsuarios: () => {
            dispatch(fetchUsuarios())
        },
        resetUsuarios: () => {
            dispatch(resetUsuarios())
        },
        resetUpdateUsuario: () => {
            dispatch(resetUpdateUsuario())
        }
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Editar));