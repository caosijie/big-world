$(function(){
    var layer=layui.layer;
 
    getuserInfo();

    //实现退出功能
    $('.userinfo').on('click',function(){
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            //do something
            // 1.清空本地token值
            localStorage.removeItem('token');
            //2.返回登录界面
            location.href='/login.html';
            
            layer.close(index);
          });
    })
})



function getuserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        success:function(res){
                if(res.status!=0)
                {
                    return layer.msg(res.message);
                }
                // console.log(res);
                renderImg(res.data);
            }
        
        
    })
}

function renderImg(user)
{
    var name=user.nickname||user.username;
    $('.welcome').html('欢迎&nbsp&nbsp'+name);

    // 用户设置了头像
    if(user.user_pic!=null)
    {
        $('.layui-nav-img').attr('src',user.user_pic);
        $('.layui-nav-img').show();
        $('.text-avatar').hide();
    }
    else
    {
        $('.text-avatar').html(name[0])
        $('.layui-nav-img').hide();
        $('.text-avatar').show();
    }

}