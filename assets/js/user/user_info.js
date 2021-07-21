$(function(){
    var form=layui.form;
    var layer=layui.layer;

    //为用户昵称设置表单验证
    form.verify({
    nickname:function(value)
    {
        if(value.length<1||value.length>6)
        {
            return '昵称长度必须在 1 ~ 6 个字符之间！';
        }
    }
    })

    initUserInfo();

    // 初始化用户信息
    function initUserInfo()
    {
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res){
                if(res.status!=0){
                    return layer.msg(res.message);
                }
                console.log(res);
                //使用form.val对表单进行快速赋值
                form.val('formUserInfo',res.data);
            }
        })
    }

    //重置用户信息
    $('#btnReset').on('click',function(e){
        e.preventDefault();
        initUserInfo();
    })

    //提交用户信息(
    $('#btnModify').on('click',function(e){
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$('.layui-form').serialize(),
            success:function(res){
                if(res.status!=0)
                {
                    layer.msg(res.message);
                }
                layer.msg(res.message);
                
                //通过调用父页面的方法，重新获取头像和用户名
                window.parent.getuserInfo();

                $.ajax({
                    method:'GET',
                    url:'/my/userinfo',
                    success:function(res){
                            if(res.status!=0)
                            {
                                return layer.msg(res.message);
                            }
                            console.log('ok');
                            console.log(res);
                            
                        }
                    
                    
                })
            }
        })
    })
})