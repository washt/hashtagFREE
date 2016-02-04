$(function (){
   $('#submit').click(function () {
      $.ajax({
         url:"/createEvent",
         method:"POST",
         data:{name:$("#name").val()},
         success:function (data) {console.log(data)},
      });
   });
});
