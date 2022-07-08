const $ = require("jquery");

function getCookie(name) {
   const value = `; ${document.cookie}`;
   const parts = value.split(`; ${name}=`);
   if (parts.length === 2) return parts.pop().split(';').shift();
}
let stringedInfo = decodeURIComponent(getCookie("userInfo"))
let parsedInfo = JSON.parse(stringedInfo)

let username = parsedInfo.username
$(function(){
   $(`.you.${username}`).removeClass('hide')
   $(".reply_button").removeClass("hide")
   $(`.reply_button.${username}`).addClass("hide")
   $(`.user_edits.${username}`).removeClass("hide")
})

$(".reply_button").on("click", function(){
   $("html, body").animate({ scrollTop: $(document).height() - window.innerHeight });
   let replied_user = $(this).find("input:nth-of-type(1)").val()
   let replied_id = $(this).find("input:nth-of-type(2)").val()
   $(".reply-info").removeClass("hide")
   $(".reply-image").attr("src", `dist/assets/images/avatars/image-${replied_user}.webp`)
   $("#replied_id").val(replied_id)
   $("#replied_user").val(replied_user)
})

$(".cancel_reply_button").on("click", function(){
   $(".reply-info").addClass("hide")
   $("#replied_id").val("")
   $("#replied_user").val("")
})

$(".delete_form").on("click", function(){
   $(this).submit()
})