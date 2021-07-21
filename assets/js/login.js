$(function(){

    //当点击了去注册账号按钮
    $('#link_reg').on('click',function(){
        $('.login').hide();
        $('.register').show();
    })

    $('#link_lg').on('click',function(){
        $('.login').show();
        $('.register').hide();
    })

    // 导入layui对象
    var form=layui.form;
    var layer=layui.layer;

    form.verify({
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
        repass:function(value)
        {
            var password=$('.register [name=password]').val();
           
            if(password!=value)
                return '两次密码输入不一致'
        }
    })

    //为注册用户按钮注册提交事件
    $('#reg_form').on('submit',function(e){

        e.preventDefault();
        $.post('/api/reguser',{
            username:$('#reg_form [name=username]').val(),
            password:$('#reg_form [name=password]').val(),
        },function(res)
        {
            if(res.status!=0)
            {
                return layer.msg(res.message);
            }
           layer.msg('注册成功,请登录');
           //模拟点击去登陆按钮
           $('#link_lg').click();
        })
    })

    //为登录按钮注册提交事件
    $('#lg_form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/api/login',
            data:$('#lg_form').serialize(),
            success:function(res){
                if(res.status!=0)
                {
                    return layer.msg(res.message);
                }
                layer.msg('登录成功');
                localStorage.setItem('token',res.token);
                location.href='/index.html'
                console.log(res);
            }
        })
    })
    
})