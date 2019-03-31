import React from 'react';
import PropTypes from 'prop-types';
import Ratio from "react-ratio";
import * as AppService from "../services/AppService";


class SCBlockPoll extends React.Component {
    render() {

        const width = "47vw";
        const borderRadius = '12px 12px 0px 0px';
        //width * 2 + (margin * 3) = 100
        const rightMargin = this.props.position === 0 ? "1vw" : "2vw";
        const leftMargin = this.props.position === 0 ? "2vw" : "1vw";

        const divStyle = {
            width: width,
            marginRight: rightMargin,
            marginLeft: leftMargin,
            borderRadius: "12px",
            backgroundColor: "white"
        };

        const imageStyle = {
            backgroundColor: "#fff5cc",
            borderRadius: borderRadius,
            height: "70%",
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

        const imageWrapper = {
            height: "70%",
            borderRadius: borderRadius,
            backgroundImage: "url(" + AppService.shared().pathToImages() + "pug2.jpg" + ")",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "50% 50%"
        };

        return (
              <div style={divStyle} onClick={() => {this.props.action()}}>
                  <Ratio ratio={9/10}>
                      <div style={imageWrapper}>

                      </div>
                      <div>
                         <div style={nameStyle}> {this.props.name}</div>
                         <div style={authorStyle}> {this.props.author}</div>
                      </div>
                  </Ratio>
              </div>
        );
    }
}

SCBlockPoll.propTypes = {
    name: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
    position: PropTypes.number.isRequired
};

export default SCBlockPoll;
