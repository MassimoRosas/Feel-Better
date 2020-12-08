import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Login from 'src/components/Login';
import { updateLoginField, submitLogin } from 'src/actions/authentification';

describe('<Login />', () => {
  it('uses email given as props', () => {
    // Simulate Login component
    const wrapper = shallow(<Login email="nicole@test.fr" password="test" updateField={updateLoginField} submitLogin={submitLogin} isLogged={false} errors={[]} />);
    // Find input in the component
    const inputEmail = wrapper.find('#email');
    // Test if there is only one input email
    expect(inputEmail).to.have.lengthOf(1);
    // Test if the value of the input corresponds to what we expect
    expect(inputEmail.props()).to.have.property('value', 'nicole@test.fr');
  });
  it('uses password given as props', () => {
    const wrapper = shallow(<Login email="nicole@test.fr" password="test" updateField={updateLoginField} submitLogin={submitLogin} isLogged={false} errors={[]} />);
    const inputPassword = wrapper.find('#password');
    expect(inputPassword).to.have.lengthOf(1);
    expect(inputPassword.props()).to.have.property('value', 'test');
  });
  it('updateLoginField is a function', () => {
    // Test if updateLoginField is a function
    expect(updateLoginField).to.be.a('function');
  });
  it('submitLogin is a function', () => {
    // Test if submitLogin is a function
    expect(submitLogin).to.be.a('function');
  });
});
