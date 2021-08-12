import Login from '../containers/Login';
import Home from '../containers/Home.jsx';

const routes = [

  {
    exact: true,
    path: '/login',
    component: Login,
  },
  {
    exact: true,
    path: '/home',
    component: Home,
  },
];

export default routes;

