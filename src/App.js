import React from 'react';

//Actions
import { fetchUsuarioLogueadoIfNeeded } from "./actions/UsuarioActions";
import { fetchProductosIfNeeded } from "./actions/ProductoActions";
import { fetchPedidoAbiertoIfNeeded } from "./actions/PedidoActions";

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
import Carrito from "./components/elementos/Carrito";
import Almacen from "./components/secciones/Almacen";
import NotFound from "./components/secciones/NotFound";

//Redux
import {connect} from 'react-redux';

//Router
import { withRouter } from "react-router-dom";
import { Route, Switch } from "react-router";

//Lodash
import isEmpty from "lodash/isEmpty";

class App extends React.Component {
   constructor(props) {
       super(props);
       this.state = {
           mostrar: false
       };
   }

   componentDidMount() {
       this.props.fetchProductosIfNeeded();
       this.props.fetchPedidoAbiertoIfNeeded();
   }

    changeMostrar() {
       this.setState(prevState => ({
           mostrar: !prevState.mostrar,
       }));
   }

    getCantidad(producto) {
        if (isEmpty(producto)) {
            return 0;
        }
        const abierto  = this.props.pedidos.byId.abierto;
        let cantidad   = 0;
        if (Array.isArray(abierto.lineas) && abierto.lineas.length === 0) {
            return cantidad;
        }
        abierto.lineasIds.map(id => {
            let linea = abierto.lineas[id];
            if (linea !== undefined && linea.producto_id === producto.id) {
                cantidad = linea.cantidad;
            }
        })
        return cantidad;
    }

   render() {
      const {mostrar} = this.state;
      return (
          <div className="app">
              <Navegador carrito={mostrar} changeMostrar={() => this.changeMostrar()}/>
              <Carrito mostrar={mostrar} changeMostrar={() => this.changeMostrar()}/>
              <div className="contenedor" style={{width: mostrar ? "calc(100% - 300px)" : "100%"}}>
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
                      <Route exact path={rutas.PRODUCTOS_ACCIONES} component={AltaEdicionProducto} />
                      <Route exact path={[rutas.ALMACEN]} render={(props) => <Almacen {...props} getCantidad={(producto) => this.getCantidad(producto)}/>} />
                      <Route exact path="*" component={NotFound} />
                  </Switch>
              </div>
          </div>

      );
  }
}

function mapStateToProps(state) {
    return {
        authentication: state.authentication,
        pedidos: state.pedidos,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsuarioLogueadoIfNeeded: () => {
            dispatch(fetchUsuarioLogueadoIfNeeded())
        },
        fetchProductosIfNeeded: () => {
            dispatch(fetchProductosIfNeeded())
        },
        fetchPedidoAbiertoIfNeeded: () => {
            dispatch(fetchPedidoAbiertoIfNeeded())
        }
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
