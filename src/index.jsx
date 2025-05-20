import './style.css'

import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import Clicker from './Clicker.jsx'

const root = createRoot(document.querySelector('#root'))

root.render(
    <div>
        <App clickersCount={ 1 }>
            <h1>Thruster Config Test</h1>
            <h2>Lest go!</h2>
        </App>
    </div>
)