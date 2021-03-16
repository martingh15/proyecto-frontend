import { createBrowserHistory } from 'history';

//Constants
import * as rutas from './constants/rutas.js';

export default createBrowserHistory({
    basename: rutas.INICIO
})