const game = document.getElementById("game");

function randomInt(min,max)
{
    return Math.floor(Math.random()*(max-min) + min);
}

function animateCapybara(posX, posY)
{
    const capybaraContainer = document.createElement('div');
    capybaraContainer.setAttribute("class", "container");
    const capybara = document.createElement('img');
    capybara.setAttribute("src", "https://media.discordapp.net/attachments/1209498921622179871/1222294294979936306/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvcHg2ODc3OTEtaW1hZ2Utcm01MDMtbDBqOXJsYTkucG5n.png?ex=6615b145&is=66033c45&hm=a6956aa05aba3dc8f1ea577621d3bfc5df99224cf905fdb02f802798ffba653f&=&format=webp&quality=lossless");
    capybara.style.position = 'absolute';
    capybara.style.left = `${posX}px`;
    capybara.style.top = `${posY}px`;
    capybaraContainer.appendChild(capybara);
    game.appendChild(capybaraContainer);
}

animateCapybara(randomInt(50,2560), randomInt(50,1080));
animateCapybara(randomInt(50,2560), randomInt(50,1080));