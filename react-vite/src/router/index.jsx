import { createBrowserRouter } from 'react-router-dom';
import Teams from '../components/Teams/TeamsList'; 
import CreateTeam from '../components/Teams/CreateTeam'; 
import UpdateTeam from '../components/Teams/UpdateTeam';
import DeleteTeam from '../components/Teams/DeleteTeam'; 
import GamesList from '../components/Games/GamesList';
import CreateGame from '../components/Games/CreateGame'; 
import UpdateGame from '../components/Games/UpdateGame';
import LandingPage from '../components/LandingPage/LandingPage'; 
import CreateOdd from '../components/Odds/CreateOdd'; 
import Layout from './Layout';


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage/>,
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
        element: <GamesList />
      }, 
      {
        path: '/games/new',
        element: <CreateGame />
      }, 
      {
        path: '/games/:gameId/update',
        element: <UpdateGame />
      }, 
      {
        path: '/games/:gameId',
        element: <CreateOdd />
      },
      {
        path: '/results',
        element: <h1>Results Feature Coming Soon!</h1>
      }
    ],
  },
]);