
<h1>Routal</h1>
 A simple, universal, light, modern Router with animation skills that supports pushState (update pages without reloading) and keep links SEO friendly
 <br>
<img src="https://media3.giphy.com/media/Rf4CG6Bu9p7vPfeXHd/giphy.gif">
  <br>
* Tested well with lit-element (check out the demo code @ index.js & index.html)<br>
* Tested well with vanilla JS<br>


## Usage

Hot to include?
```
import { Routal } from https://unpkg.com/routal@1.0.0/routal.js

OR

npm i routal
```

How to Initialize?
```


    let config = [
      {pattern:'home',transition:'slide',axis:'y',component:(param)=>{return html`<the-home .param=${param}></the-home>`}},
      {pattern:'user/:id',transition:'slide',duration:0.2,component:(param)=>{return html`<the-user .param=${param}></the-user>`} },
      {pattern:'404',transition:'flip',component:(param)=>{return html` Nothing Here to show`} },
      {pattern:'settings/*',transition:'flip',component:()=>{return html`<the-settings></the-settings>`}},
    ]
    

    this.routal = new Routal(config,(routeComponent)=>{
      console.log('callback received')
      this.routeComponent = routeComponent
    },'#container')

     //cotainer could be a query pattern like #id of an element itself like this.querySelector('#id')
     //Routal(config,callback,container) container is optional, It's default value is document.body

```

What to do with links?
```
// for lit-element
<a @click=${this.routal.link} href="/user/punyBot">punyBot </a> 

//for vanilla js
<a onclick='routal.link()' href="/user/punyBot">punyBot</a>
```