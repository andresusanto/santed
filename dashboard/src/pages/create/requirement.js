import React, { Component } from 'react';
import PropTypes from 'prop-types';


class RequirementSection extends Component {
    static propTypes = {
        onValueChanges: PropTypes.func.isRequired,
        isActive: PropTypes.bool.isRequired,
    };

    constructor (props) {
        super(props);
        this.state = {
            newName: 'Mining Load Haul Dumper',
            newAmount: '1',
            criticalPositions: {},
        };
    }

    addRequiredLicense() {
        if (this.state.criticalPositions[this.state.newName]) {
            alert(`${this.state.newName} already exist!`);
            return;
        }

        const criticalPositions = {
            ...this.state.criticalPositions,
            [this.state.newName]: this.state.newAmount,
        };

        this.setState({ criticalPositions });
        this.props.onValueChanges('criticalPositions', criticalPositions);
    }

    removeRequiredLicence(name) {
        const criticalPositions = Object.assign({}, this.state.criticalPositions);
        delete criticalPositions[name];
        this.setState({ criticalPositions });
        this.props.onValueChanges('criticalPositions', criticalPositions);
    }

    updateRequiredAmount(name, value) {
        const criticalPositions = {
            ...this.state.criticalPositions,
            [name]: value,
        };
        this.setState({ criticalPositions });
        this.props.onValueChanges('criticalPositions', criticalPositions);
    }

    handleChange(type, value) {
        this.setState({
            [type]: value
        });
    }

    render() {
        const activeClass = this.props.isActive ? 'active-wizard' : 'inactive-wizard';
        return (
            <fieldset className={`body current ${activeClass}`}>
                <h4 className="form-section border-btm">Critical Positions</h4>
                {Object.keys(this.state.criticalPositions).map(criticalPosition => (
                    <div className="row" key={`req-item-${criticalPosition}`}>
                        <div className="col-md-8">
                            <div className="form-group">
                                <label>Required License :</label>
                                <select className="custom-select form-control" readOnly value={criticalPosition}>
                                    <option value="Mining Load Haul Dumper">Mining Load Haul Dumper</option>
                                    <option value="Mining Roofbolter">Mining Roofbolter</option>
                                    <option value="Mining Shuttle Car">Mining Shuttle Car</option>
                                    <option value="Mining Continuous Miner">Mining Continuous Miner</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group">
                                <label htmlFor="location1">Amount :</label>
                                <input type="number" className="form-control" value={this.state.criticalPositions[criticalPosition]} onChange={(e) => this.updateRequiredAmount(criticalPosition, e.target.value)}/>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group">
                                <label htmlFor="location1">&nbsp;</label>
                                <input type="button" className="form-control btn btn-danger" value="Delete" onClick={() => this.removeRequiredLicence(criticalPosition)}/>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="row">
                    <div className="col-md-8">
                        <div className="form-group">
                            <label htmlFor="location1">Required License :</label>
                            <select className="custom-select form-control" id="location1" name="location" value={this.state.newName} onChange={(e) => this.handleChange('newName', e.target.value)}>
                                <option value="Mining Load Haul Dumper">Mining Load Haul Dumper</option>
                                <option value="Mining Roofbolter">Mining Roofbolter</option>
                                <option value="Mining Shuttle Car">Mining Shuttle Car</option>
                                <option value="Mining Continuous Miner">Mining Continuous Miner</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label htmlFor="location1">Amount :</label>
                            <input type="number" className="form-control" value={this.state.newAmount} onChange={(e) => this.handleChange('newAmount', e.target.value)}/>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label htmlFor="location1">&nbsp;</label>
                            <input type="button" className="form-control btn btn-info" value="Add" onClick={() => this.addRequiredLicense()} />
                        </div>
                    </div>
                </div>

                <h4 className="form-section border-btm">Additional Crew</h4>
                <h5>Select range of additional crew besides the critical positions</h5>
                <div className="col-md-2">
                    <div className="form-group">
                        <label htmlFor="location1">Min :</label>
                        <input type="number" className="form-control" defaultValue="5" onChange={(e) => this.props.onValueChanges('additionalCrewMin', e.target.value)} />
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group">
                        <label htmlFor="location1">Max :</label>
                        <input type="number" className="form-control" defaultValue="10" onChange={(e) => this.props.onValueChanges('additionalCrewMax', e.target.value)} />
                    </div>
                </div>
            </fieldset>
        );
    }
}

export default RequirementSection;