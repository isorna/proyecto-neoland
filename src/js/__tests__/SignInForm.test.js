/* eslint-disable no-undef */
// Tests for the SignInForm component

import { SignInFormLit } from '../components/SignInFormLit/SignInForm.js';

// jest.useFakeTimers()

describe.only('SignInForm', () => {
  // const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  // // Give time to any async operation to complete after each test
  // afterEach(async () => {
  //   await sleep(2000);
  // });

  // Test component creation
  it('should create a new instance of SignInForm', () => {
    const signInForm = new SignInFormLit();
    expect(signInForm).toBeInstanceOf(SignInFormLit);
  });
});