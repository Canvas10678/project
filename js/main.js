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

////////////////////////////////////////////////////////////////////////////

// เริ่มการทำงาน
if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready)
}
else{
    ready();
}

// ทำfunction
function ready(){
    // ลบสินค้า
    var removeCartButtons = document.getElementsByClassName("fa fa-close");
    console.log(removeCartButtons);
    for(var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i];
        button.addEventListener("click",removeCartItem);
    }
    // quantity changes
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for(var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change",quantityChanged);
    }
    // add cart
    var addCart = document.getElementsByClassName("material-icons");
    for(var i = 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener('click',addCartClicked);
    }
    //buy button
    document.getElementsByClassName("bt-buy")[0]
    .addEventListener("click",buyButtonClicked)
}
//buy button
function buyButtonClicked(){
    alert("ซื้อเรียบร้อย");
    var cartContent = document.getElementsByClassName("cart-content")[0];
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}

////////////////////////////////////////////////////////////////////////////

// ลบสินค้า
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}
// quantity changes
function quantityChanged(event){
    var input = event.target
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updatetotal();
}
// เพิ่มสินค้า
function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.querySelectorAll(".shop-content div.product-img img")[0].src;
    addProductToCart(title,price,productImg);
    updatetotal();
}

function addProductToCart(title,price,productImg){
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for(var i = 0; i < cartItemsNames.length; i++){
        if(cartItemsNames[i].innerText == title){
            alert("คุณได้เพิ่มสินค้าเรียบร้อยแล้ว");
            return;
        }   
    }  
    var cartBoxContent = `
                            <img src="${productImg}" class="cart-img">
                            <div class="detail-box">
                                <div class="cart-product-title">${title}</div>
                                <div class="cart-price">${price}</div>
                                <input type="number" value="1" class="cart-quantity">
                            </div>  
                            <!-- ลบ --> 
                            <i id="close" class="fa fa-close"></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox
    .getElementsByClassName("fa fa-close")[0]
    .addEventListener("click", removeCartItem);   
    cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);  
}
////////////////////////////////////////////////////////////////////////////

//อัปเดตสินค้า
function updatetotal(){
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for(var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("$",""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
        document.getElementsByClassName('total-price')[0].innerText = "$" + total;
}
////////////////////////////////////////////////////////////////////////////
var main = document.getElementById("HideAndShow");
var bill = document.getElementById("popup");
var click = document.getElementById("cart-icon");
var hideHead = document.getElementById("Header");
bill.style.display = "none";

click.addEventListener("click",function(){
    if(bill.style.display === "block") {
        bill.style.display = "none";
        main.style.display = "block";
        hideHead.style.display = "block";
    }
    else{
        bill.style.display = "block";
        main.style.display = "none";
        hideHead.style.display = "none";
    }
})