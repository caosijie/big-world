
$.ajaxPrefilter(function(options)
{
    options.url='http://api-breakingnews-web.itheima.net'+options.url;
    options.headers = {
        Authorization: localStorage.getItem('token') || ''
      };
    options.complete=function(res){
        if(res.responseJSON.status==1 && res.responseJSON.message=="身份认证失败！")
        {
            console.log(res);
            // 1.强制清除token
            localStorage.removeItem('token');
            //2.返回登录页面
            location.href='/login.html';
        }
    }
})