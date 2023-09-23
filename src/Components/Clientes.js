import { useEffect, useState } from "react";
import { getClientes, postAlterCliente, postDeleteCliente, postNewCliente } from "../Utils/Fetchs";

function Clientes() {
    const [data, setData] = useState();
    const [currentCliente, setCurrentCliente] = useState();

    useEffect(() => {
        updateData();
    }, [data]);

    function updateData() {
        getClientes()
            .then(response => {
                setData(response.filter(cliente => cliente.estado == true));
            });
    }

    function newCliente() {
        let nombre = document.getElementById("nombre");
        let apellido = document.getElementById("apellido");
        let telefono = document.getElementById("telefono");

        if (nombre.value && apellido.value && telefono.value) {
            postNewCliente(nombre.value, apellido.value, telefono.value);
            nombre.value = apellido.value = telefono.value = "";
        } else
            alert("Por favor, rellena todos los campos");
    };

    function alterCliente() {
        let nombre = document.getElementById("aNombre");
        let apellido = document.getElementById("aApellido");
        let telefono = document.getElementById("aTelefono");

        let cliente = { "id": currentCliente.id }

        if (nombre.value) cliente.nombre = nombre.value;
        if (apellido.value) cliente.apellido = apellido.value;
        if (telefono.value) cliente.telefono = telefono.value;

        postAlterCliente(cliente);
        nombre.value = apellido.value = telefono.value = "";
        setCurrentCliente();
    }

    function deleteCliente() {
        postDeleteCliente(currentCliente.id)
            .then(response => {
                setCurrentCliente();
            });

        setCurrentCliente();
        updateData();
    };

    function verificarNum(event) {
        const inputValue = event.target.value;

        if (isNaN(inputValue)) {
            alert("Por favor, ingresa solo números.");
            event.target.value = "";
        }
    }


    return (
        <div className="conteiner">
            <div className="listado">
                <h1>Clientes</h1>
                {data && data.map(cliente => (
                    <div key={cliente.id} onClick={() => setCurrentCliente(cliente)} className="entidad">
                        <p>{cliente.nombre} {cliente.apellido}</p>
                    </div>
                ))}

                {currentCliente ? <button onClick={() => setCurrentCliente()}>Crear cliente</button> : <></>}
            </div>
            <div>
                {currentCliente ?
                    <div className="form">
                        <h2>Modificar cliente</h2>
                        <input id="aNombre" type="text" placeholder={currentCliente.nombre} />
                        <input id="aApellido" type="text" placeholder={currentCliente.apellido} />
                        <input id="aTelefono" onChange={(event) => verificarNum(event)} type="text" placeholder={currentCliente.telefono} />
                        <button onClick={alterCliente}>Modificar cliente</button>
                        <button onClick={deleteCliente}>Eliminar cliente</button>
                    </div>
                    :
                    <div className="form">
                        <h2>Crear cliente</h2>
                        <input id="nombre" type="text" placeholder="Nombre" />
                        <input id="apellido" type="text" placeholder="Apellido" />
                        <input id="telefono" onChange={(event) => verificarNum(event)} type="text" placeholder="Telefono" />
                        <button onClick={newCliente}>Guardar Cliente</button>
                    </div>

                }
            </div>
        </div >
    )
};

export default Clientes;