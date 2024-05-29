export const debounce = (func: Function, interval = 300) => {

    let timer: ReturnType<typeof setTimeout>;
    
    return function (this: any,...args: any[]) {

        clearTimeout(timer)
        
        timer = setTimeout(() => {
            func.apply(this, args)
        }, interval)            
    }
}