import { getAPIData, getInputValue, API_PORT } from '../../index.js';
import { importTemplate } from '../../lib/importTemplate.js';
// @ ts-expect-error TS doesn't like this
import ResetCSS from '../../../css/reset.css' with { type: 'css' }
// @ ts-expect-error TS doesn't like this
import AppCSS from '../../../css/styles.css' with { type: 'css' }
// @ ts-expect-error TS doesn't like this
import LoginFormCSS from './LoginForm.css' with { type: 'css' }

const TEMPLATE = {
  id: 'loginFormTemplate',
  url: './js/components/LoginForm/LoginForm.html'
}
// Wait for template to load
await importTemplate(TEMPLATE.url);

/**
 * Login Form Web Component
 *
 * @class LoginForm
 * @property {string} prueba
 * @emits 'login-form-submit'
 */
export class LoginForm extends HTMLElement {
  static observedAttributes = ['prueba'];

  get prueba() {
    return this.getAttribute('prueba');
  }

  get template(){
    return document.getElementById(TEMPLATE.id);
  }

  constructor() {
    super()
  }

  // ======================= Lifecycle Methods ======================= //

  async connectedCallback() {
    // console.log("constructor: Custom element added to page.");
    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets.push(ResetCSS, AppCSS, LoginFormCSS);

    this._setUpContent();
    this._checkSmallScreenBehaviors();
    // Add event listeners to form elements
    const loginForm = this.shadowRoot.getElementById("loginForm");
    // Get updates when content is updated in the slot
    this.shadowRoot.addEventListener('slotchange', this._handleSlotChanged.bind(this), { passive: true });
    // Global store state listener
    // window.addEventListener('stateChanged', this._handleStateChanged.bind(this), { passive: true });

    loginForm.addEventListener("submit", this._onFormSubmit.bind(this));
  }

  disconnectedCallback() {
    console.log("disconnectedCallback: Custom element removed from page.");
    // Don't forget to remove event listeners
    // window.removeEventListener('stateChanged', this._handleStateChanged);
  }

  adoptedCallback() {
    console.log("adoptedCallback: Custom element moved to new page.");
  }


  /**
   * Called when an observed attribute has changed.
   *
   * @param {String} name - The name of the attribute that changed.
   * @param {String} oldValue - The old value of the attribute.
   * @param {String} newValue - The new value of the attribute.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  attributeChangedCallback(name, oldValue, newValue) {
    // console.log(`attributeChangedCallback: Attribute ${name} has changed.`, oldValue, newValue);
    this._setUpContent();
  }

  // ======================= Private Methods ======================= //

  /**
   * Private method to set up the content of the web component.
   *
   * Only render if the web component is connected and the template is loaded.
   * Replace any previous content with the template content.
   * @private
   */
  _setUpContent() {
    // Prevent render when disconnected or the template is not loaded
    if (this.shadowRoot && this.template) {
      // Replace previous content
      this.shadowRoot.innerHTML = '';
      this.shadowRoot.appendChild(this.template.content.cloneNode(true));
    }
  }

  /**
   * Handles a slot change event from the shadow root
   * @param {Event} e - The slot change event
   * @private
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _handleSlotChanged(e) {
    // Notify the slot change event
    // console.log(['Slot changed', e])
  }

  /**
   * Handles a state change event from the store
   * @param {import('../../store/redux').State} state - The new state
   * @private
   */
  _handleStateChanged(state) {
    // Do whatever is needed in this component after a particular state value changes
    // Filter by the states needed in this component
    console.log('stateChanged observed from component', state?.detail?.type);
  }

  /**
   * Updates the visibility of the sidebar based on the screen size.
   * If the screen width is 460px or less, the sidebar is hidden;
   * otherwise, the sidebar is shown.
   * @private
   */
  _checkSmallScreenBehaviors() {
      if (window.matchMedia('(max-width: 460px)').matches) {
          this.showSidebar = false;
      } else {
          this.showSidebar = true;
      }
  }

/**
 * Handles the form submission event for the login form.
 * Prevents the default form submission behavior and gathers
 * the user's email and password input values. If both fields
 * are filled, sends a POST request to the login API endpoint
 * with the login data. Dispatches a custom event with the API
 * response data if the login is successful, otherwise dispatches
 * an event with null detail.
 *
 * @param {Event} e - The form submission event.
 * @private
 */

  async _onFormSubmit(e) {
    e.preventDefault();
    const email = this.shadowRoot.getElementById("email");
    const password = this.shadowRoot.getElementById("password");
    const loginData = {
      email: getInputValue(email),
      password: getInputValue(password)
    }
    let onFormSubmitEvent
    // console.log(`DESDE DENTRO DEL COMPONENTE Email: ${loginData.email}, Password: ${loginData.password}`);

    if (loginData.email !== '' && loginData.password !== '') {
      const payload = JSON.stringify(loginData)
      const apiData = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/login`, 'POST', payload)
      onFormSubmitEvent = new CustomEvent("login-form-submit", {
        bubbles: true,
        detail: apiData
      })
    } else {
      onFormSubmitEvent = new CustomEvent("login-form-submit", {
        bubbles: true,
        detail: null
      })
    }

    this.dispatchEvent(onFormSubmitEvent);
  }
}

customElements.define('login-form', LoginForm);