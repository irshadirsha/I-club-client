import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from 'react-redux'
import {Store,persistor} from './redux/Store.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <Provider store={Store}>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    <ToastContainer
        style={{ width: '150px' }} 
        fontSize= '10px'  
        position="top-right"
        autoClose={1000}
      />
    </PersistGate>
    </Provider>
  </React.StrictMode>,
)


// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App.jsx';
// import './index.css';
// import { Provider } from 'react-redux';
// import { Store, persistor } from './redux/Store.jsx';
// import { PersistGate } from 'redux-persist/integration/react';

// ReactDOM.unstable_createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Provider store={Store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <App />
//       </PersistGate>
//     </Provider>
//   </React.StrictMode>
// );
