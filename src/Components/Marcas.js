import { useEffect, useState } from "react";
import { getMarcas, postNewMarca, postDeleteMarca } from "../Utils/Fetchs";

function Marcas() {
    const [data, setData] = useState();
    const [currentMarca, setCurrentMarca] = useState();

    useEffect(() => {
        updateData();
    }, [data]);

    function updateData() {
        getMarcas()
            .then(response => {
                setData(response.filter(marca => marca.estado == true));
            });
    }

    function newMarca() {
        let nombre = document.getElementById("nombre");

        if (nombre.value) {

            postNewMarca(nombre.value);
            nombre.value = "";
        }
        else
            alert("Por favor, rellena todos los campos");
    };

    function deleteMarca() {
        postDeleteMarca(currentMarca.nombre)
            .then(response => {
                setCurrentMarca();
                updateData();
            });
    };

    return (
        <div className="conteiner">
            <div className="listado">
                <h1>Marcas</h1>
                {data && data.map(marca => (
                    <div key={marca.id} onClick={() => setCurrentMarca(marca)} className="entidad">
                        <p>{marca.nombre}</p>
                    </div>
                ))}

                {currentMarca ? <button onClick={() => setCurrentMarca()}>Crear marca</button> : <></>}
            </div>
            <div>
                {currentMarca ?
                    <div className="form">
                        <h2>Eliminar Marca</h2>
                        <p>Marca: {currentMarca.nombre}</p>
                        <button onClick={deleteMarca}>Eliminar marca</button>
                    </div>
                    :
                    <div className="form">
                        <h2>Crear Marca</h2>
                        <input id="nombre" type="text" placeholder="Nombre" />
                        <button onClick={newMarca}>Guardar marca</button>
                    </div>
                }
            </div>
        </div >
    )
};

export default Marcas;