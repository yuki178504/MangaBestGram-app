import './css/App.css';
import Routers from './route/Routers';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthGuardProvider } from './providers/AuthGuard';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './lib/queryClient';
import { ErrorBoundary } from 'react-error-boundary';
import  ErrorFallback from './components/ErrorBoundary';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthGuardProvider>
          <div className='main'>
            <ErrorBoundary
              FallbackComponent={ErrorFallback}
            >
              <Header />
                <Routers />
              <Footer />
            </ErrorBoundary>
          </div>
        </AuthGuardProvider>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
