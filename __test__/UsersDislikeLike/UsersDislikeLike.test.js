import {mountWithStore, shallowWithStore} from '../../../shallowWrapper';
import configureStore from 'redux/configureStore';
import React from 'react';
import UsersDislikeLike from '__test__/MainPage/UsersDislikeLike/UsersDislikeLike';
import { UsersDislikeLikeContainer} from '__test__/MainPage/UsersDislikeLike';

describe('UsersDislikeLike', () => {
    const props = {
        likeData: {},
        like: {},
        actionType: 'dislike',
        typeLike: 'dislike',
        actionId: 'dislike',
        profileName: 'Master High',
        actionName: 'dislike',
        setLikeData: jest.fn(),
    };
    const initialState = { entities: {}, ui: {} };
    const store = configureStore(initialState);
    it('renders without crashing', () => {
        const component = shallowWithStore(<UsersDislikeLike {...props} />, store);
        expect(component).toMatchSnapshot();
    });
    it('testing UsersDislikeLikeContainer', () => {
        const component = mountWithStore(<UsersDislikeLikeContainer {...props} />, store);
        const findComponent = component.find('UsersDislikeLike');
        expect(findComponent).toHaveLength(1);
    });
    it('testing deleteUser calls in UseEffect', () => {
        props.like = {
            dislike: false,
        };
        mountWithStore(<UsersDislikeLike {...props} />, store);
        expect(props.setLikeData).toHaveBeenCalledTimes(1);
    });
    it('Testing are names in popup', () => {
        props.likeData = {
            likes_names: ['andrey', 'vlad'],
        };
        const component = mountWithStore(<UsersDislikeLike {...props} />, store);
        const findComponent = component.find('UsersDislikeLike');
        const items = findComponent.find('[data-test="st-like-users-name"]');
        expect(items).toHaveLength(2);
    });
});
