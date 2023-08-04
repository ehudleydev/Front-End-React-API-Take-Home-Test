import Spinner from 'react-bootstrap/Spinner';

const LoadingSpinner = () => {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column'
        }}>
            <Spinner style={{alignSelf:'center'}} animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
};

export default LoadingSpinner;