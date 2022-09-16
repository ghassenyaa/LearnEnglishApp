import React, { Suspense, Fragment, lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import DashboardLayout from './layouts/Dashboard';
import GuestGuard from './components/GuestGuard';
import AuthGuard from './components/AuthGuard';
import SwitchGuard from './components/SwitchGuard';
import CoursesLoader from './components/Loader/Loader';
export const renderRoutes = (routes = []) => (
  <Suspense fallback={<CoursesLoader />}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;
        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes ? renderRoutes(route.routes) : <Component {...props} />}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
);
const routes = [
  {
    exact: true,
    path: '/404',
    component: () => <Redirect to="/" />,
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/login',
    component: lazy(() => import('./pages/Auth/LoginView')),
  },
  {
    exact: true,
    guard: SwitchGuard,
    path: '/switch',
    component: lazy(() => import('./pages/Auth/Switch')),
  },
  {
    path: '/',
    guard: AuthGuard,
    layout: DashboardLayout,
    routes: [
      {
        exact: true,
        path: '/chapters',
        component: lazy(() => import('./pages/Chapters')),
      },
      {
        exact: true,
        path: '/languages/chapters',
        component: lazy(() => import('./pages/Chapters')),
      },
      {
        exact: true,
        path: '/courses',
        component: lazy(() => import('./pages/Courses/index')),
      },
      {
        exact: true,
        path: '/chapters/courses',
        component: lazy(() => import('./pages/Courses/index')),
      },
      {
        path: '/originator',
        exact: true,
        component: lazy(() => import('./pages/Originator/Originator')),
      },
      {
        path: '/exercises',
        exact: true,
        component: lazy(() => import('./pages/Exercises/Exercises')),
      },
      {
        path: '/user',
        exact: true,
        component: lazy(() => import('./pages/Users/index')),
      },
      {
        path: '/',
        exact: true,
        component: lazy(() => import('./pages/Dashboard/dashboard')),
      },
      {
        path: '/languages',
        exact: true,
        component: lazy(() => import('./pages/Languages/Languages')),
      },
      {
        path: '/details',
        exact: true,
        component: lazy(() => import('./pages/Users/User_details')),
      },
      {
        path: '/languagescourses',
        exact: true,
        component: lazy(() => import('./pages/LanguageCourses/LanguageCourse')),
      },
      {
        path: '/levels',
        exact: true,
        component: lazy(() => import('./pages/Levels/Levels')),
      },
      {
        path: '*',
        component: lazy(() => import('./pages/NotFound/NotFound')),
      },
    ],
  },
];
export default routes;
