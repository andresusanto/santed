import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.css';
import { openHeaderMenu } from '../../actions';


class NotificationIcon extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        count: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        opennedMenu: PropTypes.string.isRequired,
    };

    openContent(e) {
        this.props.dispatch(openHeaderMenu(this.props.title));
        e.stopPropagation();
    }

    render() {
        const openCSS = this.props.title === this.props.opennedMenu ? " open" : "";
        return (
            <li className={"dropdown dropdown-notification nav-item" + openCSS}>
                <a onClick={(e) => this.openContent(e)} data-toggle="dropdown" className="nav-link nav-link-label">
                    <i className={"ficon ft-" + this.props.icon}></i>
                    <span className="tag tag-pill tag-default tag-danger tag-default tag-up">
                        {this.props.count}
                    </span>
                </a>
                <ul className="dropdown-menu dropdown-menu-media dropdown-menu-right">
                    <li className="dropdown-menu-header">
                        <h6 className="dropdown-header m-0">
                            <span className="grey darken-2">
                                {this.props.title}
                            </span><span className="notification-tag tag tag-default tag-danger float-xs-right m-0">5 New</span>
                        </h6>
                    </li>
                    <li className="list-group scrollable-container">
                        <a className="list-group-item">
                            <div className="media">
                            <div className="media-left valign-middle"><i className="ft-plus-square icon-bg-circle bg-cyan"></i></div>
                            <div className="media-body">
                                <h6 className="media-heading">You have new order!</h6>
                                <p className="notification-text font-small-3 text-muted">Lorem ipsum dolor sit amet, consectetuer elit.</p><small>
                                <time dateTime="2015-06-11T18:29:20+08:00" className="media-meta text-muted">30 minutes ago</time></small>
                            </div>
                            </div>
                        </a><a className="list-group-item">
                        <div className="media">
                        <div className="media-left valign-middle"><i className="ft-download-cloud icon-bg-circle bg-red bg-darken-1"></i></div>
                        <div className="media-body">
                            <h6 className="media-heading red darken-1">99% Server load</h6>
                            <p className="notification-text font-small-3 text-muted">Aliquam tincidunt mauris eu risus.</p><small>
                            <time dateTime="2015-06-11T18:29:20+08:00" className="media-meta text-muted">Five hour ago</time></small>
                        </div>
                        </div></a><a className="list-group-item">
                        <div className="media">
                        <div className="media-left valign-middle"><i className="ft-alert-triangle icon-bg-circle bg-yellow bg-darken-3"></i></div>
                        <div className="media-body">
                            <h6 className="media-heading yellow darken-3">Warning notifixation</h6>
                            <p className="notification-text font-small-3 text-muted">Vestibulum auctor dapibus neque.</p><small>
                            <time dateTime="2015-06-11T18:29:20+08:00" className="media-meta text-muted">Today</time></small>
                        </div>
                        </div></a><a className="list-group-item">
                        <div className="media">
                        <div className="media-left valign-middle"><i className="ft-check-circle icon-bg-circle bg-cyan"></i></div>
                        <div className="media-body">
                            <h6 className="media-heading">Complete the task</h6><small>
                            <time dateTime="2015-06-11T18:29:20+08:00" className="media-meta text-muted">Last week</time></small>
                        </div>
                        </div></a><a className="list-group-item">
                        <div className="media">
                        <div className="media-left valign-middle"><i className="ft-file icon-bg-circle bg-teal"></i></div>
                        <div className="media-body">
                            <h6 className="media-heading">Generate monthly report</h6><small>
                            <time dateTime="2015-06-11T18:29:20+08:00" className="media-meta text-muted">Last month</time></small>
                        </div>
                        </div></a>
                    </li>
                    <li className="dropdown-menu-footer"><a className="dropdown-item text-muted text-xs-center">Read all notifications</a></li>
                </ul>
            </li>
        );
    }
}

const mapStateToProps = state => {
    return {
        opennedMenu: state.header.opennedMenu,
    }
}

export default connect(mapStateToProps)(NotificationIcon);
