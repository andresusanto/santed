import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ContentBox from '../../components/contentbox';
import FilterBox from '../../components/filterbox';
import Button from '../../components/button';
import Table from '../../components/table';
import {
    updateDocumentTitle,
    createWorkforce,
} from '../../actions';


class WorkforcePage extends Component {
    static contextTypes = {
        gql: PropTypes.object,
    };
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
    };

    componentWillMount() {
        this.props.dispatch(updateDocumentTitle('Workforce'));
        this.context.gql.dispatch(createWorkforce());
    }

    render() {
        return (
            <ContentBox title="Workforce" headerAction={(
                <Button title="Create" icon="plus" />
            )}>
                <FilterBox onSearch={(tes) => {
                    console.log(tes);    
                }}/>
                <Table 
                    header={[
                        'Name',
                        'PA',
                        'Planned',
                        'WS Rule',
                        'Empl.',
                        'Company Code',
                        'Start Date',
                        'End Date',
                    ]}
                    content={[
                        ['Andre', '6032', '177.4', 'Day 645-1617 SMCW', 'Active', 'Sasol Mining', '7/1/15', '7/1/19'],
                        ['Andre', '6032', '177.4', 'Day 645-1617 SMCW', 'Active', 'Sasol Mining', '7/1/15', '7/1/19'],
                        ['Andre', '6032', '177.4', 'Day 645-1617 SMCW', 'Active', 'Sasol Mining', '7/1/15', '7/1/19'],
                        ['Andre', '6032', '177.4', 'Day 645-1617 SMCW', 'Active', 'Sasol Mining', '7/1/15', '7/1/19'],
                    ]}/>
            </ContentBox>
        );
    }
}

export default connect()(WorkforcePage);
