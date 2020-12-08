import { expect } from 'chai';

import reducerAuth from 'src/reducers/authentification';
import { submitLogin, updateAvatarMood } from 'src/actions/authentification';

describe('reducer for authentification', () => {
  it('is a function', () => {
    expect(reducerAuth).to.be.a('function');
  });
  it('returns initial state', () => {
    const initialState = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirm_password: '',
      city: '',
      birthday: '',
      avatar: '',
      data: {},
      errorData: [],
      // Bool that show success notification on profile form
      successProfile: false,
      // Determine if user is connected
      isLogged: false,
      // Display loader while doing API request
      isLoading: true,
      // User's avatar mood
      avatarMood: '',
      // User's avatar type
      avatarType: '',
      // User's avatar color
      avatarColor: '',
    };

    expect(reducerAuth()).to.deep.equal(initialState);

    // Test if property isLoading in the initialState is true
    // eslint-disable-next-line no-unused-expressions
    expect(initialState.isLoading).to.be.true;
  });
  it('handles action SUBMIT_LOGIN', () => {
    const stateBefore = {
      firstname: '',
      lastname: '',
      email: 'nicole@test.fr',
      password: 'test',
      confirm_password: '',
      city: '',
      birthday: '',
      avatar: '',
      data: {},
      errorData: [],
      successProfile: false,
      isLogged: false,
      isLoading: true,
      avatarMood: '',
      avatarType: '',
      avatarColor: '',
    };

    // Defines action creator for reducer
    const action = submitLogin();

    // Email and password should be empty after submit Login
    const expectedResult = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirm_password: '',
      city: '',
      birthday: '',
      avatar: '',
      data: {},
      errorData: [],
      successProfile: false,
      isLogged: false,
      isLoading: true,
      avatarMood: '',
      avatarType: '',
      avatarColor: '',
    };

    expect(reducerAuth(stateBefore, action)).to.deep.equal(expectedResult);
  });
  it('handles action updateAvatarMood', () => {
    const stateBefore = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirm_password: '',
      city: '',
      birthday: '',
      avatar: '',
      data: {},
      errorData: [],
      successProfile: false,
      isLogged: false,
      isLoading: true,
      avatarMood: '',
      avatarType: '',
      avatarColor: '',
    };

    const action = updateAvatarMood('sad');

    const expectedResult = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirm_password: '',
      city: '',
      birthday: '',
      avatar: '',
      data: {},
      errorData: [],
      successProfile: false,
      isLogged: false,
      isLoading: true,
      avatarMood: 'sad',
      avatarType: '',
      avatarColor: '',
    };
    expect(reducerAuth(stateBefore, action)).to.deep.equal(expectedResult);
  });
});
