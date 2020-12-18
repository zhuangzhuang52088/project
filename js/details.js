/* 下拉列表 */
var cla = document.querySelector(".cla")
var xlLi = document.querySelector(".xl-li-one")
cla.onmouseover = function () {
    xlLi.style.display = 'block'
}
cla.onmouseout = function () {
    xlLi.style.display = 'none'
}






 //获取大盒子对象
var fdjL=document.querySelector('.fdj-l');
//获取地址栏中的参数信息
// console.log(location)
var path1=location.search
var dt; //当前详情信息显示的数据
//判断该参数是否存在
 if(path1){
 //获取参数信息
 var id1=path1.split('?')[1].split('=')[1];
 //使用异步函数发送请求，并获取响应结果
 (async function(){
     var p1=await promiseAjax({
         url:'../php/xiangqing.php',
         data:'id='+id1
     })
     //转换格式
     dt=eval('('+p1+')')
     //设置内容
     var str=`
     <div class='box'>
         <img src="${dt.pic}" alt="">
         <div class='mask'></div>
     </div>
     <div class="fdj-r">
         <div class="fdj-r-top">
             <p>${dt.name}</p>
             <p>当年明月全新修订，经典收藏版</p>
             <p><a href="#">浙江人民出版社</a><span>编</span><a href="#">${dt.author}</a><span>著</span></p>
         </div>
         <div class="fdj-r-mid">
             <p>
                 <span>销售价</span>
                 <span>￥<b>${dt.price}</b></span>
                 <span>￥<b>35.00</b></span>
             </p>
             <p>
                 <span>优惠券</span>
                 <img src="../img1/yhq1.jpg" alt="">
                 <img src="../img1/yhq2.jpg" alt="">
                 <img src="../img1/yhq3.jpg" alt="">
                 <a href="#">更多优惠券</a>
             </p>
         </div>
         <div class="fdj-r-but">
             <span class="fdj-r-but-num">数量</span>
             <div class="num">
                 <button class="btn1">-</button>
                 <input type="text" value="1">
                 <button class="btn2">+</button>
             </div>
         </div>
         <div class="buy">
             <span class="addCar">加入购物车</span>
             <span><a href="../html1/cart.html">立即购买</a></span>
         </div>
     </div>
     <div class='rightBox'>
         <img src="${dt.pic}" alt="">
     </div>
     <div class='imgs'>
         <img src="${dt.pic}" class='border1'>
         <img src="${dt.pic}" alt="">
     </div>
 </div>

</div>
     `
     fdjL.innerHTML=str


     
  /* 放大镜 */
function offset(dom, bool) {
    var t = 0,
        l = 1;
    var bdl = dom.clientLeft; //保存当前元素的左边框
  
    var bdt = dom.clientTop; //保存当前元素的上边框
  
    while (dom) {
      //dom存在就进行循环
      l += dom.offsetLeft + dom.clientLeft;
      t += dom.offsetTop + dom.clientTop; // 每次循环结束：获取上一个父级进入循环
  
      dom = dom.offsetParent;
    }
  
    if (bool) {
      //包含自身边框
      return {
        left: l,
        top: t
      };
    } else {
      //不包含自身边框
      return {
        left: l - bdl,
        top: t - bdt
      };
    }
  }
  
  var box = document.querySelector(".box");
  var rightBox = document.querySelector(".rightBox");
  var mask = document.querySelector(".mask");
  var rightImg = document.querySelector(".rightImg");
  var footDiv=document.querySelector('.imgs')
  var boxImg=document.querySelector('.boxImg')

  //获取小图片组
  var imgs=footDiv.querySelectorAll('img')
  
  box.onmousemove = function (eve) {
    //定义形参，传递事件对象
    var e = eve || event; // 通过获取鼠标在遮罩层中间位置，遮罩层跟随鼠标移动：
  
    var maskleft = e.pageX - offset(box).left - mask.clientWidth / 2; //获取左边坐标
  
    var masktop = e.pageY - offset(box).top - mask.clientHeight / 2; //获取上边坐标
    // console.log(e.clientY);
    // 现在规定遮罩层出现的边界规定：
  
    if (maskleft < 0) {
      maskleft = 0;
    }
  
    if (maskleft >= box.clientWidth - mask.clientWidth) {
      maskleft = box.clientWidth - mask.clientWidth;
    }
  
    if (masktop < 0) {
      masktop = 0;
    }
  
    if (masktop >= box.clientHeight - mask.clientHeight) {
      masktop = box.clientHeight - mask.clientHeight;
    }
  
    mask.style.left = maskleft + 'px';
    mask.style.top = masktop + "px"; // 现在在遮罩层移动，大图跟着反向移动：
    //首先计算大图移动比例：因为最大距离是盒子大小减遮罩层大小，比例就是移动的距离占最大距离多少，大图也是同样思维
  
    var biliX = maskleft / (box.clientWidth - mask.clientWidth);
    var biliY = masktop / (box.clientHeight - mask.clientHeight);
    var maxLeft = -biliX * (rightImg.clientWidth - rightBox.clientWidth);
    var maxTop = -biliY * (rightImg.clientHeight - rightBox.clientHeight); //将定位位置赋值给大图
    rightImg.style.top = maxTop + "px";
    rightImg.style.left = maxLeft + "px";
  };
  
  box.onmouseenter = function () {
    //鼠标移入，小遮罩层与放大图出现
    mask.style.display = 'block';
    rightBox.style.display = 'block';
  };
  
  box.onmouseleave = function () {
    //鼠标移入，小遮罩层与放大图隐藏
    mask.style.display = 'none';
    rightBox.style.display = 'none';
  }; // li点击事件，选项卡加获取列表页数据
  

//遍历所有小图片组中的图片对象
for (var i = 0; i < imgs.length; i++) {
    //给每个小图片绑定点击事件
    imgs[i].onclick = function () {
        //清空所有小图片对象中的class属性值
        for (var a = 0; a < imgs.length; a++) {
            imgs[a].className = ''
        }
        //在给当前被选中的图片添加class属性值
        this.className = 'border1'
        //获取当前图片对象的src属性值
        var src1 = this.getAttribute('src')
        //给上面左右盒子中的图片设置src属性值
        boxImg.setAttribute('src', src1)
        rightImg.setAttribute('src', src1)
    }
}

var btn1=document.querySelector(".btn1")
var btn2=document.querySelector(".btn2")
var inp=document.querySelector(".num input")
btn2.onclick = function(){
    var txtVal = inp.value;
    // 判断value中的值是大于1还是等于1
    if (txtVal >= 1){
      txtVal++;
    }
    inp.value = txtVal
  }
  btn1.onclick = function(){
    var txtVal = inp.value;
    // 判断value中的值是大于1还是等于1
    if (txtVal > 1){
      txtVal--;
    }else{
      txtVal = 1
      alert('商品不能少于一个');
    }
    inp.value = txtVal
  }


 })()
 }else{
     alert("非法进入")
     location.href='../html1/list.html'
 }

 


//给大盒子绑定点击事件
fdjL.onclick=function(e){
    var e = e || window.event
    var target=e.target || e.srcElement
    //判断点击的对象是否为“加入购物车”
    if(target.innerHTML=="加入购物车"){
       //获取localStrong中的cartList
       var cartList=localStorage.getItem("cartList")
       if(cartList){
          var a=0 //判断要添加的数据是否存在
          //把字符串转为数组对象
          cartList=JSON.parse(cartList)
          //遍历cartlist数组中所有数据
          cartList.forEach((item)=>{
            //当前满足条件时，代表当前添加的数据在localStorage中存在
             if(item.id==dt.id){
               item.cart_number=++item.cart_number
               a++
               localStorage.setItem('cartList',JSON.stringify(cartList))
             }
          })
          //判断当前添加的商品是否存在
          if(a==0){
            //修改添加的商品数量
            dt.cart_number=1
            //把当前商品追加到cartList数组中
            cartList.push(dt)
            //更新localStorage中的数据
            localStorage.setItem('cartList',JSON.stringify(cartList))
          }
       }else{
         //修改添加的商品数量
         dt.cart_number=1
         console.log(dt);
         //在localStrong设置一个cartList属性
         localStorage.setItem('cartList',JSON.stringify([dt]))
       }
    }
  }









  $(function (){


    // 点击加入购物车
    $('.fdj-l').on('click','.buy .addCar',function (){
      // 获取当前点击商品的编号
      var id = $(this).attr('id')
      
      // localStorage  key = value
                //  goods = [{code:'abc1',num:1},{code:'abc2',num:2}]
      // 判断本地存储是否有数据
      if (localStorage.getItem('.fdj-l')) {
        var goodsArr = JSON.parse( localStorage.getItem('.fdj-l') )
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
      localStorage.setItem('.fdj-l',JSON.stringify(goodsArr))
  
      alert('添加购物车成功')
  
    })
  
  })






