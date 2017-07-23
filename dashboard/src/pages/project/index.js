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

    componentWillMount() {
        this.props.dispatch(updateDocumentTitle('Project'));
        this.context.gql.dispatch(getProject());
    }

    render() {
        return (
            <ContentBox title="Project" headerAction={(
                <Button title="Create" icon="plus" onClick={() => this.context.router.history.push('/create')} />
            )}>
                <FilterBox onSearch={(tes) => {
                    console.log(tes);    
                }}/>
                {this.props.phase === 'start' ? (
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
                        content={this.props.data.map(data => ([
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
