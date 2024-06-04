import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Teams from '../components/Teams/TeamsList'; 
import CreateTeam from '../components/Teams/CreateTeam'; 
import UpdateTeam from '../components/Teams/UpdateTeam';
import DeleteTeam from '../components/Teams/DeleteTeam'; 
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <h1>Welcome!</h1>,
      },
      {
        path: '/teams/:teamId/delete',
        element: <DeleteTeam />
      },
      {
        path: '/teams/:teamId/update',
        element: <UpdateTeam />
      },
      {
        path: '/teams/new',
        element: <CreateTeam />
      },
      {
        path: '/teams',
        element: <Teams />
      }, 
      {
        path: '/games',
        element: <h1>Games List</h1>
      }, 
      // {
      //   path: "login",
      //   element: <LoginFormPage />,
      // },
      // {
      //   path: "signup",
      //   element: <SignupFormPage />,
      // },
    ],
  },
]);