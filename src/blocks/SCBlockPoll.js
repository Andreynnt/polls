import React from 'react';
import PropTypes from 'prop-types';
import Ratio from "react-ratio";
import * as AppService from "../services/AppService";


class SCBlockPoll extends React.Component {
    render() {

        const width = "47vw";
        const borderRadius = '12px 12px 12px 12px';
        //width * 2 + (margin * 3) = 100
        const rightMargin = this.props.position === 0 ? "1vw" : "2vw";
        const leftMargin = this.props.position === 0 ? "2vw" : "1vw";

        const divStyle = {
            width: width,
            marginRight: rightMargin,
            marginLeft: leftMargin,
            borderRadius: "12px"
        };

        const imageWrapper = {
            height: "100%",
            borderRadius: borderRadius,
            backgroundImage: "url(" + AppService.shared().pathToImages() + "spitz.jpg" + ")",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "50% 50%",
            display: "flex",
        };

        const textStyle = {
            fontSize: "18px",
            color: "white",
            alignSelf: "flex-end",
            fontWeight: "bold",
            marginLeft: "8px",
            marginRight: "8px",
            marginTop: "5px",
            marginBottom: "5px",
            overflow: "hidden"
        };

        return (
              <div style={divStyle} onClick={() => {this.props.action()}}>
                  <Ratio ratio={9/9}>
                      <div style={imageWrapper}>
                          <div style={textStyle}>{this.props.name}</div>
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
