import { Provider } from 'react-redux'
import { store } from './app/store'
import { HomePage } from './pages/HomePage/HomePage'
import './App.css'

const App = () => <Provider store={store}><HomePage /></Provider>
export default App
