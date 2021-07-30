import PropTypes from 'prop-types';
import React from 'react';
import UsersDislikeLike from './UsersDislikeLike';

const propTypes = {
    actionName: PropTypes.oneOf(['dislike', 'like']),
    likeData: PropTypes.object,
};

export const UsersDislikeLikeContainer = (props) => <UsersDislikeLike {...props} />;

UsersDislikeLikeContainer.propTypes = propTypes;

export default UsersDislikeLikeContainer;
