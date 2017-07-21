import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateDocumentTitle } from '../../actions';
import ContentBox from '../../components/contentbox';
import StatusBox from '../../components/statusbox';

class OverviewPage extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
    };

    componentWillMount() {
        this.props.dispatch(updateDocumentTitle('Overview'));
    }

    render() {
        return (
            <div>
                <div className="row">
                    <StatusBox text="coba" color="primary" icon="check" value="78%"/>
                    <StatusBox text="coba" color="primary" icon="check" value="78%"/>
                    <StatusBox text="coba" color="primary" icon="check" value="78%"/>
                    <StatusBox text="coba" color="primary" icon="check" value="78%"/>
                </div>
                <ContentBox title="Overview">
                    Coba
                </ContentBox>
            </div>
        );
    }
}

export default connect()(OverviewPage);
