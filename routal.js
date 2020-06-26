
function cleanFirstSlash(path){
    if(path[0] === '/') path = path.substr(1,path.length-1)
    return path
}


let routal = new class {
    run(routeConfig,callback){
        this.routeConfig = routeConfig
        this.callback = callback
        window.addEventListener('onpopstate',this.processRoutes.bind(this))
        window.addEventListener('load',this.processRoutes.bind(this))

        this.link = this.link.bind(this)
    }


    processRoutes(){

        let callback = this.callback
        let path = cleanFirstSlash(location.pathname)
        for(let i = 0; i<= this.routeConfig.length-1; i++){

            let route = this.routeConfig[i]

            let patternPath = cleanFirstSlash(route['pattern'])



            if(patternPath  === path){
                return callback(route.component())
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
                        param[paraField] = paraValue
                    }

                    return callback(route.component(param))
                }

            }else if(patternPath.indexOf('*') !== -1){
                let locationOfFirstAsterix = patternPath.indexOf('*')
                let pathBeforeAsterix = patternPath.substr(0,locationOfFirstAsterix)
                let pathBeforeAsterixCurrent = path.substr(0,locationOfFirstAsterix)
                //format /a/b/*

                if(pathBeforeAsterix === pathBeforeAsterixCurrent){
                    return callback(route.component())
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

                if(componentFor404) return callback(componentFor404())
                return callback(html`404 Not Found`)
            } 

        }
    }

    link(e){
        e.preventDefault()
        let path = e.target.getAttribute('href')
        
        window.history.pushState('','',path)
        this.processRoutes()
    }


}




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


( our process of taking notes also makes coming back to our own code very confortable)

* create slot element which will render the appropriate component but that will require locading lit element mostly browser will handle that with chache
(if component itself is returned it will require less code to be written by developers)

Pattern Matching Procedure

pattern matching must follow philosophy of same depth meaning /a/b/c will not be included in /a/b rather you can provide /a/b/:c
the process will be first check if route pattern has colon if not do direct match
if colon exist compare the no. of forward slashes, if quantity is same, check if everything before the first colon matches the current pathname upto the same dapth

precaution href attribute /a and a mean the same but while matching it reflection addtional depth so if the first character is / remove it

The benefit of taking planing notes inside the code itself is you can later use it as code briefing, If you want to open source it, code briefing is a must have


YAY!

Let's do some finishing.
*/
export {routal}
