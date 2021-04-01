import React from 'react';

//Actions
import { fetchUsuarioLogueadoIfNeeded } from "./actions/UsuarioActions";

//Constants
import * as rutas from './constants/rutas.js';

//Components
import Navegador from "./components/elementos/Navegador";
import Inicio from "./components/secciones/Inicio";
import Login from "./components/secciones/Usuarios/Login";
import Registro from "./components/secciones/Usuarios/Alta";
import Editar from "./components/secciones/Usuarios/Editar";
import CambiarPassword from "./components/secciones/Usuarios/CambiarPassword";
import ValidarEmail from "./components/secciones/Usuarios/ValidarEmail";
import Gestion from "./components/secciones/Gestion";
import ListadoUsuarios from "./components/secciones/Usuarios/Listado";
import ListadoProductos from "./components/secciones/Gestion/Productos/Listado";
import AltaEdicionProducto from "./components/secciones/Gestion/Productos/AltaEdicion";
import NotFound from "./components/secciones/NotFound";

//Redux
import {connect} from 'react-redux';

//Router
import { withRouter } from "react-router-dom";
import { Route, Switch } from "react-router";

function App() {
  return (
      <div className="app">
          <Navegador />
          <div className="contenedor">
              <Switch>
                  <Route exact path={rutas.INICIO} component={Inicio} />
                  <Route exact path={rutas.LOGIN} component={Login} />
                  <Route exact path={rutas.RESET_PASSWORD} component={CambiarPassword} />
                  <Route exact path={rutas.VALIDAR_EMAIL} component={ValidarEmail} />
                  <Route exact path={rutas.GESTION} component={Gestion} />
                  <Route exact path={rutas.USUARIOS_ALTA} component={Registro} />
                  <Route exact path={rutas.USUARIOS_LISTAR} component={ListadoUsuarios} />
                  <Route exact path={rutas.USUARIOS_EDITAR} component={Editar} />
                  <Route exact path={rutas.PRODUCTOS_LISTAR_ADMIN} component={ListadoProductos} />
                  <Route exact path={rutas.PRODUCTO_ALTA} component={AltaEdicionProducto} />
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
