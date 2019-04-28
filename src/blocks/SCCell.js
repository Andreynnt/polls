import React from 'react';
import PropTypes from 'prop-types';
import SCBlockPoll from "./SCBlockPoll";
import '../css/separatorForCell.css';

class SCCell extends React.Component {
    render() {

        const cellStyle = {
            paddingBottom: "7px",
            background: "var(--background_page)",
        };

        const twoBLocksStyle= {
            display: "flex"
        };

        let blocks = this.props.blocks.map((item, i) => {
            return <SCBlockPoll name={item.name} author={item.author} action={() => item.action()} key={i} position={i}/>
        });

        return (
            <div style={cellStyle}>
                <div style={twoBLocksStyle}>
                    {blocks}
                </div>
            </div>
        )

        // return (
        //     <Cell key={this.props.i}
        //           data-to="poll"
        //           size="l"
        //           style={cellStyle}
        //           bottomContent={
        //               <div style={twoBLocksStyle}>
        //                   {blocks}
        //               </div>
        //           }
        //     />
        // );
    }
}

SCCell.propTypes = {
    blocks: PropTypes.array.isRequired,
};

export default SCCell;
