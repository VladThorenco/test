import './MainLikeDislike.scss';
import Like from '__test__/MainPage/Like';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    /* passed props */
    likedId: PropTypes.string.isRequired,
    likedType: PropTypes.string.isRequired,
};

const MainLikeDislike = (props) => {
    const {likedId, likedType } = props;
    return (
        <div className="container_likes">
            <Like
                likedId={likedId}
                likedType={likedType}
                isDislike={false}
                typeLike='liked'
                typeCount='likes_count'
                actionName='like'
            />
            <Like
                likedId={likedId}
                likedType={likedType}
                isDislike={true}
                typeLike='disliked'
                typeCount='dislikes_count'
                actionName='dislike'
            />
        </div>
    );
};

MainLikeDislike.propTypes = propTypes;

export default MainLikeDislike;
