import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Datetime from 'react-datetime';
import moment from 'moment';

import 'react-datetime/css/react-datetime.css';
import './Overview.css';


class OverviewSection extends Component {
    static propTypes = {
        onValueChanges: PropTypes.func.isRequired,
        isActive: PropTypes.bool.isRequired,
    };

    constructor (props) {
        super(props);
        this.state = {
            startDate: moment(),
            endDate: moment(),
        };
    }

    handleChange(type, value) {
        this.setState({
            [type]: value
        });
        this.props.onValueChanges(type, value);
    }

    render() {
        const activeClass = this.props.isActive ? 'active-wizard' : 'inactive-wizard';
        return (
            <fieldset className={`body current ${activeClass}`}>
                <div className="row picker-helper">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="firstName1">Project Name :</label>
                            <input type="text" className="form-control" id="firstName1" onChange={(e) => this.props.onValueChanges('projectName', e.target.value)} />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="location1">Project Type :</label>
                            <select className="custom-select form-control" id="location1" onChange={(e) => this.props.onValueChanges('projectType', e.target.value)}>
                                <option value="Coal Mining">Coal Mining</option>
                                <option value="Other Types of Chemical Mining">Other Types of Chemical Mining</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="lastName1">Project Description :</label>
                            <textarea type="text" className="form-control" id="lastName1" rows="5" onChange={(e) => this.props.onValueChanges('projectDescription', e.target.value)}></textarea>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="location1">Project Location :</label>
                            <select className="custom-select form-control" id="location1" onChange={(e) => this.props.onValueChanges('projectLocation', e.target.value)}>
                                <option value="Sasolburg Mooikraal Mine">Sasolburg Mooikraal Mine</option>
                                <option value="Shondoni Middlebult Colliery">Shondoni Middlebult Colliery</option>
                                <option value="SCS West">SCS West</option>
                                <option value="Central Workshop">Central Workshop</option>
                                <option value="Bosjesspruit South Shaft">Bosjesspruit South Shaft</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-6">
                                <label>Scheduled Time :</label>
                            </div>
                        </div>
                        <div className="row">
                                <div className="col-md-6">
                                <Datetime
                                    value={this.state.startDate}
                                    className="picker-bottom"
                                    onChange={(date) => this.handleChange('startDate', date)}
                                />
                                </div>
                                <div className="col-md-6">
                                <Datetime
                                    className="picker-bottom"
                                    value={this.state.endDate}
                                    onChange={(date) => this.handleChange('endDate', date)}
                                />
                                </div>
                        </div>
                    </div>
                </div>
            </fieldset>
        );
    }
}

export default OverviewSection;