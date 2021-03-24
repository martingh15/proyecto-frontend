import React from 'react';

//Actions
import { fetchUsuarioLogueadoIfNeeded } from "./actions/UsuarioActions";

//Constants
import * as rutas from './constants/rutas.js';

//Components
import Navegador from "./components/elementos/Navegador";
import Inicio from "./components/secciones/Inicio";
import Login from "./components/secciones/Login";
import Registro from "./components/secciones/Registro";
import MiPerfil from "./components/secciones/MiPerfil";
import CambiarPassword from "./components/secciones/CambiarPassword";
import ValidarEmail from "./components/secciones/ValidarEmail";
import NotFound from "./components/secciones/NotFound";
import BarraLateral from "./components/elementos/BarraLateral";

//Redux
import {connect} from 'react-redux';

//Router
import { withRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
import auth from "./api/authentication";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            esAdmin: null,
        }
    }

    componentDidMount() {
        window.scroll(0, 0);
        if (auth.idUsuario()) {
            this.props.fetchUsuarioLogueadoIfNeeded();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let logueado = this.props.usuarios.update.activo;
        if (this.state.esAdmin === null && logueado.id) {
            this.setState({
                esAdmin: logueado.esAdmin
            });
        }
    }

    render() {
        const esAdmin = this.state.esAdmin
        return (
              <div className="app d-flex">
                  {esAdmin ? <BarraLateral /> : <div></div> }
                  <div className="w-100">
                      <Navegador esAdmin={esAdmin} />
                      <div className="contenedor">
                          <Switch>
                              <Route exact path={rutas.INICIO} component={Inicio} />
                              <Route exact path={rutas.LOGIN} component={Login} />
                              <Route exact path={rutas.REGISTRO} component={Registro} />
                              <Route exact path={rutas.MI_PERFIL} component={MiPerfil} />
                              <Route exact path={rutas.RESET_PASSWORD} component={CambiarPassword} />
                              <Route exact path={rutas.VALIDAR_EMAIL} component={ValidarEmail} />
                              <Route exact path="*" component={NotFound} />
                          </Switch>
                      </div>
                  </div>
              </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        authentication: state.authentication,
        usuarios: state.usuarios,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsuarioLogueadoIfNeeded: () => {
            dispatch(fetchUsuarioLogueadoIfNeeded())
        },
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
