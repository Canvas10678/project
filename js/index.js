function checkCookie(){
    var username = "";
    if(getCookie("username")==false){
        window.location = "index.html";
    }
}

checkCookie();
window.onload = pageLoad;

function getCookie(name){
    var value = "";
    try{
        value = document.cookie.split("; ").find(row => row.startsWith(name)).split('=')[1]
        return value
    }catch(err){
        return false
    } 
}

