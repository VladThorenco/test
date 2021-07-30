import './Like.scss';
import {FormattedMessage, injectIntl} from 'react-intl';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import UsersDislikeLike from '__test__/MainPage/UsersDislikeLike';

const propTypes = {
    like: PropTypes.object.isRequired,
    profileName: PropTypes.string.isRequired,
    isDislike: PropTypes.bool.isRequired,
    likedId: PropTypes.string.isRequired,
    isSignIn: PropTypes.bool.isRequired,
    likedType: PropTypes.string.isRequired,
    /* from injectIntl */
    intl: PropTypes.object.isRequired,
    /* from connect */
    updateLike: PropTypes.func.isRequired,
    getActionUsers: PropTypes.func.isRequired,
    updateActionCount: PropTypes.func.isRequired,
};

const Like = (props) => {
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [likeData, setLikeData] = useState(null);
    let userPreviewTimer;
    const {
        actionName, like, isSignIn,
        likedType, typeLike, typeCount,
        intl, isDislike, likedId,
        updateLike, getActionUsers, updateActionCount,
        profileName,
    } = props;

    const getLikesUsers = () => getActionUsers(likedId, likedType, isDislike).then((data) => {
        setLikeData(data);
        updateActionCount(data);
    });

    const handleMouseEnterLikeUsers = () => {
        if (likeData === null) getLikesUsers();
        userPreviewTimer = setTimeout(() => {
            setPopoverOpen(true);
        }, 10);
    };

    const handleMouseLeaveLikeUsers = () => {
        clearInterval(userPreviewTimer);
        userPreviewTimer = null;
        setPopoverOpen(false);
    };

    const handleUpdateLike = () => {
        updateLike(isDislike);
        setTimeout(() => {
            getLikesUsers();
        }, 300);
    };

    const setClassLike = () => {
        let likedClass = '';
        if ((typeLike === 'disliked' && like[typeLike]) || (typeLike === 'liked' && like[typeLike])) {
            likedClass = 'st-like-up';
        } else {
            likedClass = 'st-like-down';
        }
        return likedClass;
    };

    const likeCounts = like && (like[typeCount] > 999 ? Math.floor(like[typeCount] / 1000) + 'K' : like[typeCount]);
    const rotateIcon = isDislike ? 'st-like-rotate' : '';
    return (
        <div>
            {like && isSignIn && popoverOpen && likeData !== null &&
            <div className="st-like-users">
                <UsersDislikeLike
                    actionName={actionName}
                    likeData={likeData}
                    typeLike={typeLike}
                    profileName={profileName}
                    like={like}
                    setLikeData={setLikeData}/>
            </div>}
            {likedType === 'Post'
                ? <div className="st-like-post-wrap" title={intl.formatMessage({id: 'post.like'})}
                    onClick={handleUpdateLike} onMouseLeave={handleMouseLeaveLikeUsers}
                    onMouseEnter={handleMouseEnterLikeUsers}>
                    <svg className={`${rotateIcon} ${setClassLike()}`} height="24" viewBox="0 0 24 24" width="24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path
                            d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"/>
                    </svg>
                    <span dir="ltr" className="st-like-counts">{like[typeCount] ? likeCounts : 0}</span>
                </div>
                : <div className='st-comment-like-wrap' onClick={handleUpdateLike}
                    onMouseLeave={handleMouseLeaveLikeUsers} onMouseEnter={handleMouseEnterLikeUsers}>
                    <span dir="ltr" className='st-comment-like-title'><FormattedMessage id="post.like"/></span>
                    {like && like[typeCount] !== 0 &&
                    <div className='st-comment-like-icon'>
                        <svg className={`st-like-down`} height="12" viewBox="0 0 24 24" width="12"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path
                                d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"/>
                        </svg>
                        {likeCounts}
                    </div>}
                </div>}
        </div>
    );
};

Like.propTypes = propTypes;

export default injectIntl(Like);
