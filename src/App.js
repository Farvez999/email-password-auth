import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './layouts/Main';
import BootstrapRegister from './components/BootstrapRegister';
import BootstrapLogin from './components/BootstrapLogin';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main>0</Main>,
    children: [
      {
        path: '/',
        element: <BootstrapRegister></BootstrapRegister>,
      },
      {
        path: '/register',
        element: <BootstrapRegister></BootstrapRegister>,
      },
      {
        path: '/login',
        element: <BootstrapLogin></BootstrapLogin>,
      }
    ]
  },
]);

function App() {
  return (
    <div className="">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
