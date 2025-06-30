import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { userAtom } from './utils/atoms';
import { useEffect, useState } from 'react';
import { getRandomUser } from './services/userService';
import { sha256 } from 'js-sha256';
import Homepage from './pages/Homepage';
import PostDetail from './pages/PostDetail';
import NotFound from './pages/notFound';
import Navbar from './components/Navbar/Navbar';
import FullScreenLoading from './components/Loading/FullScreenLoading';

function App() {
  const setUser = useSetAtom(userAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [initError, setInitError] = useState<string | null>(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        setIsLoading(true);
        
        // Fetch user data
        const user = await getRandomUser();
        setUser(user);
        
        // Generate and set token
        const token = sha256(user.email);
        document.cookie = `token=${token}; path=/; max-age=86400`; // Fixed cookie syntax
        
        // Optional: Add a minimum loading time for better UX (remove if not needed)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.error('Error initializing app: ', error);
        setInitError('Falha ao carregar aplicação. Tentando novamente...');
        
        // Retry after 2 seconds
        setTimeout(() => {
          setInitError(null);
          initializeApp();
        }, 2000);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, [setUser]);

  // Show loading screen while app is initializing
  if (isLoading) {
    return <FullScreenLoading />;
  }

  // Show error message if initialization failed
  if (initError) {
    return (
      <div className="full-screen-loading">
        <div className="screen-center">
          <div className="error-message">
            <p>{initError}</p>
            <FullScreenLoading />
          </div>
        </div>
      </div>
    );
  }

  // Render the main app once everything is loaded
  return (
    <BrowserRouter>
      <Navbar/>
      <main>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/home' element={<Homepage/>}/>
          <Route path='/inicio' element={<Homepage/>}/>
          <Route path='/post/:id' element={<PostDetail/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;