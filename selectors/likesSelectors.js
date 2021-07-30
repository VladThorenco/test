import { createSelector } from 'reselect';
// selector
const getLikesState = (state) => state.entities.likes;
// reselect function
export const makeGetLikeState = () => createSelector(
    getLikesState,
    (state, props) => props.likedId,
    (likes, likedId) => likes[likedId],
);
