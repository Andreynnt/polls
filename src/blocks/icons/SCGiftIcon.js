import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGift } from '@fortawesome/free-solid-svg-icons'


library.add(faGift);


class SCGiftIcon extends React.Component {
    render() {

        const style = {
            color: "#BDBDBD",
            marginBottom: "10px",
            alignSelf: "center"
        };

        return (
            <FontAwesomeIcon style={style} size='7x' icon="gift" />
        );
    }
}

export default SCGiftIcon;
