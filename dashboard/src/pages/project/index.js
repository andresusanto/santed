import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import ContentBox from '../../components/contentbox';
import FilterBox from '../../components/filterbox';
import Button from '../../components/button';
import Table from '../../components/table';
import Loading from '../../components/loading';
import {
    updateDocumentTitle,
    getProject,
} from '../../actions';

const UPDATER_INTERVAL = 5000;

class ProjectPage extends Component {
    static contextTypes = {
        gql: PropTypes.object,
        router: PropTypes.object.isRequired,
    };
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        phase: PropTypes.string.isRequired,
        data: PropTypes.array.isRequired,
    };

    constructor() {
        super();
        this.state = {
            realtime: false,
        };
    }

    componentWillMount() {
        this.props.dispatch(updateDocumentTitle('Project'));
        this.context.gql.dispatch(getProject());
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.phase === 'start' && nextProps.phase !== 'start') {
            this.setState({realtime: true});
            setTimeout(() => {
                this.context.gql.dispatch(getProject());        
            }, UPDATER_INTERVAL);
        }
    }

    render() {
        return (
            <ContentBox title="Project" headerAction={(
                <Button title="Create" icon="plus" onClick={() => this.context.router.history.push('/create')} />
            )}>
                <FilterBox onSearch={(tes) => {
                    console.log(tes);    
                }}/>
                {this.props.phase === 'start' && !this.state.realtime ? (
                    <Loading />
                ) : (
                    <Table 
                        header={[
                            'Name',
                            'Type',
                            'Start',
                            'End',
                            'Requirements',
                            'Assignments',
                            'Rejected',
                        ]}
                        content={this.props.data.sort((a, b) => moment(b.created) - moment(a.created)).map(data => ([
                            data.name,
                            data.type,
                            moment(data.startDate).format('YYYY-MM-DD'),
                            moment(data.endDate).format('YYYY-MM-DD'),
                            data.requirements.map(req => `${req.num}x ${req.license}`).join('\n'),
                            data.assignments.map(assignment => `${assignment.miner.lastName}, ${assignment.miner.firstName} - ${assignment.miner.position} - (${assignment.position}:${assignment.status})`).join('\n'),
                            data.rejected.join('\n'),
                        ]))}/>
                )}
            </ContentBox>
        );
    }
}

const mapStateToProps = state => {
    return {
        phase: state.project.phase,
        data: state.project.data,
    }
}

export default connect(mapStateToProps)(ProjectPage);
