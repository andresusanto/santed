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
                    <StatusBox text="Task Completed" color="primary" icon="check" value="78%"/>
                    <StatusBox text="Field Temperature" color="danger" icon="thermometer-empty" value="38&#8451;"/>
                    <StatusBox text="Air Pressure" color="success" icon="asterisk" value="766 mmHg"/>
                    <StatusBox text="Earth Quake" color="warning" icon="globe" value="~ 1 mo ago"/>
                </div>
                <ContentBox title="Overview">
                    TBD
                </ContentBox>
            </div>
        );
    }
}

export default connect()(OverviewPage);
