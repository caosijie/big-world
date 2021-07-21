
$.ajaxPrefilter(function(options)
{
    options.url='http://api-breakingnews-web.itheima.net'+options.url;
    options.complete=function(res){

        if(res.responseJSON.status==1&&res.responseJSON.message=="身份认证失败！")
        {
            // 1.强制清除token
            localStorage.removeItem('token');
            //2.返回登录页面
            location.href='/login.html';
        }
        console.log(res);
        console.log('执行了complete');
    }
})