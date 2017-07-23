import React, { Component } from 'react';
import PropTypes from 'prop-types';


class ReviewSection extends Component {
    static propTypes = {
        onValueChanges: PropTypes.func.isRequired,
        inputs: PropTypes.object.isRequired,
        isActive: PropTypes.bool.isRequired,
    };

    render() {
        const activeClass = this.props.isActive ? 'active-wizard' : 'inactive-wizard';
        return (
            <fieldset className={`body current ${activeClass}`}>
                <h4 className="form-section border-btm">Project Overview</h4>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="firstName1"><strong>Project Name :</strong></label>
                            <p className="form-control-static">{this.props.inputs.projectName}</p>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="location1"><strong>Project Type :</strong></label>
                            <p className="form-control-static">{this.props.inputs.projectType}</p>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="lastName1"><strong>Project Description :</strong></label>
                            <p className="form-control-static">{this.props.inputs.projectDescription}</p>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="location1"><strong>Project Location :</strong></label>
                            <p className="form-control-static">{this.props.inputs.projectLocation}</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="jobTitle2"><strong>Scheduled Time :</strong></label>
                            <p className="form-control-static">{this.props.inputs.startDate.toLocaleString()} - {this.props.inputs.endDate.toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                <h4 className="form-section border-btm">Requirements</h4>
                <h5 className="form-section border-btm">Critical Positions</h5>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="location1"><strong>Required License :</strong></label>
                            {Object.keys(this.props.inputs.criticalPositions).map((criticalPosition, i) => (
                                <p key={`critical-pos-${criticalPosition}-${i}`} className="form-control-static">{this.props.inputs.criticalPositions[criticalPosition]} x {criticalPosition}</p>
                            ))}
                        </div>
                    </div>
                </div>

                <h5 className="form-section border-btm">Additional Crew</h5>
                <h6>Additional crew needed besides the critical positions</h6>
                <div className="col-md-12">
                    <div className="form-group">
                        <p className="form-control-static">{this.props.inputs.additionalCrewMin} - {this.props.inputs.additionalCrewMax} Additional Crews</p>
                    </div>
                </div>
            </fieldset>
        );
    }
}

export default ReviewSection;