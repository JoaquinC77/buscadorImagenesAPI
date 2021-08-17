import React, { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import axios from "axios";
import ListadoImagenes from "./components/ListadoImagenes";

function App() {
    const [busqueda, setbusqueda] = useState("");
    const [imagenes, setimagenes] = useState([]);

    const [pagina, setpagina] = useState(1);
    const [totalpaginas, settotalpaginas] = useState(1);

    useEffect(() => {
        const consultarAPI = async () => {
            if (busqueda === "") return;

            const imagenesPorPagina = 30;
            const key = "22455569-a5d2bcbee0346cabd99f7a827";
            const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&image_type=photo&per_page=${imagenesPorPagina}&page=${pagina}`;

            const resultado = await axios.get(url);

            const calcularTotalPaginas = Math.ceil(resultado.data.totalHits / imagenesPorPagina);
            
            settotalpaginas(calcularTotalPaginas);

            setimagenes(resultado.data.hits);

            //mover la pantalla hacia arriba
            const jumbotron = document.querySelector('.jumbotron');
            jumbotron.scrollIntoView({behavior: "smooth"});
        };

        consultarAPI();
    }, [busqueda, pagina]);

    //definir la pagina anterior
    const paginaAnterior = () => {
        const nuevaPaginaActual = pagina - 1;

        if (nuevaPaginaActual === 0) return;

        setpagina(nuevaPaginaActual);
    };

    //pagina siguiente
    const paginaSiguiente = () => {
        const nuevaPaginaActual = pagina + 1;

        if (nuevaPaginaActual > totalpaginas) return;

        setpagina(nuevaPaginaActual);
    };

    return (
        <div className="container">
            <div className="jumbotron">
                <p className="lead text-center">Buscador de Imagenes</p>

                <Formulario setbusqueda={setbusqueda} />
            </div>

            <div className="row justify-content-center">
                <ListadoImagenes imagenes={imagenes} />

                {pagina === 1 ? null : (
                    <button
                        type="button"
                        className="btn btn-info mr-1"
                        onClick={paginaAnterior}
                    >
                        Anterior &laquo;
                    </button>
                )}

                {pagina >= totalpaginas ? null : (
                    <button
                        type="button"
                        className="btn btn-info mr-1"
                        onClick={paginaSiguiente}
                    >
                        Siguiente &raquo;
                    </button>
                )}
            </div>
        </div>
    );
}

export default App;
