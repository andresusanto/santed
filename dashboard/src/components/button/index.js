import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Button extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        onClick: PropTypes.func,
        icon: PropTypes.string,
    };

    render() {
        return (
            <div className="action-button">
                <button type="button" className="btn btn-info btn-min-width mr-1 mb-1" onClick={this.props.onClick}>
                    {this.props.icon ? (<i className={`fa fa-${this.props.icon}`}></i>) : null} {this.props.title}
                </button>
            </div>
        );
    }
}

export default Button;