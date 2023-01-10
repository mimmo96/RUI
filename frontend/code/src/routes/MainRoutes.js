import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

const DataHistory = Loadable(lazy(() => import('pages/rui/data-history/DataHistory')));
const RealTimeMonitoring = Loadable(lazy(() => import('pages/rui/RealTimeMonitoring')));
const Calculator = Loadable(lazy(() => import('pages/rui/Calculator')));
const Customization = Loadable(lazy(() => import('pages/rui/Customization')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            element: <DashboardDefault />
        },
        {
            path: 'history',
            element: <DataHistory />
        },
        {
            path: 'realtime',
            element: <RealTimeMonitoring />
        },
        {
            path: 'calculator',
            element: <Calculator />
        },
        {
            path: 'customization',
            element: <Customization />
        },

        // ------

        {
            path: 'color',
            element: <Color />
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        },
        {
            path: 'shadow',
            element: <Shadow />
        },
        {
            path: 'typography',
            element: <Typography />
        },
        {
            path: 'icons/ant',
            element: <AntIcons />
        }
    ]
};

export default MainRoutes;
