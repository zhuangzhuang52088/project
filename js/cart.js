//获取用户名cookie
var name1 = getCookie('name')
//获取当前地址
var url2 = location.href
//判断当前cookie是否存在
if (!name1) {
    alert('非法进入，请登录')
    location.href = './login1.html?url=' + url2
}










$(function (){

    // 判断本地存储是否有购物车数据
    if (localStorage.getItem('dl')) {// 有数据
      // 获取本地存储中购物车的数据
      var goodsArr = JSON.parse( localStorage.getItem('dl') )
  
      // 获取数据
      $.ajax({
        url: '../php/list.php',
        type: 'get',
        dataType: 'json',
        success: function (json){
          var domStr = ''
          domStr +=`
          <div class="shopTop">
                <input type="checkbox" name="quan">
                    <span>全选</span>
                    <span>商品信息</span>
                    <span>价格(元)</span>
                    <span>数量</span>
                    <span>小计(元)</span>
                    <span>操作</span>
                </div>
                <div class="coupons clearfix">
                    <span>新华书店网上商城自营图书</span>
                    <a href="#"><img src="../img1/yhq.jpg" alt=""></a>
                </div>
          `
          $.each(goodsArr,function (index,item){
            $.each(json,function (ind,obj){
              if ( item.id === obj.id ) {
                domStr += `
            <div class="shopCon">
                    <ul class="clearfix">
                        <li><input type="checkbox" name="xuan"></li>
                        <li><a href="../html1/details?id=${obj.id}" class="shopCon-a1"><img src="${obj.pic}" alt=""></a>
                        </li>
                        <li>${obj.name}</li>
                        <li>￥<b>${obj.price}</b></li>
                        <li>
                            <button class="btn1">-</button>
                            <input type="text" value="1">
                            <button class="btn2">+</button>
                        </li>
                        <li>￥<b>${obj.price}</b></li>
                        <li>
                            <p class="san">删除</p>
                            <p class="sc">移入收藏</p>
                        </li>
                    </ul>
                </div>
                `
              }
            })
          })
          domStr +=`
          <div class="shopBtm clearfix">
                    <ul>
                        <li><input type="checkbox" name="quan"></li>
                        <li>全选</li>
                        <li><a href="#" class="batchDel">批量删除</a></li>
                        <li><a href="#">移到我的收藏</a></li>
                        <li><span>已选</span><b>0</b><span>件商品</span></li>
                        <li>
                            <div class="combined">
                                <span>合计(不含运费)：</span>
                                <span class="total">￥<b>0.00</b></span>
                            </div>
                            <div class="save">
                                <span>已节省：</span>
                                <span>￥<b>0.00</b></span>
                            </div>
                        </li>
                        <li>
                            <p>去结算</p>
                        </li>
                    </ul>
                </div>
                </div>
          `
          $('.shopBox').html(domStr)
        }
      })
  
      // 商品移出购物车
      $('.shopBox').on('click','.san',function (){
        // 删除该商品对应的li
        $(this).parent().remove()
  
        // 更新本地存储中的数据
        var id = $(this).attr('id') // 要删除商品的编号
        // 删除数组元素：pop()  unshift()  splice(index,1)
        $.each(goodsArr,function (index,item){
          if (item.id === id) {
            goodsArr.splice(index,1)
            return false
          }
        })
  
        // 判断购物车是否还有数据
        if (goodsArr.length > 0) {
          // 更新本地数据
          localStorage.setItem('dl',JSON.stringify(goodsArr))
        } else {
          // 清除本地数据
          localStorage.removeItem('dl')
          var nodata = '<div style="line-height: 70px; text-align: center;">购物车暂无数据！</li>'
          $('.shopBox').html(nodata)
        }
  
        alert('商品移出购物车成功！')
  
      })
  
    } else {// 没数据
      var nodata = '<div class="emptyCart"><h1>购物车空空的哦~，去看看心仪的商品吧~</h1><p>点击下方按钮快去选购吧! ^_^</p><p><a href="../html1/list.html">赶紧去购买吧</a></p></div>'
      $('.shopBox').html(nodata)
    }
  
  })










  var box = document.querySelector('.shopBox')
  //获取所有商品
  var shops = document.querySelector('.shopCon')
  var quan = document.querySelectorAll('[name="quan"]')
  //获取所有商品的选中框对象
  var checkboxs = document.querySelectorAll('[name="xuan"]')
  var qs = document.querySelector(".batchDel")
  var sc = document.querySelector(".sc")
  function fn1() {
      var checkboxs = document.querySelectorAll('[name="xuan"]')
  
      //遍历所有的选中框
      for (var i = 0; i < checkboxs.length; i++) {
          
          if (quan.checked) {
              checkboxs[i].checked = true
          } else {
              checkboxs[i].checked = false
          }
      }
  }
  
  
  //全删
  qs.onclick = function () {
      //遍历所有的选中框对象
      for (var i = checkboxs.length - 1; i >= 0; i--) {
          //判断当前选中框是否被选中
          if (checkboxs[i].checked) {
              checkboxs[i].parentNode.parentNode.remove()
          }
      }
      totalPrice()
  }
  //加入收藏
  sc.onclick = function () {
  
      save()
  }
  
  function save() {
      if (confirm("确认要收藏吗？")) {
          alert("收藏成功！");
      }
  }
  //结算
  
  //给父元素绑定点击事件
  box.onclick = function (e) {
      var e = e || window.event
      //获取点击对象
      var target = e.target || e.srcElement
      //判断点击的是否为全选框
      if (target.name == 'quan') {
          //遍历每一个商品对象
          for (var i = 0; i < shops.length; i++) {
              //判断当前全选框对象是否被选中
              if (target.checked) {
                  shops[i].children[0].children[0].checked = true
              } else {
                  shops[i].children[0].children[0].checked = false
              }
          }
          totalPrice()
      }
      //判断点击的是否为+按钮
      if (target.innerHTML == '+') {
          //获取数量
          var val = target.previousElementSibling.value
          //数量递增
          val++
          //在重新把递增的数量赋值给输入框
          target.previousElementSibling.value = val
  
          //获取单价
          var pirce = target.parentNode.previousElementSibling.children[0].innerHTML
          //计算小计
          var num = parseInt(val) * parseFloat(pirce)
          //给小计赋值
          target.parentNode.nextElementSibling.children[0].innerHTML = num
          totalPrice()
      }
      //判断点击对象是否为减号
      if (target.innerHTML == '-') {
          var val = target.nextElementSibling.value
          if (val <= 1) {
              val = 1
          } else {
              val--
          }
          target.nextElementSibling.value = val
          //获取单价
          var pirce = target.parentNode.previousElementSibling.children[0].innerHTML
          //计算小计
          var num = parseInt(val) * parseFloat(pirce)
          //给小计赋值
          target.parentNode.nextElementSibling.children[0].innerHTML = num
          totalPrice()
      }
      //删除一行
      if (target.innerHTML == '删除') {
          target.parentNode.parentNode.remove()
          totalPrice()
      }
  
  
      //点击选中框对象
      if (target.name == 'xuan') {
          aaa()
      }
  }
  
  function aaa() {
      var num = 0 //代表选中框被选中的次数
      //遍历所有商品选中框对象
      for (var i = 0; i < checkboxs.length; i++) {
          //判断该选中框是否被选中
          if (checkboxs[i].checked) {
              num++
          }
      }
      //当前被选中的次数是否等于长度
      if (num == checkboxs.length) {
          document.querySelector('[name="quan"]').checked = true
      } else {
          document.querySelector('[name="quan"]').checked = false
      }
      totalPrice()
  }
  
  
  //总计
  function totalPrice() {
      var total = 0 //总价格
      //遍历所有商品
      for (var i = 0; i < shops.length; i++) {
          //判断当前商品是否被选中
          if (shops[i].children[0].children[0].children[0].checked) {
              //获取每个商品的小计
              var subtotal = shops[i].children[0].children[5].children[0].innerHTML
              //累加
              total += parseFloat(subtotal)
          }
      }
  
      //给总计赋值
      document.querySelector('.total').innerHTML = total
  }
  
  totalPrice()
  




  /* 购物车 */
/* //获取大盒子对象
var shop = document.querySelector('.shop')
//获取localStrong的数据
var cartlist = localStorage.getItem("cartList") || "[]";
//转为数据对象
cartlist = JSON.parse(cartlist)

show1()
function show1() {
    if (cartlist.length > 0) {
         //验证全选框是否被选中
        var quan1 = cartlist.every(item => {
            return item.is_select == 1
        })
        var aa = total1()
        //创建变量，拼接所有商品信息
        var str2 = `
        <div class="shoppingQ">全部商品</div>
        <div class="shopBox">
            <div class="shopTop">
                <input type="checkbox" name="quan"  ${quan1?'checked':''}>
                <span>全选</span>
                <span>商品信息</span>
                <span>价格(元)</span>
                <span>数量</span>
                <span>小计(元)</span>
                <span>操作</span>
            </div>
            <div class="coupons clearfix">
                <span>新华书店网上商城自营图书</span>
                <a href="#"><img src="../img1/yhq.jpg" alt=""></a>
            </div>
        `
        //遍历数组中所有的商品信息
        cartlist.forEach(item => {
            str2 += `
            <div class="shopCon">
            <ul class="clearfix">
                <li><input type="checkbox"  ${item.is_select==1?'checked':''} name="xuan" data-id="${item.id}"></li>
                <li><a href="../html1/details.html" class="shopCon-a1"><img src="${item.pic}" alt=""></a>
                </li>
                <li>${item.name}</li>
                <li>￥<b>${item.price}</b></li>
                <li>
                    <button class="btn1" data-id=${item.id} ${item.cart_number<=1? 'disabled':''}>-</button>
                    <input type="text" value="${item.cart_number}">
                    <button class="btn2" data-id=${item.goods_id} ${item.cart_number>=item.goods_number?'disabled':''}>+</button>
                </li>
                <li>￥<b>56.05</b></li>
                <li>
                    <p data-id=${item.id}>删除</p>
                    <p class="sc">移入收藏</p>
                </li>
            </ul>
        </div>
        

        <div class="shopBtm clearfix">
            <ul>
                <li><input type="checkbox" name="quan" ${quan1?'checked':''}></li>
                <li>全选</li>
                <li><a href="#" class="batchDel">批量删除</a></li>
                <li><a href="#">移到我的收藏</a></li>
                <li><span>已选</span><b>${aa[0]}</b><span>件商品</span></li>
                <li>
                    <div class="combined">
                        <span>合计(不含运费)：</span>
                        <span>￥<b>${aa[1]}</b></span>
                    </div>
                    <div class="save">
                        <span>已节省：</span>
                        <span>￥<b>0.00</b></span>
                    </div>
                </li>
                <li>
                    <p>去结算</p>
                </li>
            </ul>
        </div>
        `
        })
        str += `
            </div>
    `
        //在把拼接好的内容添加到大盒子中
        shop.innerHTML = str2 
    } else {
        var str = `
    <div class="emptyCart">
                <h1>购物车空空的哦~，去看看心仪的商品吧~</h1>
                <p>点击下方按钮快去选购吧! ^_^</p>
                <p><a href="../html1/list.html">赶紧去购买吧</a></p>
            </div>
    `
        //把当前字符串添加到大盒子中
        shop.innerHTML = str
    }
}
//給大盒子绑定点击事件
shop.onclick = function (e) {
    // console.log(cartlist)
    var e = e || window.event
    var target = e.target || e.srcElement
    //加法
    if (target.innerHTML == "+") {
        //获取当前商品的id
        var id1 = target.getAttribute('data-id')
        //遍历数组元素
        cartlist.forEach(item => {
            //判断是否为当前操作的商品
            if (item.id == id1) {
                item.cart_number += 1
            }
        })
        //重置localStrong
        localStorage.setItem('cartList', JSON.stringify(cartlist))
        show1()
    }
    //减法
    if (target.innerHTML == '-') {
        //获取id
        var id1 = target.getAttribute('data-id')
        //遍历数组元素
        cartlist.forEach(item => {
            //判断是否为当前操作的商品
            if (item.id == id1) {
                item.cart_number -= 1
            }
        })
        //重置localStrong
        localStorage.setItem('cartList', JSON.stringify(cartlist))
        show1()
    }
    //删除一行
    if (target.innerHTML == '删除') {
        //获取id
        var id1 = target.getAttribute('data-id')
        //遍历数据元素，把满足条件的数据过滤，不满足条件的元素保留
        cartlist2 = cartlist.filter(item => {
            return item.id != id1
        })
        //重置localStrong
        localStorage.setItem('cartList', JSON.stringify(cartlist2))
        //刷新
        location.reload()
    }
    //全选
    if (target.getAttribute('name') == 'quan') {
        //遍历数组中所有的数据
        cartlist.forEach(item => {
            //判断全选框是否被选中
            if (target.checked) {
                //修改所有商品选中框的is_select
                item.is_select = 1
            } else {
                item.is_select = 0
            }
        })
        //重置localStrong
        localStorage.setItem('cartList', JSON.stringify(cartlist))
        show1()
    }
    //选中框
    if (target.getAttribute('name') == 'xuan') {
        //获取当前商品id
        var id1 = target.getAttribute('data-id')
        //遍历数据元素
        cartlist.forEach(item => {
            //判断是否为当前操作商品
            if (item.id == id1) {
                //    item.is_select=item.is_select?0:1
                if (item.is_select == 1) {
                    item.is_select = 0
                } else {
                    item.is_select = 1
                }
            }
        })
        //重置localStrong
        localStorage.setItem('cartList', JSON.stringify(cartlist))
        show1()
    }
    //结算
    if (target.innerHTML == '结算') {
        //确认是否购买
        if (confirm("你确定要购买吗？")) {
            alert("你要支付：" + total1()[1])
            //过滤数组元素
            var cartlist3 = cartlist.filter(item => {
                return item.is_select != 1
            })
            //重置localStrong
            localStorage.setItem('cartList', JSON.stringify(cartlist3))
            location.reload()
        }
    }
    //清空购物车
    if (target.innerHTML == '清空购物车') {
        localStorage.removeItem('cartList')
        // localStorage.setItem('cartList','')
        location.reload()
    }

}
function total1() {
    var num = 0 //总数量
    var price = 0 //总价格
    //遍历cartlist数组
    cartlist.forEach(item => {
        //判断该商品是否被选中
        if (item.is_select == 1) {
            //统计商品总数量
            num += item.cart_number
            //统计总计
            price += parseInt(item.cart_number) * parseFloat(item.price)
        }
    })
    return [num, price.toFixed(2)]
} */

  