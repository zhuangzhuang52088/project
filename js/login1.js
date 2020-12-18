//获取地址栏中的参数信息
var seach1=location.search
//获取操作对象
var btn1=document.querySelector('.btn1')

//给提交按钮绑定点击事件
btn1.onclick=function(){
    //获取输入框中的value值
    var user=document.querySelector('.user').value
    var pass=document.querySelector('.pass').value
    //判断地址栏中是否有参数
    if(seach1){
        //分割参数地址
        var newUrl=seach1.split('=')[1];
        //使用ajax发送登录请求
        (async function(){
            var p1=await promiseAjax({
                url:'../php/login.php',
                data:`username=${user}&password=${pass}`
            })
            //判断返回的结果是否为1
            if(p1==1){
                //添加cookie
                setCookie('name',user,100)
                //登录成功时，跳转到指定的页面中
                location.href=newUrl
            }else{
                alert('账号或密码有误')
            }
        })()
    }else{
        //使用ajax发送登录请求
        (async function(){
            var p1=await promiseAjax({
                url:'../php/login.php',
                data:`username=${user}&password=${pass}`
            })
            //判断返回的结果是否为1
            if(p1==1){
                //添加cookie
                setCookie('name',user,100)
                //登录成功时，跳转到指定的页面中
                location.href='./index.html'
            }else{
                alert('账号或密码有误')
            }
        })()
    }
    //阻止表单的默认提交行为
    return false;
}

