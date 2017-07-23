import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Datetime from 'react-datetime';
import moment from 'moment';

import 'react-datetime/css/react-datetime.css';
import './FilterBox.css';

class FilterBox extends Component {
    static propTypes = {
        onSearch: PropTypes.func.isRequired,
    };

    constructor (props) {
        super(props);
        this.state = {
            startDate: moment(),
            endDate: moment(),
            keyword: '',
        };
    }

    handleChange(type, value) {
        this.setState({
            [type]: value
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-xl-4 col-lg-6 col-md-6 mb-1">
                        <fieldset className="form-group">
                                <label htmlFor="disabledInput">Keywords</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Name/Role"
                                    value={this.state.keyword} onChange={(e) => this.handleChange('keyword', e.target.value)} />
                        </fieldset>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 mb-1">
                        <div className="form-group">
                            <label>Start date</label>
                                <Datetime
                                    timeFormat={false}
                                    closeOnSelect={true}
                                    value={this.state.startDate}
                                    onChange={(date) => this.handleChange('startDate', date)}
                                />
                        </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 mb-1">
                        <div className="form-group">
                            <label>End date</label>
                            <Datetime
                                timeFormat={false}
                                closeOnSelect={true}
                                value={this.state.endDate}
                                onChange={(date) => this.handleChange('endDate', date)}
                            />
                        </div>
                </div>
                <div className="col-xl-2 col-lg-2 col-md-6 mb-1">
                        <div className="action-button filter-button">
                            <button
                                type="button" 
                                className="btn btn-primary btn-min-width mr-1 mb-1"
                                onClick={() => this.props.onSearch({
                                    startDate: this.state.startDate,
                                    endDate: this.state.endDate,
                                    keyword: this.state.keyword,
                                })}
                            >Search</button>
                        </div>
                </div>
            </div>
        );
    }
}

export default FilterBox;