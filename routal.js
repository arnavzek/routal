

function cleanFirstSlash(path){
    if(path[0] === '/') path = path.substr(1,path.length-1)
    return path
}


class Routal {

    //cotainer could be a query pattern like #id of an element itself like this.querySelector('#id')
    constructor(routeConfig,callback,container = document.body){
        this.routeConfig = routeConfig
        this.callback = callback
        this.container = container

        window.addEventListener('onpopstate',this.processRoutes.bind(this))
        window.addEventListener('load',this.processRoutes.bind(this))
        this.link = this.link.bind(this)
    }


    processRoutes(handoverRefresh){
        console.log('refreshing')
        let callback = this.callback
        let path = cleanFirstSlash(location.pathname)

        if(typeof this.container === 'string') this.container = document.querySelector(this.container)

        for(let i = 0; i<= this.routeConfig.length-1; i++){

            let route = this.routeConfig[i]

            returnCallback = returnCallback.bind(this)
            function returnCallback(component){
                console.log(component)
                this.duration = route.duration
                this.transitionAxis = route.axis
                this.transitionType = route.transition
                if(handoverRefresh === true) return ()=>{ callback(component)}
                
                return callback(component)
            }
            
            

            let patternPath = cleanFirstSlash(route['pattern'])



            if(patternPath  === path){
                return returnCallback(route.component())
            }else if(patternPath.indexOf(':') !== -1 && patternPath.split('/').length === path.split('/').length){
                let locationOfFirstColon = patternPath.indexOf(':')
                let pathBeforeColon = patternPath.substr(0,locationOfFirstColon)
                let pathBeforeColonCurrent = path.substr(0,locationOfFirstColon)

                let param = {}
                if(pathBeforeColon === pathBeforeColonCurrent){
                    let paramPattern = patternPath.substr(locationOfFirstColon,patternPath.length).split('/')
                    let paramValues = path.substr(locationOfFirstColon,path.length).split('/')

                    for(let j = 0; j <= paramPattern.length -1; j++){
                        let paraField = paramPattern[j].replace(':','')
                        let paraValue = paramValues[j]
                        param[paraField] = decodeURIComponent(paraValue)
                    }

                    return returnCallback(route.component(param))
                }

            }else if(patternPath.indexOf('*') !== -1){
                let locationOfFirstAsterix = patternPath.indexOf('*')
                let pathBeforeAsterix = patternPath.substr(0,locationOfFirstAsterix)
                let pathBeforeAsterixCurrent = path.substr(0,locationOfFirstAsterix)
                //format /a/b/*

                if(pathBeforeAsterix === pathBeforeAsterixCurrent){
                    return returnCallback(route.component())
                }

            }

            //just asterix is confusing analogy for 404, let's use 404 as a pattern instead
            if(i === this.routeConfig.length-1){
                let componentFor404 = null
                for(let index of this.routeConfig){
                    if(index.pattern === '404' || index.pattern === 404){
                        componentFor404 = index.component
                    }
                }

                if(componentFor404) return returnCallback(componentFor404())
                return returnCallback(html`404 Not Found`)
            } 

        }
    }

    link(e){
        e.preventDefault()
        let path = e.target.getAttribute('href')
        
        window.history.pushState('','',path)
        let refresh = this.processRoutes(true)
        
        if(!this.transitionAxis) this.transitionAxis = 'x'
        

        let unit = 'vw'
        if(this.transitionAxis === 'y') unit = 'vh'

        if(!this.transitionType) this.transitionType = 'slide'

        this.container.style.display = 'block'

        if(this.transitionType === 'slide'){
            if(!this.duration) this.duration = 0.5

            this.container.style.transition = `all ${this.duration}s ease-out`
            this.container.style.transform = `translate${this.transitionAxis.toUpperCase()}(-100${unit})`

            setTimeout(()=>{
                refresh()
                this.container.style.transition = 'unset'
                this.container.style.transform = `translate${this.transitionAxis.toUpperCase()}(100${unit})`
                setTimeout(()=>{
                    this.container.style.transition = `all ${this.duration}s ease-out`
                    this.container.style.transform = `unset`
                },100)

            },this.duration*1000)

        }else if(this.transitionType === 'flip'){

            if(!this.duration) this.duration = 1
            document.body.style.perspective = '500px'
            function hideChild(){
                if(this.container.children[0]){
                    this.container.children[0].style.display = 'block'
                    this.container.children[0].style.transition = 'unset'
                    this.container.children[0].style.opacity = 0
                } 
            }

            function setCss(rule){
                var sheet = window.document.styleSheets[0];
                sheet.insertRule(rule, sheet.cssRules.length);
            }

            hideChild = hideChild.bind(this)

            this.containerName = this.container.getAttribute('id')
            if(this.containerName){
                this.containerName = '#'+this.containerName
            }else if(document.body.classList.length !== 0){
                this.containerName = '.'+this.container.classList[0]
            }else{
                this.containerName = 'routalContainer'+Math.random()
                this.container.setAttribute('id',this.containerName)
            }

            
            let rotateY= this.container.style.transform.replace(/[^\d.]/g, '')
            rotateY = Number(rotateY)

            
            setCss(`
                ${this.containerName} > * {
                    display:block;
                    opacity: 0; 
                    transition:unset;
                }
            `)
           
            
            this.container.style.transition = `all ${this.duration}s`
            this.container.style.transform = `rotateY(${rotateY+180}deg)`

            refresh()


            setTimeout(()=>{

                this.container.children[0].style.transform = `rotateY(${rotateY+180}deg)`
                setCss(`${this.containerName} > * {
                        display: block;
                        opacity:1;
                        transition:opacity ${this.duration/3}s;
                    }`)

            },(this.duration*1000)/2)







        }


        
    }


}

//https://javascript.info/modules-dynamic-imports


/*
Template Routes

[{pattern:'home',component:'component-name'},{}]

*/








/*
Code Briefing

X override links @ link()
X read route on popState and window.onload @ litRouter processRoutes
X Match pattern of route with location.pathname @ same depth philosophy
X return the component name to render @ second param of constructor
X Add param to the calback
X Add support for /a/b/* (on it!)

There are a lot of libraries like routal so routal needs to offer something new to the web and It's a no brainer that 
it must be native app like animation on routing 

* Add support for transition animation

( our process of taking notes also makes coming back to our own code very confortable)

* create slot element which will render the appropriate component but that will require locading lit element mostly browser will handle that with chache
(if component itself is returned it will require less code to be written by developers)

Pattern Matching Procedure

pattern matching must follow philosophy of same depth meaning /a/b/c will not be included in /a/b rather you can provide /a/b/:c
the process will be first check if route pattern has colon if not do direct match
if colon exist compare the no. of forward slashes, if quantity is same, check if everything before the first colon matches the current pathname upto the same dapth

precaution href attribute /a and a mean the same but while matching it reflection addtional depth so if the first character is / remove it

The benefit of taking planing notes inside the code itself is you can later use it as code briefing, If you want to open source it, code briefing is a must have

Let's add more animation types

* slideX
* slideY
* hangX
* hangY


*/
export {Routal}
