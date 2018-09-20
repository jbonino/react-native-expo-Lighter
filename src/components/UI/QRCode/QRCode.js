import React from 'react';
import QRCode from 'react-native-qrcode';

const QRCode = (props) => {
    return <QRCode
        value={props.value}
        size={200}
        bgColor='purple'
        fgColor='white' />
};


export default componentName;
