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
    getLicense,
} from '../../actions';


class LicensePage extends Component {
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
        this.props.dispatch(updateDocumentTitle('License'));
        this.context.gql.dispatch(getLicense());
    }

    render() {
        return (
            <ContentBox title="License">
                <FilterBox onSearch={(tes) => {
                    console.log(tes);    
                }}/>
                {this.props.phase === 'start' ? (
                    <Loading />
                ) : (
                    <Table 
                        header={[
                            'Name',
                            'Entity ID',
                            'Entity Title',
                            'Completion Date',
                            'Total/Credit/Contact Hours',
                            'Tuition',
                        ]}
                        content={this.props.data.map(data => ([
                            `${data.lastName}, ${data.firstName}`,
                            data.entityId,
                            data.entityTitle,
                            moment(data.completionDate).format('YYYY-MM-DD'),
                            `${data.totalHours} / ${data.creditHours} / ${data.contactHours}`,
                            `${data.currencyId}${data.tuition}`,
                        ]))}/>
                )}
            </ContentBox>
        );
    }
}

const mapStateToProps = state => {
    return {
        phase: state.license.phase,
        data: state.license.data,
    }
}

export default connect(mapStateToProps)(LicensePage);
