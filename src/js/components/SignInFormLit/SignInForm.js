// Si no usamos el Starter Kit:
import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';
// import { getAPIData, getInputValue, API_PORT } from '../../index.js';
import { getAPIData, API_PORT } from '../../index.js';
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

  // API de propiedades del componente
  static properties = {
    // Propiedad reactiva y pública por medio de un atributo HTML
    info: { type: String },
    lista: { type: Array },
    name: { type: String },
    email: { type: String },
    // Propiedad privada (estado)
    _loginAttempts: { type: Number, state: true }
  }

  constructor() {
    super();
    this.info = 'Registro del usuario';
    this.lista = [];
    this.name = '';
    this.email = '';
    this._loginAttempts = 0;
  }

  render() {
    return html`
      <form id="signInForm" @submit="${this._onFormSubmit}">
        <slot></slot>
        <p id="infoMessage">${this.info}${this._getLoginAttempts()}</p>
        <input
          type="text"
          id="name"
          placeholder="Nombre de usuario"
          .value="${this.name}"
          @input="${this._nameChanged}"
          required>
        <input
          type="email"
          id="email"
          placeholder="Email"
          .value="${this.email}"
          @input="${this._emailChanged}"
          required>
        <button type="submit">Sign In</button>
        <button type="button" @click="${this._mostrarFormularioWebComponents}">MOSTRAR FORM WC</button>
      </form>
      <ul>
      ${this.lista.map(item => html`<li>Elemento: ${item}</li>`)}
      </ul>
    `;
  }

  // Private Methods
  _mostrarFormularioWebComponents() {
    let myCustomEvent = new CustomEvent('mostrar-form-wc', { bubbles: true })

    this.dispatchEvent(myCustomEvent);
  }

  _nameChanged(e) {
    this.name = e.target.value;
  }

  _emailChanged(e) {
    this.email = e.target.value;
  }

  /**
   * Returns a string indicating how many times the user has tried to sign in
   *
   * @private
   * @returns {string} A string with the number of login attempts if the number is greater than 0
   */
  _getLoginAttempts() {
    return this._loginAttempts > 0 ? ` (${this._loginAttempts} intentos de login)` : '';
  }

  async _onFormSubmit(event) {
    event.preventDefault();
    // const name = this.renderRoot.getElementById("name");
    // const email = this.renderRoot.getElementById("email");
    // const signInData = {
    //   name: getInputValue(name),
    //   email: getInputValue(email)
    // }
    const signInData = {
      name: this.name,
      email: this.email
    }
    let onFormSubmitEvent

    console.log(`DESDE DENTRO DEL COMPONENTE Name: ${signInData.name}, Email: ${signInData.email}`);

    if (signInData.email !== '' && signInData.password !== '') {
      // Incrementamos el número de intentos de login
      this._loginAttempts++
      const payload = JSON.stringify(signInData)
      const apiData = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/login`, 'POST', payload)
      console.log('respuesta de la API', apiData)
      let eventDetail = apiData
      if (apiData === undefined) {
        eventDetail = {
          text: 'No he encontrado el usuario o la contraseña'
        }
      }
      onFormSubmitEvent = new CustomEvent("login-form-submit", {
        bubbles: true,
        detail: eventDetail
      })
    } else {
      console.error('No se han enviado datos')
      onFormSubmitEvent = new CustomEvent("login-form-submit", {
        bubbles: true,
        detail: {
          text: 'No se han enviado los datos del formulario'
        }
      })
    }

    this.dispatchEvent(onFormSubmitEvent);
  }
}
customElements.define('signin-form-lit', SignInFormLit);