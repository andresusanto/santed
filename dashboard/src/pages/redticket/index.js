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
    getRedTicket,
} from '../../actions';


class RedTicketPage extends Component {
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
        this.props.dispatch(updateDocumentTitle('Red Ticket'));
        this.context.gql.dispatch(getRedTicket());
    }

    render() {
        return (
            <ContentBox title="Red Ticket">
                <FilterBox onSearch={(tes) => {
                    console.log(tes);    
                }}/>
                {this.props.phase === 'start' ? (
                    <Loading />
                ) : (
                    <Table 
                        header={[
                            'Company',
                            'Name',
                            'Position',
                            'Medical Date',
                            'Outcome',
                            'Red Ticket',
                            'Expiry Date',
                        ]}
                        content={this.props.data.map(data => ([
                            data.companyNo,
                            data.name.split(',').join(', ').split('(').join(' ('),
                            data.position,
                            moment(data.medicalDate).format('YYYY-MM-DD'),
                            data.outcome,
                            data.required ? 'Y' : 'N',
                            moment(data.expiryDate).format('YYYY-MM-DD'),
                        ]))}/>
                )}
            </ContentBox>
        );
    }
}

const mapStateToProps = state => {
    return {
        phase: state.redTicket.phase,
        data: state.redTicket.data,
    }
}

export default connect(mapStateToProps)(RedTicketPage);
