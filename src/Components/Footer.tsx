import './styles/Footer.scss';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <div className="footer">
            <span className={'year'}>
                {`© ${year} Chicago Public Schools`}
            </span>
        </div>
    );
};

export default Footer;