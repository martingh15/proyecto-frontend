import React from 'react';

//Actions
import { fetchUsuarioLogueadoIfNeeded } from "./actions/UsuarioActions";

//Constants
import * as rutas from './constants/rutas.js';

//Components
import Navegador from "./components/elementos/Navegador";
import Inicio from "./components/secciones/Inicio";
import Login from "./components/secciones/Usuarios/Login";
import Registro from "./components/secciones/Usuarios/Registro";
import MiPerfil from "./components/secciones/Usuarios/MiPerfil";
import CambiarPassword from "./components/secciones/Usuarios/CambiarPassword";
import ValidarEmail from "./components/secciones/Usuarios/ValidarEmail";
import Gestion from "./components/secciones/Gestion";
import NotFound from "./components/secciones/NotFound";

//Redux
import {connect} from 'react-redux';

//Router
import { withRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
import Listado from "./components/secciones/Usuarios/Listado";

function App() {
  return (
      <div className="app">
          <Navegador />
          <div className="contenedor">
              <Switch>
                  <Route exact path={rutas.INICIO} component={Inicio} />
                  <Route exact path={rutas.LOGIN} component={Login} />
                  <Route exact path={rutas.REGISTRO_TIPO} component={Registro} />
                  <Route exact path={rutas.MI_PERFIL} component={MiPerfil} />
                  <Route exact path={rutas.RESET_PASSWORD} component={CambiarPassword} />
                  <Route exact path={rutas.VALIDAR_EMAIL} component={ValidarEmail} />
                  <Route exact path={rutas.GESTION} component={Gestion} />
                  <Route exact path={rutas.GESTION_USUARIOS} component={Listado} />
                  <Route exact path="*" component={NotFound} />
              </Switch>
          </div>
      </div>

  );
}

function mapStateToProps(state) {
    return {
        authentication: state.authentication,
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
