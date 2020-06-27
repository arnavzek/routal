
<h1>Routal</h1>
 A simple, universal, light, modern Router with animation skills that supports pushState (update pages without reloading) and keep links SEO friendly

<br><br>
* Tested well with lit-element (check out the demo code @ index.js & index.html)

## Usage

Hot to include?
```
import { routal } from https://unpkg.com/routal@1.0.0/routal.js

OR

npm i routal
```

How to Initialize?
```

    let config = [
      {pattern:'home',transition:'slide',component:(param)=>{return html`<the-home .param=${param}></the-home>`}},
      {pattern:'user/:id',transition:'slide',component:(param)=>{return html`<the-user .param=${param}></the-user>`} },
      {pattern:'404',transition:'flip',component:(param)=>{return html` Nothing Here to show`} },
      {pattern:'settings/*',transition:'flip',component:()=>{return html`<the-settings></the-settings>`}},
    ]
    

    routal.run(config,(routeComponent)=>{
      this.routeComponent = routeComponent
    })

```

What to do with links?
```
// for lit-element
<a @click=${this.routal.link} href="/user/punyBot">punyBot </a> 

//for vanilla js
<a onclick='routal.link()' href="/user/punyBot">punyBot</a>
```