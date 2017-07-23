import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import { updateDocumentTitle, createProject } from '../../actions';
import ContentBox from '../../components/contentbox';

import OverviewSection from './overview';
import RequirementSection from './requirement';
import ReviewSection from './review';
import './Create.css';

class CreatePage extends Component {
    static contextTypes = {
        rest: PropTypes.object,
        router: PropTypes.object.isRequired,
    };
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
    };

    constructor (props) {
        super(props);
        this.state = {
            currentStep: 1,
            inputs: {
                projectName: '',
                projectType: 'Coal Mining',
                projectDescription: '',
                projectLocation: 'Sasolburg Mooikraal Mine',
                startDate: moment(),
                endDate: moment(),
                criticalPositions: {},
                additionalCrewMin: '5',
                additionalCrewMax: '10',
            },
        };
    }

    componentWillMount() {
        this.props.dispatch(updateDocumentTitle('Create New Project'));
    }

    onValueChanges(name, newValue) {
        this.setState({
            inputs: {
                ...this.state.inputs,
                [name]: newValue,
            }
        });
    }

    onNext() {
        this.setState({
            currentStep: this.state.currentStep + 1,
        });
    }

    onPrevious() {
        this.setState({
            currentStep: this.state.currentStep - 1,
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.phase === 'start' && nextProps.phase === 'success') {
            alert('Create Project Success!');
            this.context.router.history.push('/');
        } else if (this.props.phase === 'start' && nextProps.phase === 'failed') {
            alert('Create Project Failed!');
            this.context.router.history.push('/');
        }
    }

    onSubmit() {
        this.context.rest.dispatch(createProject(this.state.inputs));
    }

    render() {
        return (
            <ContentBox title="Create New Project">
                <div className="number-tab-steps wizard-circle wizard clearfix">
                    <div className="steps clearfix">
                        <ul role="tablist">
                            <li role="tab" className={this.state.currentStep === 1 ? 'first current' : 'first done'}><a><span className="step">1</span> Overview</a></li>
                            <li role="tab" className={this.state.currentStep === 2 ? 'last current' : this.state.currentStep < 2 ? 'last disabled' : 'last done'}><a><span className="step">2</span> Requirements</a></li>
                            <li role="tab" className={this.state.currentStep === 3 ? 'last current' : 'last disabled'}><a><span className="step">3</span> Review</a></li>
                        </ul>
                    </div>
                    <div className="content clearfix">
                        <OverviewSection onValueChanges={(name, newValue) => this.onValueChanges(name, newValue)} isActive={this.state.currentStep === 1} />
                        <RequirementSection onValueChanges={(name, newValue) => this.onValueChanges(name, newValue)} isActive={this.state.currentStep === 2} />
                        <ReviewSection inputs={this.state.inputs} onValueChanges={(name, newValue) => this.onValueChanges(name, newValue)} isActive={this.state.currentStep === 3} />
                    </div>
                    <div className="actions clearfix">
                        <ul role="menu" aria-label="Pagination">
                            <li className={this.state.currentStep === 1 ? 'disabled' : ''}><a onClick={() => this.onPrevious()} className={this.state.currentStep === 1 ? 'disable-btn' : ''}>Previous</a></li>
                            {this.state.currentStep !== 3 ? (<li><a onClick={() => this.onNext()}>Next</a></li>) : null}
                            {this.state.currentStep === 3 ? (<li><a onClick={() => this.onSubmit()}>Submit</a></li>) : null}
                        </ul>
                    </div>
                </div>
            </ContentBox>
        );
    }
}

const mapStateToProps = state => {
    return {
        phase: state.create.phase,
    }
}

export default connect(mapStateToProps)(CreatePage);
