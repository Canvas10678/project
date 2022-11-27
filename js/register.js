window.onload = pageLoad;
function pageLoad()
{

    let clickButton = document.getElementById("myform");
    clickButton.onsubmit = validateForm;

}

function validateForm() {
    let password1 = document.forms["myForm"]["password1"].value;
    let password2 = document.forms["myForm"]["password2"].value;

    if(password1 != password2)
    {
        alert("Username or password does not match.");
        return false;

    }

}