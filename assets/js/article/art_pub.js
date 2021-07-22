$(function(){

    var layer=layui.layer;
    var form=layui.form;
    getArtCat();
    // 初始化富文本编辑器
    initEditor();
     // 1. 初始化图片裁剪器
  var $image = $('#image')
  
  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }
  
  // 3. 初始化裁剪区域
  $image.cropper(options)

  //为选择封面按钮注册点击事件
    $('#chooseCover').on('click',function(){
        $('#fileCover').click();
    })

    $('#fileCover').on('change',function(e)
    {
      var files=e.target.files;
      if(files.length==0)
      {
          return
      }

       var newImgURL = URL.createObjectURL(files[0]);
            $image
          .cropper('destroy')      // 销毁旧的裁剪区域
          .attr('src', newImgURL)  // 重新设置图片路径
          .cropper(options)        // 重新初始化裁剪区域
      })

//定义文章的发布状态
var art_state='已发布';
//   给存为草稿按钮注册事件
$('#saveDraft').on('click',function()
{
    art_state='草稿';
})

$('#form-pub').on('submit',function(e)
{
    e.preventDefault();
   var fd=new FormData($(this)[0]);
   fd.append('state',art_state);
   

   $image
  .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
    width: 400,
    height: 280
  })
  .toBlob(function(blob) {       // 将 Canvas 画布上的内容，转化为文件对象
    // 得到文件对象后，进行后续的操作
    fd.append('cover_img',blob);
    publishArticle(fd);
  })
})


  

 //定义发布文章函数
 function publishArticle(fd)
 {
     $.ajax({
         method:'POST',
         url:'/my/article/add',
         contentType:false,
         processData:false,
         data:fd,
         success:function(res){
             console.log(res);
             if(res.status!=0)
             {
                 return layer.msg(res.message);
             }
             layer.msg(res.message);
             location.href='/article/art_list.html'
         }
     })
 }


    //获取文章类别
    function getArtCat(){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
                if(res.status!=0)
                    layer.msg(res.message);
                var htmlStr=template('cat_mode',res);
                // console.log(res);
                $('#cat-list').html(htmlStr);
                form.render();
            }
        })
    }

   
})