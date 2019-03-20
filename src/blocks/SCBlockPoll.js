import React from 'react';
import PropTypes from 'prop-types';


class SCBlockPoll extends React.Component {
    render() {

        const divStyle = {
            height: "150px",
            width: "40vw",
            marginRight: "10px",
            marginLeft: "10px",
            borderRadius: "15px",
            backgroundColor: "white"
        };

        return (
              <div style={divStyle} onClick={() => {this.props.action()}}>
                  <div> {this.props.name}</div>
                  <div> {this.props.author}</div>
              </div>
        );
    }
}

SCBlockPoll.propTypes = {
    name: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired
};

export default SCBlockPoll;
