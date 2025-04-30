import { getAPIData, getInputValue, API_PORT } from '../../index.js';
import { importTemplate } from '../../lib/importTemplate.js';
// @ ts-expect-error TS doesn't like this
import ResetCSS from '../../../css/reset.css' with { type: 'css' }
// @ ts-expect-error TS doesn't like this
import AppCSS from '../../../css/styles.css' with { type: 'css' }
// @ ts-expect-error TS doesn't like this
import SignInFormCSS from './SignInForm.css' with { type: 'css' }

const TEMPLATE = {
  id: 'signInFormTemplate',
  url: './js/components/SignInForm/SignInForm.html'
}
// Wait for template to load
await importTemplate(TEMPLATE.url);

/**
 * Sign In Form Web Component
 *
 * @class SignInForm
 * @extends HTMLElement
 */
export class SignInForm extends HTMLElement {
  static observedAttributes = ['info'];
  // Definimos las propiedades del componente
  _color = 'rojo';

  // Propiedades dinámicas
  set color(value) {
    this._color = value + ' claro';
  }
  get color() {
    return this._color;
  }

  /**
   * Retrieves the template element from the document using the template ID.
   *
   * @returns {HTMLTemplateElement} The HTML template element associated with the component.
   */
  get template() {
    return document.getElementById(TEMPLATE.id);
  }

  constructor() {
    super();
    // Configuramos nuestro componente
    this.color = 'azul';
    console.log('1. instanciando SignInForm', this.color);
  }

  // ======================= Lifecycle Methods ======================= //

  /**
   * Called when the element is inserted into a document.
   * The element is already attached to its parent node.
   */
  async connectedCallback() {
    console.log("2. constructor: Custom element added to page.");
    // Necesitamos activar el shadow DOM para poder añadir la plantilla html
    this.attachShadow({ mode: "open" });
    // Asignamos los estilos
    this.shadowRoot.adoptedStyleSheets.push(ResetCSS, AppCSS, SignInFormCSS);
    // Creamos el contenido del shadowRoot
    this._setUpContent();
    // Ahora que ya existe el shadowRoot, podemos asignar eventos a nuestro HTML
    const signInForm = this.shadowRoot.getElementById("signInForm");
    signInForm.addEventListener("submit", this._onFormSubmit.bind(this));
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
  // / eslint-disable-next-line @typescript-eslint/no-unused-vars
  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`attributeChangedCallback: Attribute ${name} has changed.`, oldValue, newValue);
    this._setUpContent();
    if (this.shadowRoot && this.template) {
      // Dependiendo del atributo modificado...
      if (name === 'info') {
        this._updateInfoMessage(newValue);
      }
    }
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
   * Updates the informational message displayed in the form.
   *
   * @param {String} newValue - The new message to display in the info section.
   * Updates the text content of the element with id 'infoMessage'.
   * Assumes that the element exists within the shadow DOM.
   * @private
   */

  _updateInfoMessage(newValue) {
    const infoMessage = this.shadowRoot.getElementById('infoMessage');
    infoMessage.textContent = newValue;
  }

  async _onFormSubmit(event) {
    event.preventDefault();
    const name = this.shadowRoot.getElementById("name");
    const email = this.shadowRoot.getElementById("email");
    const signInData = {
      name: getInputValue(name),
      email: getInputValue(email)
    }
    //  let onFormSubmitEvent

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

    //  this.dispatchEvent(onFormSubmitEvent);
  }
}

customElements.define('signin-form', SignInForm);