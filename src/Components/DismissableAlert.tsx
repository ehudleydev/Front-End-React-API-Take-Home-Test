import React from 'react';

import Alert from 'react-bootstrap/Alert';
import './styles/DismissableAlert.scss';

interface Props {
    messageStr: string;
}

const DismissableAlert:React.FC<Props> = ({ messageStr }: Props) => {
    const messageNode = (<span>{messageStr}</span>)
    const [show, setShow] = React.useState(true);

    return (
        <Alert className='dissmissableAlert' variant={'warning'} onClose={() => setShow(false)} dismissible>{messageNode}</Alert>
    );
};

export default DismissableAlert;