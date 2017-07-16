import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateDocumentTitle } from '../../actions';
import ContentBox from '../../components/contentbox';

class OverviewPage extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
    };

    componentWillMount() {
        this.props.dispatch(updateDocumentTitle('Overview'));
    }

    render() {
        return (
            <ContentBox title="Overview">
                Coba
            </ContentBox>
        );
    }
}

export default connect()(OverviewPage);
