import React from 'react';
import { shallow } from 'enzyme';
import RandomChar from './randomChar';

describe('Testing <RandomChar/>', () => {
  const char = shallow(<RandomChar />);
  describe('Testing snap & state', () => {
    it('RandomChar have rendered correctly', () => {
      expect(char).toMatchSnapshot();
    });
    it('RandomChar state "char" is empty object', () => {
      expect(char.state().char).toBeObject();
    });
    it('RandomChar state "loading" is true', () => {
      expect(char.state().loading).toBeTruthy();
    });
    it('RandomChar state "error" is false', () => {
      expect(char.state().error).toBeFalsy();
    });
  });
  describe('Handlers tests', () => {
    it('testing on CharLoaded', () => {
      char.instance().onCharLoaded();
      expect(char.state().loading).toBeFalsy();
    });
    it('testing onError', () => {
      char.instance().onError();
      expect(char.state().loading).toBeFalsy();
      expect(char.state().error).toBeTruthy();
    });
    it('testing on updateChar', () => {
      char.instance().updateChar();
      expect(char.state().loading).toBeFalsy();
    });
  });
});
