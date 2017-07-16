import React, { Component } from 'react';
import NotificationIcon from './NotificationIcon';
import ProfileIcon from './ProfileIcon';
import './Header.css';


class Header extends Component {
    render() {
        return (
            <nav className="header-navbar navbar navbar-with-menu navbar-static-top navbar-light navbar-border navbar-brand-center">
                <div className="navbar-wrapper">
                    <div className="navbar-header">
                        <ul className="nav navbar-nav navbar-brand">
                            <li className="nav-item">
                                <img alt="stack admin logo" src="assets/images/logo/santed.png" className="brand-logo" />
                                <h2 className="brand-text">Santed</h2>
                            </li>
                            <li className="nav-item hidden-md-up float-xs-right"><a data-toggle="collapse" data-target="#navbar-mobile" className="nav-link open-navbar-container"><i className="fa fa-ellipsis-v"></i></a></li>
                        </ul>
                    </div>
                    <div className="navbar-container container center-layout">
                        <div id="navbar-mobile" className="collapse navbar-toggleable-sm">
                            <ul className="nav navbar-nav float-xs-right">
                                <NotificationIcon count={6} title="Notification" icon="bell" />
                                <NotificationIcon count={7} title="Test" icon="mail" />
                                <ProfileIcon name="Test" />
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header;
