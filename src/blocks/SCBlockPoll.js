import React from 'react';
import PropTypes from 'prop-types';
import * as AppService from "../services/AppService";

class SCBlockPoll extends React.Component {
    render() {

        const width = "45vw";
        const borderRadius = '12px 12px 0px 0px';

        const divStyle = {
            height: "32vh",
            width: width,
            marginRight: "5px",
            marginLeft: "3px",
            borderRadius: "12px",
            backgroundColor: "white"
        };

        const imageStyle = {
            backgroundColor: "#fff5cc",
            borderRadius: borderRadius,
            height: "23vh",
            width: width,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        };

        const nameStyle = {
            marginTop: "5px",
            marginLeft: "4px",
            marginRight: "4px",
            textOverflow: "ellipsis",
            overflow: "hidden",
            fontSize: "16px"
        };

        const authorStyle = {
            textOverflow: "ellipsis",
            overflow: "hidden",
            color: "grey",
            marginLeft: "4px",
            marginRight: "4px",
            fontSize: "14px"
        };

        const emptyPhoto = {
            fontSize: "20px"
        };

        return (
              <div style={divStyle} onClick={() => {this.props.action()}}>
                  <div style={imageStyle}>
                      <div style={emptyPhoto}>Нет фото</div>
                  </div>
                  <div>
                     <div style={nameStyle}> {this.props.name}</div>
                     <div style={authorStyle}> {this.props.author}</div>
                  </div>
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
