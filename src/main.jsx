import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

const Root = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(
    <Root />
)
