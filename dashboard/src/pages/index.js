import React from 'react';
import { Route } from 'react-router';
import OverviewPage from './overview';
import WorkforcePage from './workforce';
import CreatePage from './create';

export const pages = [
    {
        key: 'overview',
        exact: true,
        path: '/',
        component: OverviewPage,
        title: 'Overview',
        menuConfig: {
            icon: 'home',
        },
    },
    {
        key: 'workforce',
        path: '/workforce',
        component: WorkforcePage,
        title: 'Workforce',
        menuConfig: {
            icon: 'monitor',
        },
    },
    {
        key: 'create',
        path: '/create',
        component: CreatePage,
        title: 'Create New Project',
        menuConfig: {
            hide: true,
        },
    },
];

export const pageRoutes = pages.map(page => (
    <Route { ...page } />
));
