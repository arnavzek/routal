import { LitElement, html } from 'https://unpkg.com/lit-element@2.3.1/lit-element.js?module';
import { Routal } from './routal.js';
 

class home extends LitElement {
  static get properties() {
    return {

      param: { type: Object }
    }
  }
  render() {
    return html`<h1>Welcome to home 💍</h1>
    orem 🐦📧 Ipsum is simply dummy 🐦📧🍗 text of the printing 🏪🌅💧 🍟🎧🐜🏉🍎📛 and typesetting industry. Lorem Ipsum has be
    `
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
    return html`<h1>Welcome🍟 to settings🐜🏉🍎👋</h1>
     sum as their default model text, and a 👯🌾🏇🌷 Ipsum as their de 🎭🕘🎈🎐out. The point 🐅🎹💶 🍬👑🍧🏡 📺🔝📕🔔`
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
    return html`<h1>Welcome! ${this.param.id}🌄🌞</h1>

    🐊👦👻making it over 2000 years old. Richard McClintock, a Latin profess 👱👉 👻🌝and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32🐧🍃💤
    
    `
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
      {pattern:'home',transition:'slide',axis:'y',component:(param)=>{return html`<the-home .param=${param}></the-home>`}},
      {pattern:'user/:id',transition:'slide',duration:0.2,component:(param)=>{return html`<the-user .param=${param}></the-user>`} },
      {pattern:'404',transition:'flip',component:(param)=>{return html` Nothing Here to show`} },
      {pattern:'settings/*',transition:'flip',component:()=>{return html`<the-settings></the-settings>`}},
    ]
    //


    this.routal = new Routal(config,(routeComponent)=>{
      console.log('callback received')
      this.routeComponent = routeComponent
    },'#container')

    //console.log(this.querySelectorAll('*'))
    //to pass a child of component as container component must be rendered without shadowDom (use createRenderRoot function)

    //Routal(config,callback,container) container is optional, It's default value is document.body
  }

  createRenderRoot() {
    return this; //renders component without shadow dom
  }

  render() {
    return html`
      <div>
        <h1>Routal Demo</h1>
        <a @click=${this.routal.link} href="/user/Sir Pac">Sir Pac </a> 

        <a @click=${this.routal.link} href="/user/Puny Bot">Puny Bot </a>

        <a @click=${this.routal.link} href="/settings/privacy">Privacy </a>

        <a @click=${this.routal.link} href="/home">Home </a> 

        <div id='container'>
        ${this.routeComponent}
        </div>

      </div>
    `
  }
}
 
customElements.define('my-app', App);