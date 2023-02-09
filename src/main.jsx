import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
import { BrowserRouter } from 'react-router-dom'
import { store } from './Redux/store/store';
import { Provider } from 'react-redux'
import ToScrollTop from './components/ToScrollTop'



ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <ToScrollTop/>
      <App />
    </Provider>
  </BrowserRouter>
)
