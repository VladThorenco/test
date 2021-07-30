import {getIsSignInState, getCurrentUserFullNameState} from 'redux/selectors/entities/userSelectors';
import {getLikeUsers, updateLike, updateLikeCount} from 'redux/actions/entities/likesActions';
import {connect} from 'react-redux';
import Like from './Like';
import {makeGetLikeState} from 'redux/selectors/entities/likesSelectors';
import {MODAL_TYPES} from 'constants/modalsConstants';
import PropTypes from 'prop-types';
import React from 'react';
import {toggleModal} from 'redux/actions/ui/modalsActions';

const propTypes = {
    /* passed props */
    like: PropTypes.object,
    profileName: PropTypes.string,
    isSignIn: PropTypes.bool.isRequired,
    likedId: PropTypes.string.isRequired,
    likedType: PropTypes.string.isRequired,
    /* from connect */
    updateLike: PropTypes.func.isRequired,
    getActionUsers: PropTypes.func.isRequired,
    updateActionCount: PropTypes.func.isRequired,
};

const LikeContainer = (props) => {
    return <Like {...props} />;
};

LikeContainer.propTypes = propTypes;

export const mapStateToProps = () => {
    const getLikeState = makeGetLikeState();
    return (state, ownProps) => {
        return {
            like: getLikeState(state, ownProps),
            isSignIn: getIsSignInState(state),
            profileName: getCurrentUserFullNameState(state),
        };
    };
};

export const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const {isSignIn} = stateProps;
    const {dispatch} = dispatchProps;
    const {likedId, likedType} = ownProps;
    return {
        ...stateProps,
        ...ownProps,
        updateLike: (isDislike) => {
            if (isSignIn) {
                dispatch(updateLike(likedId, likedType, {is_dislike: isDislike}));
            } else {
                dispatch(toggleModal(MODAL_TYPES.AUTHORIZE_SINGLE_POST));
            }
        },
        getActionUsers: (likedId, likedType, isDislike) => dispatch(getLikeUsers(likedId, likedType, isDislike)),
        updateActionCount: data => dispatch(updateLikeCount(data)),
    };
};

export default connect(mapStateToProps, null, mergeProps)(LikeContainer);
