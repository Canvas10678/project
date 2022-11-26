window.onload = pageLoad;

function pageLoad(){
    var xhr = new XMLHttpRequest(); 
    xhr.open("GET", "product.json"); 
    xhr.onload = function() { 
        var jsondata = JSON.parse(xhr.responseText);
        console.log(jsondata);
        showData(jsondata);
    }; 
    xhr.onerror = function() { alert("ERROR!"); }; 
    xhr.send();
}

function showData(layer){
	console.log(Object.keys(layer).length);
    var show_img = document.querySelectorAll(".shop-content div.product-img");
    var show_name = document.querySelectorAll(".shop-content div.product-title");
    var show_price = document.querySelectorAll(".shop-content div.price");
    var keys = Object.keys(layer);
    for(var i =0; i< keys.length;i++){     
        var s_img = document.createElement("img");
        var s_name = document.createElement("h4");
        var s_price = document.createElement("span");
        s_name.innerHTML = layer[keys[i]].name;
        s_price.innerHTML = layer[keys[i]].price;
        s_img.src = layer[keys[i]].pic;
        show_img[i].appendChild(s_img);    
        show_name[i].appendChild(s_name);
        show_price[i].appendChild(s_price);
    }
}