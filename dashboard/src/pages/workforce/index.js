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
                <FilterBox />
                <Table />
            </ContentBox>
        );
    }
}

export default connect()(WorkforcePage);
