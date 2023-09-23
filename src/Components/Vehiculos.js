import { useEffect, useState } from "react";
import { getModelos, getClientes, getTecnicos, getVehiculos, postAlterVehiculo, postDeleteVehiculo, postNewVehiculo } from "../Utils/Fetchs";

function Vehiculos() {
    const [data, setData] = useState();
    const [currentVehiculo, setCurrentVehiculo] = useState();
    const [modelos, setModelos] = useState();
    const [clientes, setClientes] = useState();
    const [tecnicos, setTecnicos] = useState();

    useEffect(() => {
        updateData();
    }, [data]);

    function updateData() {
        getVehiculos()
            .then(response => {
                setData(response.filter(vehiculo => vehiculo.estado == true));
            });

        getModelos()
            .then(response => {
                setModelos(response.filter(modelo => modelo.estado == true))
            })

        getTecnicos()
            .then(response => {
                setTecnicos(response.filter(tecnico => tecnico.estado == true))
            })

        getClientes()
            .then(response => {
                setClientes(response.filter(cliente => cliente.estado == true))
            })
    }

    function newVehiculo() {
        let patente = document.getElementById("patente");
        let modelo = document.getElementById("modelo");
        let cliente = document.getElementById("cliente");
        let tecnico = document.getElementById("tecnico");

        if (patente.value && modelo.value && cliente.value && tecnico.value) {

            postNewVehiculo(patente.value, modelo.value, cliente.value, tecnico.value);
            patente.value = cliente.value = modelo.value = tecnico.value = "";
        } else
            alert("Por favor, rellena todos los campos");
    };

    function deleteVehiculo() {
        postDeleteVehiculo(currentVehiculo.patente)
            .then(response => {
                setCurrentVehiculo();
            });

        setCurrentVehiculo();
        updateData();
    };

    return (
        <div className="conteiner">
            <div className="listado">
                <h1>Vehiculos</h1>
                {data && data.map(vehiculo => (
                    <div key={vehiculo.patente} onClick={() => setCurrentVehiculo(vehiculo)} className="entidad">
                        <p>{vehiculo.patente}</p>
                    </div>
                ))}

                {currentVehiculo ? <button onClick={() => setCurrentVehiculo()}>Crear vehiculo</button> : <></>}
            </div>
            <div>
                {currentVehiculo ?
                    <div className="form">
                        <h2>Eliminar vehiculo</h2>
                        <p>Patente: {currentVehiculo.patente}</p>
                        <p>Modelo: {currentVehiculo.modelo.nombre}</p>
                        <p>Cliente: {currentVehiculo.cliente.nombre} {currentVehiculo.cliente.apellido}</p>
                        <p>Tecnico: {currentVehiculo.tecnico.nombre} {currentVehiculo.tecnico.apellido}</p>
                        <button onClick={deleteVehiculo}>Eliminar vehiculo</button>
                    </div>
                    :
                    <div className="form">
                        <h2>Crear vehiculo</h2>
                        <input id="patente" type="text" placeholder="Patente" />
                        <select id="modelo">
                            {modelos && modelos.map(modelo => (
                                <option value={modelo.id} key={modelo.id} selected>{modelo.nombre}</option>
                            ))}
                        </select>

                        <select id="cliente">
                            {clientes && clientes.map(cliente => (
                                <option value={cliente.id} key={cliente.id} selected>{cliente.nombre} {cliente.apellido}</option>
                            ))}
                        </select>

                        <select id="tecnico">
                            {tecnicos && tecnicos.map(tecnico => (
                                <option value={tecnico.id} key={tecnico.id} selected>{tecnico.nombre} {tecnico.apellido}</option>
                            ))}
                        </select>
                        <button onClick={newVehiculo}>Guardar vehiculo</button>
                    </div>
                }
            </div>
        </div >
    )
};

export default Vehiculos;