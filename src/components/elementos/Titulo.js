//History
import history from "../../history";

//Constantes
import * as rutas from "../../constants/rutas";

//Images
import imgVolver from "../../assets/img/arrow.png";

function volverA(ruta) {
    if (ruta === null) {
        return;
    }
    history.push(ruta);
}

export default function Titulo(props) {
    let ruta = props.ruta;
    const rutaValida = rutas.validarRuta(props.ruta);
    if (!rutaValida) {
        ruta = null;
    }
    const style = {
        width: '20px',
        cursor: 'pointer',
        marginRight: '10px',
        marginBottom: '5px'
    }
    let clase = props.clase ? props.clase : "";
    let texto = "Volver a página anterior";
    let flecha = <img style={style} onClick={() => volverA(ruta)} src={imgVolver} alt="Icono volver" title={texto}/>;
    if (ruta === null) {
        flecha = "";
    }
    return (
        <h4 className={clase} >
            {flecha}
            {props.titulo}
        </h4>
    )
}