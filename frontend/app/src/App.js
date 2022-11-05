import './css/App.css';
import Routers from './route/Routers';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthGuardProvider } from './providers/AuthGuard';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './lib/queryClient';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthGuardProvider>
        <div className='main'>
          <Header />
            <Routers />
          <Footer />
        </div>
        </AuthGuardProvider>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
