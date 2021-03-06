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
    getWorkforce,
} from '../../actions';


class WorkforcePage extends Component {
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
        this.props.dispatch(updateDocumentTitle('Workforce'));
        this.context.gql.dispatch(getWorkforce());
    }

    render() {
        return (
            <ContentBox title="Workforce">
                <FilterBox onSearch={(tes) => {
                    console.log(tes);    
                }}/>
                {this.props.phase === 'start' ? (
                    <Loading />
                ) : (
                    <Table 
                        header={[
                            'Person No',
                            'PA',
                            'Planned',
                            'WS Rule',
                            'Empl.',
                            'Company Code',
                            'Start Date',
                            'End Date',
                        ]}
                        content={this.props.data.map(data => ([
                            data.persNo,
                            data.pa,
                            data.planned,
                            data.wsRule,
                            data.employmentStatus,
                            data.companyCode,
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
        phase: state.workforce.phase,
        data: state.workforce.data,
    }
}

export default connect(mapStateToProps)(WorkforcePage);
