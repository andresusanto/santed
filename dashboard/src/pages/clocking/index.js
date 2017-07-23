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
    getClocking,
} from '../../actions';


class ClockingPage extends Component {
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
        this.props.dispatch(updateDocumentTitle('Clocking'));
        this.context.gql.dispatch(getClocking());
    }

    render() {
        return (
            <ContentBox title="Clocking">
                <FilterBox onSearch={(tes) => {
                    console.log(tes);    
                }}/>
                {this.props.phase === 'start' ? (
                    <Loading />
                ) : (
                    <Table 
                        header={[
                            'Card No',
                            'Name',
                            'Transit Date',
                            'Zone',
                            'Terminal',
                            'Visitor Company',
                            'Status',
                        ]}
                        content={this.props.data.map(data => ([
                            data.cardNumber,
                            `${data.lastName}, ${data.firstName}`,
                            moment(data.transitDate).format('YYYY-MM-DD'),
                            data.zone,
                            data.terminal,
                            data.visitorCompany === 'NULL' ? '' : data.visitorCompany,
                            data.transitStatus,
                        ]))}/>
                )}
            </ContentBox>
        );
    }
}

const mapStateToProps = state => {
    return {
        phase: state.clocking.phase,
        data: state.clocking.data,
    }
}

export default connect(mapStateToProps)(ClockingPage);
