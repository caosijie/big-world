$(function(){

    var form=layui.form;
    var layer=layui.layer;

    //为表单设置校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
        samePwd:function(value){
            if(value==$('[name=oldPwd]').val()){
                return '新密码不能与旧密码相同！';
            }
        },
        rePwd:function(value){
            if(value!=$('[name=newPwd]').val()){
                return '两次输入的密码不一样';
            }
        }
        
    })

    //更新密码
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!=0)
                    return layer.msg(res.message);
                layer.msg('密码更新成功!');
                 //清空表单
                $('.layui-form')[0].reset();
            }
           
            
            
        })
    })
})