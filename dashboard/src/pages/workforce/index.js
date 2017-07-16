import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateDocumentTitle } from '../../actions';
import ContentBox from '../../components/contentbox';


class WorkforcePage extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
    };

    componentWillMount() {
        this.props.dispatch(updateDocumentTitle('Workforce'));
    }

    render() {
        return (
            <ContentBox title="Workforce">
                Force gan!
            </ContentBox>
        );
    }
}

export default connect()(WorkforcePage);
