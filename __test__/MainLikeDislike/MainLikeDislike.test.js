import {shallowWithoutStore, mountWithoutStore} from '../../../shallowWrapper';
import MainLikeDislike from '__test__/MainPage/MainLikeDislike';
import React from 'react';
import {threePosts} from 'data/postData';

jest.mock('__test__/MainPage/Like', () => () => <div id="Like"/>);

describe('MainLikeDislike', () => {
    const props = {
        likedId: 'abcdf-123-fgt-2',
        likedType: 'Post',
    };

    it('renders without crashing', () => {
        const component = shallowWithoutStore(<MainLikeDislike {...props} likedId={threePosts[0].id} likedType='Post'/>);
        expect(component).toMatchSnapshot();
    });

    it('renders component Like', () => {
        const component = mountWithoutStore(<MainLikeDislike {...props} likedId={threePosts[0].id} likedType='Post'/>);
        const thisComponent = component.find('MainLikeDislike').find('#Like');
        expect(thisComponent).toHaveLength(2);
    });
});
