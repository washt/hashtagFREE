$(function (){
   $('#submit').click(function () {
      $.ajax({
         url:"/createEvent",
         method:"POST",
         data:{
		 name: $("#name").val(),
                 description: $("#description").val(),
      		 datetime: $("#datetime").val(),
           	 location: $("#location").val(),
      		 tags: $("#tags").val().split(','),
	      }
         success:function (data) {console.log(data)},
      });
   });
});
