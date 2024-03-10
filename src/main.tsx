import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './global.css'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { Toaster } from 'sonner'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Toaster theme='light' position='top-center' richColors duration={3000} />
    <App />
  </Provider>
)
