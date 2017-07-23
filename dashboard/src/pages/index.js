import React from 'react';
import { Route } from 'react-router';
import OverviewPage from './overview';
import WorkforcePage from './workforce';
import CreatePage from './create';
import LeavePage from './leave';
import RedTicketPage from './redticket';
import LicensePage from './license';
import ClockingPage from './clocking';
import ProjectPage from './project';

export const pages = [
    // {
    //     key: 'overview',
    //     exact: true,
    //     path: '/',
    //     component: OverviewPage,
    //     title: 'Overview',
    //     menuConfig: {
    //         icon: 'home',
    //     },
    // },
    {
        key: 'project',
        exact: true,
        path: '/',
        component: ProjectPage,
        title: 'Projects',
        menuConfig: {
            icon: 'grid',
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
    {
        key: 'leave',
        path: '/leave',
        component: LeavePage,
        title: 'Leave',
        menuConfig: {
            icon: 'layout',
        },
    },
    {
        key: 'redticket',
        path: '/redticket',
        component: RedTicketPage,
        title: 'Red Ticket',
        menuConfig: {
            icon: 'zap',
        },
    },
    {
        key: 'license',
        path: '/license',
        component: LicensePage,
        title: 'License',
        menuConfig: {
            icon: 'box',
        },
    },
    {
        key: 'clocking',
        path: '/clocking',
        component: ClockingPage,
        title: 'Clocking',
        menuConfig: {
            icon: 'droplet',
        },
    },
];

export const pageRoutes = pages.map(page => (
    <Route { ...page } />
));
