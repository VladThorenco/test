import './UsersDislikeLike.scss';
import React, {useEffect} from 'react';
import _filter from 'lodash/filter';
import {injectIntl} from 'react-intl';
import PropTypes from 'prop-types';

const propTypes = {
    /* passed props */
    setLikeData: PropTypes.func.isRequired,
    like: PropTypes.object,
    likeData: PropTypes.object,
    profileName: PropTypes.string,
    actionName: PropTypes.string,
    /* from injectIntl */
    intl: PropTypes.object.isRequired,
};

const UsersDislikeLike = (props) => {
    const {like, typeLike, profileName, likeData, intl, actionName, setLikeData} = props;
    const count = likeData && (actionName === 'dislike' ? likeData.count_dislikes : likeData.count_likes);

    const deleteUser = () => {
        if (like[typeLike] === false) {
            const newLikesName = _filter(likeData.likes_names, name => name !== profileName);
            const likeDataNames = {...likeData};
            likeDataNames.likes_names = newLikesName;
            setLikeData(likeDataNames);
        }
    };

    useEffect(() => {
        deleteUser();
    }, [like[typeLike]]);

    return (likeData !== null ? <div>
        {likeData.likes_names && <div className="st-like-users-wrap">
            <div className="st-like-users-arrow-top invisible"/>
            <div className="st-like-users-names-wrap d-flex flex-column align-items-center">
                {likeData.likes_names.map((name) =>
                    <span key={name} className="st-like-users-name"
                        data-test="st-like-users-name">{name}</span>)}
                <span className="st-like-users-name">
                    {count > 10
                        ? `${intl.formatMessage({id: 'post.likeUsersMore'})} ${count - 10}`
                        : null}
                </span>
            </div>
            <div className="st-like-users-arrow-bottom"/>
        </div>}
    </div> : null);
};

UsersDislikeLike.propTypes = propTypes;

export default injectIntl(UsersDislikeLike);
