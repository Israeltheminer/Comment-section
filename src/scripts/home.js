const $ = require("jquery");

$(".user_name").on("click", function(){
   $(this).parent().parent().submit()
})

$(".user_image").on("click", function(){
   $(this).parent().parent().submit()
})