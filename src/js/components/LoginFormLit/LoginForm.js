import { getAPIData, API_PORT } from '../../index.js';
import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';
// @ ts-expect-error TS doesn't like this
import ResetCSS from '../../../css/reset.css' with { type: 'css' }
// @ ts-expect-error TS doesn't like this
import AppCSS from '../../../css/styles.css' with { type: 'css' }
// @ ts-expect-error TS doesn't like this
import LoginFormCSS from '../LoginForm/LoginForm.css' with { type: 'css' }

export class LoginForm extends LitElement {
  static styles = [ResetCSS, AppCSS, LoginFormCSS];

  static properties = {
    email: {type: String},
    password: {type: String}
  };

  constructor() {
    super();
  }

  render() {
    return html`
    <slot></slot>
    <form id="loginForm" @submit="${this._onFormSubmit}">
      <label>Usuario: <input type="text" id="email" placeholder="email" .value=${this.email} @input="${this._emailChanged}" /></label>
      <label>Contraseña: <input type="password" id="password" placeholder="contraseña" .value=${this.password} @input="${this._passwordChanged}" /></label>
      <button type="submit" id="loginButton" title="Login" ?disabled=${this.email === '' || this.password === ''}>Login</button>
      <slot name="error"></slot>
    </form>
    `;
  }

  // Property binding methods
  _emailChanged(e) {
    this.email = e.target.value
  }

  _passwordChanged(e) {
    this.password = e.target.value
  }

  // Event listeners
  async _onFormSubmit(e) {
    e.preventDefault();
    // Prevent autofill problems
    const emailElement = this.renderRoot.querySelector('#email')
    const passwordElement = this.renderRoot.querySelector('#password')
    const email = this.email || emailElement.value;
    const password = this.password || passwordElement.value;
    const loginData = {
      email,
      password
    }
    let onFormSubmitEvent
    if (loginData.email !== '' && loginData.password !== '') {
      const payload = JSON.stringify(loginData)
      let apiData = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/login`, 'POST', payload)
      if (!apiData) {
        apiData = {
          detail: {
            text: 'No he encontrado el usuario o la contraseña'
          }
        }
      }
      onFormSubmitEvent = new CustomEvent("login-form-submit", {
        bubbles: true,
        detail: apiData
      })
    } else {
      onFormSubmitEvent = new CustomEvent("login-form-submit", {
        bubbles: true,
        detail: {
          text: 'No he encontrado el usuario o la contraseña'
        }
      })
    }

    this.dispatchEvent(onFormSubmitEvent);
  }
}

customElements.define('login-form', LoginForm);