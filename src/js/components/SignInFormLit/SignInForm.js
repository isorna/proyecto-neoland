// Si no usamos el Starter Kit:
import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';
import { getAPIData, getInputValue, API_PORT } from '../../index.js';
// Si usamos el Starter Kit:
// import { LitElement, html } from 'lit';
// @ ts-expect-error TS doesn't like this
import ResetCSS from '../../../css/reset.css' with { type: 'css' }
// @ ts-expect-error TS doesn't like this
import AppCSS from '../../../css/styles.css' with { type: 'css' }
// @ ts-expect-error TS doesn't like this
import SignInFormCSS from './../SignInForm/SignInForm.css' with { type: 'css' }

export class SignInFormLit extends LitElement {
  static styles = [ResetCSS, AppCSS, SignInFormCSS];

  render() {
    return html`
      <form id="signInForm" @submit="${this._onFormSubmit}">
        <slot></slot>
        <p id="infoMessage">Registro del usuario</p>
        <input type="text" id="name" placeholder="Nombre de usuario" required>
        <input type="email" id="email" placeholder="Email" required>
        <button type="submit">Sign In</button>
      </form>
    `;
  }

  // Private Methods
  async _onFormSubmit(event) {
    event.preventDefault();
    const name = this.renderRoot.getElementById("name");
    const email = this.renderRoot.getElementById("email");
    const signInData = {
      name: getInputValue(name),
      email: getInputValue(email)
    }

    console.log(`DESDE DENTRO DEL COMPONENTE Name: ${signInData.name}, Email: ${signInData.email}`);

    if (signInData.email !== '' && signInData.password !== '') {
      const payload = JSON.stringify(signInData)
      const apiData = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/login`, 'POST', payload)
      console.log(apiData)
      // onFormSubmitEvent = new CustomEvent("login-form-submit", {
      //   bubbles: true,
      //   detail: apiData
      // })
    } else {
      console.error('No hay datos')
      // onFormSubmitEvent = new CustomEvent("login-form-submit", {
      //   bubbles: true,
      //   detail: null
      // })
    }
  }
}
customElements.define('signin-form-lit', SignInFormLit);