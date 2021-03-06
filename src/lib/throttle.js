
/**
 * 节流函数
 * @param {需要节流的函数} callback
 * @param {节流的时间} relay
 * @param {传递进来的参数} 
 */
export default function(fn, wait = 300) {
    let timer = null
    //获取参数
    return function() {
        let arg = arguments
        let e = arguments[0]
        e.persist && e.persist()
        let context = this
        if(!timer) {
            timer = setTimeout(function() {
                fn.call(context, Array.from(arg))
                timer = null
                clearTimeout(timer)
            }, wait)
        }
    }
}