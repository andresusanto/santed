import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Table extends Component {
    static propTypes = {
        text: PropTypes.string,
        header: PropTypes.array.isRequired,
        content: PropTypes.arrayOf(PropTypes.array).isRequired,
    };

    render() {
        return (
            <table className="table table-striped table-bordered dataex-fixh-basic">
                <thead>
                    <tr>
                        {this.props.header.map((header, i) => (
                            <th key={`tr-header-${header}-${i}`}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {this.props.content.map((contents, i) => (
                        <tr key={`tr-content-${i}`}>
                            {contents.map((content, j) => (
                                <td key={`td-content-${content}-${i}-${j}`}>{content.split('\n').map((contentPerLine, k) => (
                                        <span key={`td-content-${content}-${i}-${j}-${k}`}>
                                            { k > 0 ? (<hr/>) : null }
                                            {contentPerLine}
                                            <br/>
                                        </span>
                                    ))}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

export default Table;