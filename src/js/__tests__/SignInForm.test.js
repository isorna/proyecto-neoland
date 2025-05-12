/* eslint-disable no-undef */
import { expect, jest } from '@jest/globals';

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

  // Test component DOM insertion
  it('should insert form on document', async () => {
    const signInForm = createElement('signin-form-lit');
    // Importante: ESPERAR al updateComplete para acceder al shadowRoot
    await signInForm.updateComplete;
    const boton = document.body.querySelector('signin-form-lit')
      .renderRoot.querySelector('button[type="button"]');
    // Comprobamos que el botón existe en el DOM virtual
    expect(boton).toBeTruthy();
    expect(boton).toBeInstanceOf(HTMLButtonElement);
    expect(boton.textContent).toBe('MOSTRAR FORM WC');
    removeElement(signInForm);
  });

  // Test click on button
  it('should call _mostrarFormularioWebComponents when button is clicked', async () => {
    const signInForm = createElement('signin-form-lit');
    signInForm._mostrarFormularioWebComponents = jest.fn();
    // Importante: ESPERAR al updateComplete para acceder al shadowRoot
    await signInForm.updateComplete;
    const boton = document.body.querySelector('signin-form-lit')
      .renderRoot.querySelector('button[type="button"]');
    // Comprobamos que el botón ejecuta la función al ser clickado
    boton.click();
    expect(signInForm._mostrarFormularioWebComponents).toHaveBeenCalled();
    removeElement(signInForm);
  })
});

function createElement(tagName) {
  const element = document.createElement(tagName);
  document.body.appendChild(element);
  return element;
}

function removeElement(element) {
  document.body.removeChild(element);
}