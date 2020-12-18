/* 吊顶通栏 */
var condoleTop = document.querySelector('.condoleTop')
var returnT = document.querySelector('.returnTop-t')
var returnM = document.querySelector('.returnTop-m')
var top1;
//给window对象绑定滚动事件
window.onscroll = function () {
    //获取滚动距离
    top1 = document.body.scrollTop || document.documentElement.scrollTop

    //判断滚动距离
    if (top1 >= 580) {
        //显示顶部通栏
        condoleTop.style.height = '72px'
        //显示按钮对象
        returnT.style.display = 'block'
    } else {
        //隐藏显示内容 
        condoleTop.style.height = '0px'
        returnT.style.display = 'none'
    }
}
//给绑定点击事件
returnM.onclick = function () {
    var dsq = setInterval(function () {
        //判断滚动距离是否大于0
        if (top1 <= 0) {
            clearInterval(dsq)
            return
        }
        //重新设置滚动距离
        document.documentElement.scrollTop = top1 - 10
    }, 20)
}