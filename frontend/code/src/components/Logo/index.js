import PropTypes from 'prop-types';

// project import
import Logo from './Logo';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
    <Logo />
);

LogoSection.propTypes = {
    sx: PropTypes.object,
    to: PropTypes.string
};

export default LogoSection;
