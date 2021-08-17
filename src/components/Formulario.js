import React, {useState} from 'react';
import Error from './Error';

const Formulario = ({setbusqueda}) => {
    const [termino, settermino] = useState('');
    const [error, seterror] = useState(false)

    const consultar = (e) => {
        e.preventDefault();

        //validar
        if(termino.trim() === ''){
            seterror(true);
            return;
        }
        
        //enviar el termino de busqueda hacia el componente principal
        seterror(false);

        setbusqueda(termino);
    }


    return (  
        <form
            onSubmit={consultar}
        >
            <div className="row">
                {error ? <Error mensaje="Debes Ingresar Almenos una busqueda"/> : null}

                <div className="form-group col-md-8">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca una imagen, ejemplo: futbol"
                        onChange={e => settermino(e.target.value)}
                    />
                </div>

                <div className="form-group col-md-4">
                    <input
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Buscar"
                    />
                </div>
            </div>
        </form>
    );
}
 
export default Formulario;