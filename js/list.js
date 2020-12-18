/* 下拉列表 */
var cla = document.querySelector(".cla")
var xlLi = document.querySelector(".xl-li-one")
cla.onmouseover = function () {
    xlLi.style.display = 'block'
}
cla.onmouseout = function () {
    xlLi.style.display = 'none'
}




//获取操作对象
var pagination = document.querySelector('.Pagination');
var conLi = document.querySelector('.conLi');

//使用自执行函数获取数据库中对应的数据
(async function () {
    var p1 = await promiseAjax({
        url: '../php/list.php'
    })
    //转换数据类型
    var dt = eval('(' + p1 + ')')

    //编写传入的obj数据
    var obj = {
        pageInfo: {
            pagenum: 1,
            pagesize: 10,
            totalsize: dt.length,
            totalpage: Math.ceil(dt.length / 36)
        },
        textInfo: {
            first: "首页",
            prev: "上一页",
            next: '下一页',
            last: "尾页"
        },
        change(m) {
            //截取指定长度的数据
            let ar2 = dt.slice((m - 1) * 36, m * 36)
            /* console.log(ar2); */
            //拼接所有内容
            var str = ''
            //遍历新数组中所有数据
            for (var attr in ar2) {
                str += `
            <dl>
                <dt><a href="./details?id=${ar2[attr].id}"><img src="${ar2[attr].pic}"></a></dt>
                <dd><a href="./details?id=${ar2[attr].id}">${ar2[attr].name}</a></dd>
                <span>${ar2[attr].author}</span>
                <b>￥</b><em>${ar2[attr].price}</em>
                <i class="iconfont icon-icon4" id="${ar2[attr].id}"></i>
            </dl>
                `
            }
            conLi.innerHTML = str
        }
    }
    //创建分页器对象
    new Pagination(pagination, obj)
})()




$(function (){
    // 点击加入购物车
    $('.conLi').on('click','dl .icon-icon4',function (){
      // 获取当前点击商品的编号
      var id = $(this).attr('id')
      
      // localStorage  key = value
                //  goods = [{code:'abc1',num:1},{code:'abc2',num:2}]
      // 判断本地存储是否有数据
      if (localStorage.getItem('dl')) {
        var goodsArr = JSON.parse( localStorage.getItem('dl') )
      } else {
        var goodsArr = []
      }
  
      var hasGoods = false
      if (goodsArr.length > 0) {
        // 判断当前选中商品是否在购物车中
        $.each(goodsArr,function (index,item){
          console.log(index)
          console.log(item)
          if (item.id === id) {// 商品存在购物车中，数量+1
            item.num++
            hasGoods = true
            return false
          }
        })
      }
      // 如果购物车没有当前选中的商品，添加一条数据
      if (!hasGoods) {
        // var objStr = JSON.stringify({code:code,num:1})
        goodsArr.push({id:id,num:1})
      }
  
      // 更新本地存储的数据
      localStorage.setItem('dl',JSON.stringify(goodsArr))
  
      alert('添加购物车成功')
  
    })
  
  })