import React, { Component } from 'react';
import PropTypes from 'prop-types';


class StatusBox extends Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
    };

    render() {
        return (
            <div className="col-xl-3 col-lg-6 col-xs-12">
                <div className="card">
                    <div className="card-body">
                        <div className="card-block">
                            <div className="media">
                                <div className="media-body text-xs-left">
                                    <h3 className={this.props.color}>{this.props.value}</h3>
                                    <span>{this.props.text}</span>
                                </div>
                                <div className="media-right media-middle">
                                    <i className={`fa fa-${this.props.icon} ${this.props.color} font-large-2 float-xs-right`}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default StatusBox;