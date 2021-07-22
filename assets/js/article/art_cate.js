$(function(){

    var form=layui.form;
    var layer=layui.layer;
    getArtCatList();

    var addIndex=null;
    //添加类别
    $('#addCat').on('click',function(){
        addIndex=layer.open({
            type:1,
            area: ['500px', '250px'],
            title: '添加文章分类'
            ,content: $('#popup-add').html()
          });    
    })

//    添加类别表单提交
    $('body').on('submit','#form_add',function(e){
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function(res)
            {
                if(res.status!=0)
                    return layer.msg(res.message);

                layer.msg(res.message);
                getArtCatList();
                layer.close(addIndex);
            }
        })
    })

    
    // 编辑类别
    var editIndex=null;
    $('body').on('click','#editCat',function(){
        editIndex=layer.open({
            type:1,
            area: ['500px', '250px'],
            title: '修改文章分类'
            ,content: $('#popup-edit').html()
          });    

          var id=$(this).attr('data-id');
        //   console.log(id);
          $.ajax({
              method:'GET',
              url:'/my/article/cates/'+id,
              success:function(res)
              {
                // console.log(res);
                  form.val('form_edit',res.data);
              }
          })
    })

    // 类别修改
    $('body').on('submit','#form_edit',function(e){
        e.preventDefault();
       
        $.ajax({
            method:'POST',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!=0)
                    return layer.msg(res.message);
                layer.msg(res.message);
                layer.close(editIndex);
                getArtCatList();
            }
        })
    })

    //删除类别
    $('body').on('click','#deleteCat',function(){
      var id=$(this).attr('data-id');
        layer.confirm('确定要删除吗？', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method:'GET',
                url:'/my/article/deletecate/'+id,
                success:function(res){
                    if(res.status!=0)
                        return layer.msg(res.message);

                    layer.msg(res.message);
                    getArtCatList()

                }

            })
            
            layer.close(index);
          }); 
            
    })

})

//获取文章列表
function getArtCatList()
{
    $.ajax({
        method:'GET',
        url:'/my/article/cates',
        success:function(res){
            if(res.status!=0)
                return form.msg(res.message);
            // console.log(res);
            var htmlStr=template('art_tem',res);
            $('tbody').html(htmlStr);
        }
    })
}




