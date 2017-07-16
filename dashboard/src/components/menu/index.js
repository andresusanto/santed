import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import { pages } from '../../pages';
import './Menu.css';

class Menu extends Component {
    static contextTypes = { router: React.PropTypes.object };

    render() {
        return (
            <div id="main-menu-top" role="navigation" data-menu="menu-wrapper" className="header-navbar navbar navbar-horizontal navbar-fixed navbar-dark navbar-without-dd-arrow navbar-bordered navbar-shadow menu-border">
                <div data-menu="menu-container" className="navbar-container main-menu-content container center-layout">
                    <ul id="main-menu-navigation" data-menu="menu-navigation" className="nav navbar-nav">
                        {pages.map(page => {
                            const isActive = this.context.router.route.location.pathname === page.path;
                            const activeClass = isActive ? ' active-menu' : '';
                            return (
                                <li key={`menu-${page.key}`} className={'dropdown nav-item' + activeClass}>
                                    <Link to={page.path} className="dropdown-toggle nav-link">
                                        <i className={`ft-${page.menuConfig.icon}`}></i><span>{page.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Menu;
