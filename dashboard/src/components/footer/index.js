import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer className="footer footer-static footer-light navbar-shadow">
                <p className="clearfix blue-grey lighten-2 text-sm-center mb-0 px-2">
                    <span className="float-md-left d-xs-block d-md-inline-block">
                        Hand-crafted & Made with <i className="ft-heart pink"></i> by Brownie Team.
                    </span>
                </p>
            </footer>
        );
    }
}

export default Footer;