import { useEffect, useState } from "react";
import { getTecnicos, postAlterTecnico, postDeleteTecnico, postNewTecnico, postNewVehiculo } from "../Utils/Fetchs";

function Tecnicos() {
    const [data, setData] = useState();
    const [currentTecnico, setCurrentTecnico] = useState();

    useEffect(() => {
        updateData();
    }, [data]);

    function updateData() {
        getTecnicos()
            .then(response => {
                setData(response.filter(tecnico => tecnico.estado == true));
            });
    }

    function newTecnico() {
        let nombre = document.getElementById("nombre");
        let apellido = document.getElementById("apellido");
        let telefono = document.getElementById("telefono");

        if (nombre.value && apellido.value && telefono.value) {



            postNewTecnico(nombre.value, apellido.value, telefono.value);
            nombre.value = apellido.value = telefono.value = "";
        }
        else
            alert("Por favor, rellena todos los campos");
    };

    function alterTecnico() {
        let nombre = document.getElementById("aNombre");
        let apellido = document.getElementById("aApellido");
        let telefono = document.getElementById("aTelefono");

        let tecnico = { "id": currentTecnico.id }

        if (nombre.value) tecnico.nombre = nombre.value;
        if (apellido.value) tecnico.apellido = apellido.value;
        if (telefono.value) tecnico.telefono = telefono.value;

        postAlterTecnico(tecnico);
        nombre.value = apellido.value = telefono.value = "";
        setCurrentTecnico();
    }

    function deleteTecnico() {
        postDeleteTecnico(currentTecnico.id)
            .then(response => {
                setCurrentTecnico();
            });

        setCurrentTecnico();
        updateData();
    };

    function verificarNum(event) {
        const inputValue = event.target.value;

        if (isNaN(inputValue)) {
            alert("Por favor, ingresa solo números.");
            event.target.value = ""; // Limpiar el valor del campo si no es un número
        }
    }


    return (
        <div className="conteiner">
            <div className="listado">
                <h1>Tecnicos</h1>
                {data && data.map(tecnico => (
                    <div key={tecnico.id} onClick={() => setCurrentTecnico(tecnico)} className="entidad">
                        <p>{tecnico.nombre} {tecnico.apellido}</p>
                    </div>
                ))}

                {currentTecnico ? <button onClick={() => setCurrentTecnico()}>Crear tecnico</button> : <></>}
            </div>
            <div>
                {currentTecnico ?
                    <div className="form">
                        <h2>Modificar tecnico</h2>
                        <input id="aNombre" type="text" placeholder={currentTecnico.nombre} />
                        <input id="aApellido" type="text" placeholder={currentTecnico.apellido} />
                        <input id="aTelefono" onChange={(event) => verificarNum(event)} type="text" placeholder={currentTecnico.telefono} />
                        <button onClick={alterTecnico}>Modificar tecnico</button>
                        <button onClick={deleteTecnico}>Eliminar tecnico</button>
                    </div>
                    :
                    <div className="form">
                        <h2>Crear tecnico</h2>
                        <input id="nombre" type="text" placeholder="Nombre" />
                        <input id="apellido" type="text" placeholder="Apellido" />
                        <input id="telefono" onChange={(event) => verificarNum(event)} type="text" placeholder="Telefono" />
                        <button onClick={newTecnico}>Guardar tecnico</button>
                    </div>
                }
            </div>
        </div >
    )
};

export default Tecnicos;