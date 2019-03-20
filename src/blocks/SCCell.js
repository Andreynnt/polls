import React from 'react';
import PropTypes from 'prop-types';
import { Cell } from '@vkontakte/vkui';
import SCBlockPoll from "./SCBlockPoll";


class SCCell extends React.Component {
    render() {

        const cellStyle = {
            height: "200px",
            background: "var(--background_page)"
        };

        const twoBLocksStyle= {
            display: "flex"
        };

        let blocks = this.props.blocks.map((item, i) => {
            return <SCBlockPoll name={item.name} author={item.author} action={() => item.action()} key={i}/>
        });

        return (
            <Cell key={this.props.i}
                  data-to="poll"
                  size="l"
                  style={cellStyle}
                  bottomContent={
                      <div style={twoBLocksStyle}>
                          {blocks}
                      </div>
                  }
            />
        );
    }
}

SCCell.propTypes = {
    blocks: PropTypes.array.isRequired,
};

export default SCCell;
