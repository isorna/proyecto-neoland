// Si no usamos el Starter Kit:
import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';
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
      <form id="signInForm">
        <slot></slot>
        <p id="infoMessage">Registro del usuario</p>
        <input type="text" id="name" placeholder="Nombre de usuario" required>
        <input type="email" id="email" placeholder="Email" required>
        <button type="submit">Sign In</button>
      </form>
    `;
  }
}
customElements.define('signin-form-lit', SignInFormLit);