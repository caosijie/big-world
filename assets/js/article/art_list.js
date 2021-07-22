$(function(){

    var layer=layui.layer;
    var form=layui.form;
    var laypage = layui.laypage;
    // 定义获取文章列表所需要携带的参数
    var q={
        pagenum:1,        //页码值
        pagesize:2,       //每页显示多少条数据
        cate_id:'',
        state:''
    };

    // 定义美化时间过滤器
    template.defaults.imports.dateForm=function(date)
    {
        const dt=new Date(date);
        var y=padZero(dt.getFullYear());
        var m=padZero(dt.getMonth()+1);
        var d=padZero(dt.getDate());

        var hh=padZero(dt.getHours());
        var mm=padZero(dt.getMinutes());
        var ss=padZero(dt.getSeconds());

        return y+'-'+m+'-'+d+' '+hh+':'+mm+':'+ss;

    }

    //补零函数
    function padZero(num)
    {
        return num<9?'0'+num:num;
    }

    initTable();
    initCatList();


    //初始化文章列表
    function initTable(){
        $.ajax({
            method:'GET',
            url:'/my/article/list',
            data:q,
            success:function(res){
                if(res.status!=0)
                    return layer.msg(res.message);
                renderPage(res.total);
                // console.log(res);
                var htmlStr=template('list_mode',res);
                $('tbody').html(htmlStr);
            }
        })
    }

    //获取分类列表
    function initCatList(){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
                if(res.status!=0)
                    return layer.msg(res.message);
                
                var htmlStr=template('cat_mode',res);
                console.log(htmlStr);
                $('#all_cat').html(htmlStr);
                form.render();

            }
        })
    }

    //为筛选按钮注册点击事件
    $('#searchForm').on('click',function(e){
        e.preventDefault();
            q.cate_id=$('[name=cate_id]').val();
            q.state=$('[name=state]').val();
            initTable();
    })

    //定义渲染分页的方法
    function renderPage(total)
    {
        laypage.render({
            elem:'pageBox',
            count:total,
            limit:q.pagesize,
            curr:q.pagenum,
            layout:['count','limit','prev','page','next','skip'],
            limits:[2,3,5,10],
            jump:function(obj,first){
                q.pagenum=obj.curr;
                q.pagesize=obj.limit;
                if(!first){
                    initTable();
                }
            }
        })
    }

})



