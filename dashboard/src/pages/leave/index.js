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
    getLeave,
} from '../../actions';


class LeavePage extends Component {
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
        this.props.dispatch(updateDocumentTitle('Leave'));
        this.context.gql.dispatch(getLeave());
    }

    render() {
        return (
            <ContentBox title="Leave">
                <FilterBox onSearch={(tes) => {
                    console.log(tes);    
                }}/>
                {this.props.phase === 'start' ? (
                    <Loading />
                ) : (
                    <Table 
                        header={[
                            'Person No',
                            'Name',
                            'Position',
                            'Unit',
                            'Leave Type',
                            'Start Date',
                            'End Date',
                        ]}
                        content={this.props.data.map(data => ([
                            data.persNo,
                            `${data.lastName}, ${data.firstName}`,
                            data.position,
                            data.orgUnit,
                            data.type,
                            moment(data.startDate).format('YYYY-MM-DD'),
                            moment(data.endDate).format('YYYY-MM-DD'),
                        ]))}/>
                )}
            </ContentBox>
        );
    }
}

const mapStateToProps = state => {
    return {
        phase: state.leave.phase,
        data: state.leave.data,
    }
}

export default connect(mapStateToProps)(LeavePage);
