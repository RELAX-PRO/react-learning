import React from 'react'; 
import PropTypes from 'prop-types'; // 1. Importing the security guard!

// 2. The Functional Component definition:
const UserBadge = ({userName, userCount, role, contactInfo}) => {
    return(<div>{userName}</div>)}

UserBadge.propTypes = {
    userName: PropTypes.string.isRequired,
    loginCount: PropTypes.number,
    role: PropTypes.oneOf(["admin", "editor", "viewer"]),
    contactInfo: PropTypes.shape({
        email: PropTypes.string.isRequired,
    })
}
