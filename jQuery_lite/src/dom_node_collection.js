class DOMNodeCollection{
    constructor(HTMLElementsArr){
        this.HTMLElementsArr = HTMLElementsArr
    }

    html(string=-1){
        if (string == -1) return this.HTMLElementsArr[0].innerHTML
        this.HTMLElementsArr.forEach(el=>el.innerHTML = string)
        return this
    }

    empty(){
        this.html("")
        return this
    }

    append(arg){
        if (arg instanceof DOMNodeCollection){
            arg.HTMLElementsArr.forEach(innerEl=>{
                this.HTMLElementsArr.forEach(outerEl=>{
                    outerEl.html(innerEl.outerHTML)
                })
            })
        }else if (typeof arg == "string"){
            this.HTMLElementsArr.forEach(outerEl=>{
                outerEl.html(arg)
            })
        }else if (arg instanceof HTMLElement){
            this.HTMLElementsArr.forEach(outerEl=>{
                outerEl.html(arg.outerHTML)
            })
        }
        return this
    }

    attr(attribute, value=-1){
        if (value != -1){
            this.HTMLElementsArr.forEach(el=>{
                el.setAttribute(attribute, value)
            })
            return this
        }else{
            return this.HTMLElementsArr[0].getAttribute(attribute)
        }  
    }

    addClass(className){
        this.HTMLElementsArr.forEach(el=>{
            el.classList.add(className)
        })
        return this
    }

    removeClass(className){
        this.HTMLElementsArr.forEach(el=>{
            el.classList.remove(className)
        })
        return this
    }

    children(){
        let children = []
        this.HTMLElementsArr.forEach(el=>{
            children = children.concat(Array.from(el.children))
        })
        return new DOMNodeCollection(children)
    }

    parent(){
        let parents = []
        this.HTMLElementsArr.forEach(el=>{
            if (!parents.includes(el.parentElement)) parents.push(el.parentElement)
        })
        return new DOMNodeCollection(parents)
    }

    find(selector){
        let descendants = []
        this.HTMLElementsArr.forEach(el=>{
            descendants = descendants.concat(Array.from(el.querySelectorAll(selector)).filter(descendant=>!descendants.includes(descendant)))
        })
        return new DOMNodeCollection(descendants)
    }

    remove(){
        this.HTMLElementsArr.forEach(el=>{
            el.remove()
        })
    }

    on(events, ...args){
        let data 
        if (args.length>1) data = args.shift()
        let callback = args.pop()
        callback = callback.bind(this)
        events.split(" ").forEach(event=>{
            this.HTMLElementsArr.forEach(el=>{
                el.addEventListener(event, callback)
                el.listener = callback
            })
        })
    }

    off(events){
        events.split(" ").forEach(event=>{
            this.HTMLElementsArr.forEach(el=>{
                el.removeEventListener(event, el.listener)
            })
        })
    }
}

module.exports = DOMNodeCollection