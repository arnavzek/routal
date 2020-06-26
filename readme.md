
##Routal
 A simple, light, Modern Router that supports pushState (so reload does not occur), links stay SEO friendly

* Best served with lit-element

## Usage

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