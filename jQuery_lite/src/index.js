let DOMNodeCollection = require("./dom_node_collection")
let functions = []
let $l = function (arg){
    if (arg instanceof HTMLElement){
        return new DOMNodeCollection([arg])
    } else if (typeof arg == "string"){
        let elements = document.querySelectorAll(arg)
        return new DOMNodeCollection(Array.from(elements))
    } else if (typeof arg == "function"){
        if (document.readyState === 'complete') {
            arg()
        }else{
            functions.push(arg)
            let readyLoop = setInterval(()=>{
                if (document.readyState === 'complete'){
                    while (functions.length > 0){
                        functions.shift().call(this)
                    }
                    clearInterval(readyLoop)
                }
            }, 20)
        }
    }
}

window.$l = $l
$l(()=>console.log("cat"))
$l(()=>console.log("cat3"))
$l(()=>console.log("cat2"))