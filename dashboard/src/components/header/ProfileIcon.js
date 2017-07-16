import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.css';
import { openHeaderMenu, closeHeaderMenu } from '../../actions';

const PROFILE_TITLE = "Profile";

class ProfileIcon extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        name: PropTypes.string.isRequired,
        opennedMenu: PropTypes.string.isRequired,
    };


    openContent(e) {
        if (this.props.opennedMenu === PROFILE_TITLE) {
            this.props.dispatch(closeHeaderMenu());
        } else {
            this.props.dispatch(openHeaderMenu(PROFILE_TITLE));
        }
        e.stopPropagation();
    }

    render() {
        const openCSS = PROFILE_TITLE === this.props.opennedMenu ? " open" : "";
        return (
            <li className={"dropdown dropdown-user nav-item" + openCSS}>
                <a onClick={(e) => this.openContent(e)} data-toggle="dropdown" className="dropdown-toggle nav-link dropdown-user-link">
                    <span className="avatar avatar-online">
                        <img src="assets/images/portrait/small/avatar-s-1.png" alt="avatar" /><i></i>
                    </span>
                    <span className="user-name">
                        {this.props.name}
                    </span>
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item">
                        <i className="ft-user"></i> Edit Profile
                    </a>
                    <a className="dropdown-item">
                        <i className="ft-mail"></i> My Inbox
                    </a>
                    <a className="dropdown-item">
                        <i className="ft-check-square"></i> Task
                    </a>
                    <a className="dropdown-item">
                        <i className="ft-comment-square"></i> Chats
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item">
                        <i className="ft-power"></i> Logout
                    </a>
                </div>
            </li>
        );
    }
}

const mapStateToProps = state => {
    return {
        opennedMenu: state.header.opennedMenu,
    }
}

export default connect(mapStateToProps)(ProfileIcon);
