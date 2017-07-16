import React, { Component } from 'react';
import PropTypes from 'prop-types';


class ContentBox extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
    };

    render() {
        return (
            <div className="row match-height">
                <div className="col-xl-12 col-lg-12">
                    <div className="card">
                        <div className="card-header no-border">
                            <h4 className="card-title">{this.props.title}</h4>
                            <a className="heading-elements-toggle"><i className="fa fa-ellipsis-v font-medium-3"></i></a>
                            <div className="heading-elements">
                                <ul className="list-inline mb-0">
                                    <li><a data-action="reload"><i className="ft-rotate-cw"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="card-body collapse in">
                            <div className="card-block">
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ContentBox;