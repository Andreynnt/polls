import React from 'react';
import PropTypes from 'prop-types';
import { List } from '@vkontakte/vkui';

class SCList extends React.Component {
    render() {
        return (
            <List>
                {this.props.cells}
            </List>
        );
    }
}

SCList.propTypes = {
    cells: PropTypes.arrayOf(PropTypes.node)
};

export default SCList;
