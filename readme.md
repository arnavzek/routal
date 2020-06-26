
<h1>Routal</h1>
 A universal, simple, light, modern Router that supports pushState (update page without reloading), links stay SEO friendly
<br>
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
      {pattern:'home',component:(param)=>{return html`<the-home .param=${param}></the-home>`}},
      {pattern:'user/:id',component:(param)=>{return html`<the-user .param=${param}></the-user>`} },
      {pattern:'404',component:(param)=>{return html` Nothing Here to show`} },
      {pattern:'settings/*',component:()=>{return html`<the-settings></the-settings>`}},
    ]
    //

    routal.run(config,(routeComponent)=>{
      this.routeComponent = routeComponent
    })

```

What to do with links?
```
// for lit-element
<a @click=${routal.link} href="/user/punyBot">punyBot</a>

//for vanilla js
<a onclick='routal.link()' href="/user/punyBot">punyBot</a>
```