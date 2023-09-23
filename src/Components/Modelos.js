import { useEffect, useState } from "react";
import { getMarcas, getModelos, postAlterModelo, postDeleteModelo, postNewModelo } from "../Utils/Fetchs";

function Modelos() {
    const [data, setData] = useState();
    const [currentModelo, setCurrentModelo] = useState();
    const [marcas, setMarcas] = useState();

    useEffect(() => {
        updateData();
    }, [data]);

    function updateData() {
        getModelos()
            .then(response => {
                setData(response.filter(modelo => modelo.estado == true));
            });

        getMarcas()
            .then(response => {
                setMarcas(response.filter(marca => marca.estado == true))
            })
    }

    function newModelo() {
        let nombre = document.getElementById("nombre");
        let marca_nombre = document.getElementById("marca_nombre");

        if (nombre.value && marca_nombre.value) {

            postNewModelo(nombre.value, marca_nombre.value);
            nombre.value = marca_nombre.value = "";
        } else
            alert("Por favor, rellena todos los campos");
    };

    function deleteModelo() {
        postDeleteModelo(currentModelo.id)
            .then(response => {
                setCurrentModelo();
            });

        setCurrentModelo();
        updateData();
    };

    return (
        <div className="conteiner">
            <div className="listado">
                <h1>Modelos</h1>
                {data && data.map(modelo => (
                    <div key={modelo.id} onClick={() => setCurrentModelo(modelo)} className="entidad">
                        <p>{modelo.nombre} - {modelo.marca.nombre}</p>
                    </div>
                ))}

                {currentModelo ? <button onClick={() => setCurrentModelo()}>Crear modelo</button> : <></>}
            </div>
            <div>
                {currentModelo ?
                    <div className="form">
                        <h2>Eliminar modelo</h2>
                        <p>Modelo: {currentModelo.nombre}</p>
                        <p>Marca: {currentModelo.marca.nombre}</p>
                        <button onClick={deleteModelo}>Eliminar modelo</button>
                    </div>
                    :
                    <div className="form">
                        <h2>Crear modelo</h2>
                        <input id="nombre" type="text" placeholder="Nombre" />
                        <select id="marca_nombre">
                            {marcas && marcas.map(marca => (
                                <option values={marca.nombre} key={marca.nombre}>{marca.nombre}</option>
                            ))}
                        </select>
                        <button onClick={newModelo}>Guardar modelo</button>
                    </div>
                }
            </div>
        </div >
    )
};

export default Modelos;