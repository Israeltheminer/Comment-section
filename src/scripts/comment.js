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
   console.log($(".you").val())
})