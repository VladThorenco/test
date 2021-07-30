import api from 'configApi/apiResources';

export const UPDATE_LIKE_SUCCESS = 'UPDATE_LIKE_SUCCESS';
export const GET_LIKE = 'GET_LIKE';
export const UPDATE_LIKE_COUNT = 'UPDATE_LIKE_COUNT';

export function updateLike (likedId, likedType, body) {
    return (dispatch) => {
        return api.likes.updateLike(likedId, likedType, body)
            .then(({ error, data }) => {
                if (!error && data) {
                    dispatch(updateLikeSuccess({
                        likedId,
                        likedType,
                        likes_count: data.count_likes,
                        dislikes_count: data.count_dislikes,
                        liked: data.liked,
                        disliked: data.disliked,
                    }));
                }
            });
    };
}

export function getLikeUsers (postId, likedType, isDislike = false) {
    return () => {
        return api.likes.getLikeNames(postId, likedType, { is_dislike: isDislike })
            .then(({ error, data }) => {
                if (!error && data) {
                    return Promise.resolve(data);
                }
            });
    };
}

export function updateLikeSuccess (data) {
    return {type: UPDATE_LIKE_SUCCESS, payload: data};
}

export function getLike (data) {
    return {type: GET_LIKE, payload: data};
}

export function updateLikeCount (data) {
    const dataUpdate = {
        dislikes_count: data.count_dislikes,
        likes_count: data.count_likes,
        likedId: data.liked_id,
    };
    return {type: UPDATE_LIKE_COUNT, payload: dataUpdate};
}
