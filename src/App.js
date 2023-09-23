import { useState } from 'react';
import './App.css';
import Clientes from './Components/Clientes';
import Marcas from './Components/Marcas';
import Modelos from './Components/Modelos';
import Tecnicos from './Components/Tecnicos';
import Vehiculos from './Components/Vehiculos';

function App() {
  const [currentApp, setCurrentApp] = useState(null);

  return (
    <div>
      {currentApp ? (
        <div>
          <div className='button' onClick={() => setCurrentApp(null)}>Volver al menu</div>
          {currentApp}
        </div>
      ) : (
        <div className='app'>
          <div onClick={() => setCurrentApp(<Vehiculos />)}>Vehiculos</div>
          <div onClick={() => setCurrentApp(<Marcas />)}>Marcas</div>
          <div onClick={() => setCurrentApp(<Modelos />)}>Modelos</div>
          <div onClick={() => setCurrentApp(<Tecnicos />)}>Tecnicos</div>
          <div onClick={() => setCurrentApp(<Clientes />)}>Clientes</div>
        </div>
      )}
    </div>
  );
}

export default App;
