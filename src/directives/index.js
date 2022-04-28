export const imageerror = {
  inserted(dom, options) {
    // dom是当前指令作用的dom对象
    // options.value是传递的值
    // 图片加载失败时触发onerror事件
    dom.onerror = function() {
      dom.src = options.value
    }
  }
}
