import * as likesActions from 'redux/actions/entities/likesActions';
import * as modalsActions from 'redux/actions/ui/modalsActions';
import LikeContainer, {mapStateToProps, mergeProps} from '__test__/MainPage/Like';
import {mountWithStore, shallowWithStore, mountWithoutStore} from '../../../shallowWrapper';
import {threeLikesUpdate, threeLikesCommentUpdate} from 'data/likesData';
import configureStore from 'redux/configureStore';
import Like from '__test__/MainPage/Like/Like';
import React from 'react';
import {threeComments} from 'data/commentData';
import {threePosts} from 'data/postData';
import {user} from 'data/userData';

jest.mock('redux/actions/entities/likesActions', () => ({
    getLikeUsers: jest.fn(),
    updateLike: jest.fn(),
    updateLikeCount: jest.fn(),
}));

jest.mock('redux/selectors/entities/likesSelectors', () => ({
    makeGetLikeState: jest.fn(() => jest.fn()),
}));

jest.mock('redux/selectors/entities/userSelectors', () => ({
    getIsSignInState: jest.fn(),
    getCurrentUserFullNameState: jest.fn(),
}));

jest.mock('redux/actions/ui/modalsActions', () => ({
    toggleModal: jest.fn(),
}));

describe('Like', () => {
    let props = {
        like: {},
        profileName: 'Master High',
        likedId: 'abcdf-123-fgt-2',
        likedType: 'Post',
        typeLike: 'liked',
        isDislike: true,
        isSignIn: true,
        intl: {},
        updateLike: jest.fn(),
        getActionUsers: jest.fn(() => Promise.resolve({})),
        updateActionCount: jest.fn(),
    };

    const initialState = {
        entities: {
            posts: {
                hasMore: false,
                posts: threePosts,
            },
            user: {
                info: user,
                isSignIn: true,
            },
            likes: threeLikesUpdate,
        },
        ui: { },
    };
    let store = configureStore(initialState);
    beforeEach(() => {
        store = configureStore(initialState);
    });
    describe('Like Post', () => {
        it('renders without crashing', () => {
            const component = shallowWithStore(<Like {...props} likedId={threePosts[0].id} likedType='Post'/>, store);
            expect(component).toMatchSnapshot();
        });
        it('renders without crashing container', () => {
            const component = shallowWithStore(<LikeContainer {...props} />, store);
            expect(component).toMatchSnapshot();
        });
        it('should render LikeContainer', () => {
            const component = mountWithStore(<LikeContainer {...props} />, store);
            expect(component.find('LikeContainer')).toHaveLength(1);
        });
        it('should render a props likedId', () => {
            const component = mountWithStore(<Like {...props} likedId={threePosts[0].id} likedType='Post'/>, store);
            const likeComponent = component.find('Like');
            expect(likeComponent.prop('likedId')).toEqual(threePosts[0].id);
        });
        it('should render a props likedType', () => {
            const component = mountWithStore(<Like {...props} likedId={threePosts[0].id} likedType='Post'/>, store);
            const likeComponent = component.find('Like');
            expect(likeComponent.prop('likedType')).toEqual('Post');
        });
        it('should render component with class st-like-up if liked', () => {
            props.like = {
                liked: true,
            };
            const component = mountWithStore(<Like {...props} likedId={threePosts[1].id} likedType='Post'/>, store);
            const classLike = component.find('.st-like-up');
            expect(classLike.length).toBe(1);
        });
        it('should render component with class st-like-down if not liked', () => {
            props.like = {
                liked: false,
            };
            const component = mountWithStore(<Like {...props} likedId={threePosts[1].id} likedType='Post'/>, store);
            const classLike = component.find('.st-like-down');
            expect(classLike.length).toBe(1);
        });
        it('should show and hide likeUsers on hover', () => {
            const component = mountWithoutStore(<Like {...props} likedId={threePosts[1].id}
                likedType='Post'/>);
            const thisComponent = component.find('Like');
            component.find('.st-like-post-wrap').last().simulate('mouseEnter');
            setTimeout(() => {
                const LikeUsers = thisComponent.find('UsersDislikeLike');
                expect(LikeUsers.length).toBe(1);
            }, 300);

            component.find('.st-like-post-wrap').last().simulate('mouseLeave');
            const LikeUsers = thisComponent.find('UsersDislikeLike');
            expect(LikeUsers.length).toBe(0);
        });
        it('should call update Like', () => {
            props.like = {liked: true};
            const component = mountWithStore(<Like {...props} likedId={threePosts[1].id} likedType='Post'/>, store);
            const likeBtn = component.find('.st-like-post-wrap').first().simulate('click');
            expect(likeBtn).toHaveLength(1);
            expect(props.like).toBeTruthy();
        });
    });
    describe('Like Comment', () => {
        const initialState = {
            entities: {
                comments: {
                    comments: threeComments,
                    hasMore: true,
                },
                user: {
                    info: user,
                    isSignIn: true,
                },
                likes: threeLikesCommentUpdate,
            },
            ui: {},
        };
        const store = configureStore(initialState);
        it('renders without crashing', () => {
            const component = shallowWithStore(<Like {...props} likedId={threeComments[0].id}
                likedType='Comment'/>, store);
            expect(component).toMatchSnapshot();
        });
        it('should render a props likedId', () => {
            const component = mountWithStore(<Like {...props} likedId={threeComments[0].id}
                likedType='Comment'/>, store);
            const likeComponent = component.find('Like');
            expect(likeComponent.prop('likedId')).toEqual(threeComments[0].id);
        });
        it('should render a props likedType', () => {
            const component = mountWithStore(<Like {...props} likedId={threeComments[0].id}
                likedType='Comment'/>, store);
            const likeComponent = component.find('Like');
            expect(likeComponent.prop('likedType')).toEqual('Comment');
        });
        it('should render component with icon if liked', () => {
            const component = mountWithStore(<Like {...props} like={{liked: true}} likedId={threeComments[0].id}
                likedType='Comment'/>, store);
            const classLike = component.find('.st-comment-like-icon');
            expect(classLike.length).toBe(1);
        });
        it('should render component with class st-like-up if liked', () => {
            const component = mountWithStore(<Like {...props} like={{liked: true}} likedId={threeComments[0].id}
                likedType='Comment'/>, store);
            const classLike = component.find('.st-like-up');
            expect(classLike.length).toBe(0);
        });
        it('should render component with class st-Like-down if not liked but Like another person', () => {
            const component = mountWithStore(<Like {...props} like={{liked: false}} likedId={threeComments[1].id}
                likedType='Comment'/>, store);
            const classLike = component.find('.st-like-down');
            expect(classLike.length).toBe(1);
        });
        it('should render component without icon if not liked', () => {
            const component = mountWithStore(<Like {...props} likedId={threeComments[2].id}
                likedType='Comment'/>, store);
            const classLike = component.find('.st-comment-like-icon');
            expect(classLike.length).toBe(1);
        });
    });

    describe('mapDispatchToProps testing Like', () => {
        const dispatchProps = {dispatch: jest.fn()};
        let stateProps = {isSignIn: true};
        const ownProps = {likedId: 'adF23-vsdf2', likedType: 'Post'};
        const actualValue = mergeProps(stateProps, dispatchProps, ownProps);

        it('testing values of object', () => {
            const valuesOfObj = [
                'isSignIn',
                'likedId',
                'likedType',
                'updateLike',
                'getActionUsers',
                'updateActionCount',
            ];
            expect(Object.keys(actualValue)).toEqual(valuesOfObj);
        });
        it('the dispatch should be called with updateLike', () => {
            actualValue.updateLike();
            expect(dispatchProps.dispatch).toBeCalledWith(likesActions.updateLikeCount());
        });
        it('the dispatch should be called with getLikeUsers', () => {
            actualValue.getActionUsers();
            expect(dispatchProps.dispatch).toBeCalledWith(likesActions.getLikeUsers());
        });
        it('the dispatch should be called with updateActionCount', () => {
            actualValue.updateActionCount();
            expect(dispatchProps.dispatch).toBeCalledWith(likesActions.updateLikeCount());
        });
        it('the dispatch should be called with toggleModal', () => {
            initialState.entities.user.isSignIn = false;
            actualValue.updateLike();
            expect(dispatchProps.dispatch).toBeCalledWith(modalsActions.toggleModal());
        });
    });
    describe('mapStateToProps testing Like', () => {
        it('testing values of object', () => {
            const valuesOfObj = ['like', 'isSignIn', 'profileName'];
            const initialState = {};
            const mapState = mapStateToProps();
            expect(Object.keys(mapState(initialState, {}))).toEqual(valuesOfObj);
        });
    });
});
