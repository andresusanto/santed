import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory'

import { pageRoutes } from './pages'
import { closeHeaderMenu } from './actions'
import Header from './components/header';
import Footer from './components/footer';
import Menu from './components/menu';


const history = createBrowserHistory()

class App extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        documentTitle: PropTypes.string.isRequired,
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.documentTitle !== this.props.documentTitle) {
            document.title = `${nextProps.documentTitle} - Sasol United`;
        }
    }

    commonClickHandler() {
        if (this.props.opennedMenu !== '') {
            this.props.dispatch(closeHeaderMenu());
        }
    }

    render() {
        return (
            <div onClick={() => this.commonClickHandler()} className="App">
                <Router history={history}>
                    <div>
                        <Header />
                        <Menu />
                        <div className="app-content container center-layout mt-2">
                            <div className="content-wrapper">
                                <div className="content-body">
                                    {pageRoutes}
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </Router>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        documentTitle: state.app.documentTitle,
        opennedMenu: state.header.opennedMenu,
    }
}

export default connect(mapStateToProps)(App);
