import React from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import store from './store';
import Weather from './components/weather';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
  
      <Weather/>
    </div>
  </Provider>
    
  );
}

export default App;