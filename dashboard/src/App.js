import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './components/header';
import { closeHeaderMenu } from './actions'
import PropTypes from 'prop-types';


class App extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
    };

    render() {
        return (
            <div onClick={() => { this.props.dispatch(closeHeaderMenu()) }} className="App">
                <Header />
            </div>
        );
    }
}

export default connect()(App);
