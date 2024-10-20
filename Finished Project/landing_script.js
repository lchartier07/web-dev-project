const alias = document.getElementById("textbox");

function redirect()
{
    if (alias.value === "" && alias !== null)
    {
        alert("You must enter an alias!");
    }
    else
    {
        localStorage.setItem("name", alias.value);
        window.location = "game_play.html";
    } 
}