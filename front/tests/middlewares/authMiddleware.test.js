import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { expect } from 'chai';
import sinon from 'sinon';

import authMiddleware from 'src/middlewares/authMiddleware';
import { logIn, CONNECT_USER } from 'src/actions/authentification';

// const storageMock = () => {
//   let store = {};
//   return {
//     getItem: function(key) {
//       return store[key] || null,
//     },
//     setItem: function(key, value) {
//       store[key] = value.toString(),
//     },
//     removeItem: function(key) {
//       delete store[key],
//     },
//     clear: function() {
//       store = {},
//     },
//   };
// };

// const middlewares = [thunk];

// const mockStore = configureMockStore(middlewares);

// let store;
// let url;

// describe('middleware for authentification', () => {
//   beforeEach(() => {
//     moxios.install();
//     store = mockStore({});
//     url = 'http://3.89.193.249/api/v1';
//   });

//   afterEach(() => {
//     moxios.uninstall();
//   });

//   describe('Log in', () => {
//     it('gets user datas', () => {
//       moxios.stubRequest(`${url}/login`, {
//         status: 200,
//         data: {
//           logged: true,
//           satisfaction: true,
//           user: {
//             id: 1,
//             email: 'nicole@test.fr',
//             firstname: 'Nicole',
//             lastname: 'Truc',
//             role: ['ROLE_USER'],
//             birthday: '1990-01-01',
//             city: 'Test',
//             avatar: {
//               type: 'cat',
//               mood: 'sad',
//               color: '#F0FF0F',
//             },
//             token: 'ddqdqzdqzudqhzdkuqhdkqhd',
//           },
//         },
//       });

//       const expectedAction = CONNECT_USER;
//       const testData = { email: 'Nicole@test.fr', password: 'test' };
//       return store.dispatch(logIn(testData)).then(() => {
//         const actualAction = store.getActions();
//         expect(actualAction[0]).to.eql(expectedAction);
//       });
//     });
//   });

//   it('should dispatch custom action', () => {
//     // const clock = sinon.useFakeTimers();
//     // const fakeStore = { dispatch: sinon.spy() };
//     // const fakeNext = sinon.spy();
//     // const fakeAction = {
//     //   type: LOG_IN,
//     // };

//     // authMiddleware(fakeStore)(fakeNext)(fakeAction);
//     // clock.tick(99000);

//     // expect(fakeStore.dispatch.calledOnce).to.equal(true);
//   });
// });
