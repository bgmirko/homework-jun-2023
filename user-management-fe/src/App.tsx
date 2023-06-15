import './App.css';
import { AuthProvider } from './context/authContextProvider.tsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './routes';

function App() {
  return (
    <>
      <div>
        <AuthProvider>
          <Router>
            <AppRoutes />
          </Router>
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
