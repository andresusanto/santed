import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Loading.css';

class Loading extends Component {
    render() {
        return (
            <div className="loading-box">
                <img src="assets/images/loading.gif" />
            </div>
        );
    }
}

export default Loading;