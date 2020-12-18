var user=document.querySelector(".user")
var pass=document.querySelector(".pass")
var sbt=document.querySelector(".sbt")

// 注册
sbt.onclick = function (){
    var us = user.value
    var ps = pass.value
  
    // 验证
    if (!us || !ps) {
      alert('账号或密码不能为空')
      return
    }
  
  
    // 提交数据
    ajax({
      url: '../php/registered.php',
      type: 'post',
      data: {
        user: us,
        pass: ps,
        type: 'add',
      },
      dataType: 'json',
      success: function (json){
        alert(json.msg)
      },
      error:function (code){
        alert(code)
      }
    })
  
  }