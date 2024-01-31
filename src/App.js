import './App.css';
import { routes } from './routes/Routes';
import { RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from 'react-hot-toast';

//basic md
function App() {
  return (
    <div>
      <RouterProvider router={routes} />
      <Toaster />
    </div>
  );
}

export default App;
