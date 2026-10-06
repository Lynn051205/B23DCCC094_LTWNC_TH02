import { Provider } from 'react-redux'
import { store } from './app/store'
import { ThemeProvider } from './contexts/ThemeContext'
import { HomePage } from './pages/HomePage/HomePage'
import './App.css'

const App = () => <Provider store={store}><ThemeProvider><HomePage /></ThemeProvider></Provider>
export default App
