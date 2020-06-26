import { LitElement, html } from 'https://unpkg.com/lit-element@2.3.1/lit-element.js?module';
import { routal } from './routal.js';
 

class home extends LitElement {
  static get properties() {
    return {

      param: { type: Object }
    }
  }
  render() {
    return html`Welcome to home`
  }
}


customElements.define('the-home', home);



class settings extends LitElement {
  static get properties() {
    return {

      param: { type: Object }
    }
  }
  render() {
    return html`Welcome to settings`
  }
}


customElements.define('the-settings', settings);


class user extends LitElement {
  static get properties() {
    return {
      param: { type: Object }
    }
  }
  render() {
    console.log(this.param)
    return html`Welcome! ${this.param.id}`
  }
}

customElements.define('the-user', user);

class App extends LitElement {
  static get properties() {
    return {
      routeComponent: { type: Object }
    }
  }
  constructor() {
    super()

    let config = [
      {pattern:'home',component:(param)=>{return html`<the-home .param=${param}></the-home>`}},
      {pattern:'user/:id',component:(param)=>{return html`<the-user .param=${param}></the-user>`} },
      {pattern:'404',component:(param)=>{return html` Nothing Here to show`} },
      {pattern:'settings/*',component:()=>{return html`<the-settings></the-settings>`}},
    ]
    //

    routal.run(config,(routeComponent)=>{
      this.routeComponent = routeComponent
    })

  }

  render() {
    return html`
      <div>
        <h1>MyAwesomeApp</h1>
        <a @click=${routal.link} href="/user/sirPaac">sirPaac</a> 
        <a @click=${routal.link} href="/user/GoodLice">GoodLice</a>
        <a @click=${routal.link} href="/user/punyBot">punyBot</a>

        <a @click=${routal.link} href="/settings/privacy">privacy</a>
        <a @click=${routal.link} href="/settings/logout">logout</a>

        <a @click=${routal.link} href="/home">Home</a> 

        ${this.routeComponent}
      </div>
    `
  }
}
 
customElements.define('my-app', App);