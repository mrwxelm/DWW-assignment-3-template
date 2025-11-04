document.addEventListener("DOMContentLoaded", () => {
  
    // documentation for adafruit IO : https://github.com/methio/adafruitIO-class
    // documentation for alwan color picker : https://github.com/sefianecho/alwan
    // documentation for Name That Color (NTC) : https://chir.ag/projects/ntc/

    const user = "mrwxelm";
    const key = "aio_CUTa43FjQ3HfUfw0uwCoAY0f00bi"
    const IO = new AdafruitIO(user, key);

    //destination pour les couleurs a ajouter
    const lightColor = document.getElementById("light-color"); //div where i want to add the colors typed online
  
    //carres de couleurs presents a la base
    const existing = ['#7486CC', '#321CCA', '#9067FF', '#CC2112'];

    //iterate over the thing to give a color to each div?
    existing.forEach(color => {
        lightColor.innerHTML += `<div class="light-color" style="background-color: ${color};" data-color="${color}"></div>`;
        console.log("color added to the page")
    });

    const slider = document.getElementById("brightness");

    slider.addEventListener("change", () => {
      IO.postData("brightness", slider.value);
    });

    //alwan color picker
    const alwan = new Alwan("#alwan-picker", {
        theme: "light",
        popover: false, //pour que ca soit toujours sur l'ecran mais rien ne s affiche
        toggle: false,
        margin: 3,
        inputs: { rgb: false, hex: true, hsl: false}, 
        opacity: false,
    });

    //extraire le nom de la couleur selectionee et l afficher au lieu de "this color"
    alwan.on('change', (ev) => { //ev.hex = la couleur choisie
      // console.log( ntc.name(ev.hex))
      const colorName = ntc.name(ev.hex)[1]; //ntc.name(ev.hex) = nom de la couleur choisie
      const newColorName = document.getElementById("new-color-name");
      newColorName.innerHTML = colorName;   //nom de la couleur selectionnee affiche dans le bouton new-color-name     
    });


    //Pour ajouter chaque couleur utilise au container favorites
    const buttonCreateColor = document.getElementById("button-add-color"); //bouton qui va permettre de creer un nouveau rond
    buttonCreateColor.addEventListener("click", () => { //when you click on it
        const newColor = alwan.getColor().hex; //define new color using its hex
        lightColor.innerHTML += `<div class="light-color" style="background-color: ${newColor};" data-color="${newColor}"></div>`; //Create a div pour nouvel element
        Colors = document.querySelectorAll(".light-color"); 
        console.log(newColor); //comment changer ca pour que la couleur soit envoyée quand j appuie sur le div 
    });

    const buttonPickColor = document.getElementById("light-color");
    buttonPickColor.addEventListener("click", (e) => {
      
      if (e.target.classList.contains("light-color")) {
        const clickedColor = e.target.dataset.color; //color defined as the target on which we clickeds color
        IO.postData("color", clickedColor); //Sent it to lamp
        console.log("Color sent:", clickedColor);
      }
    });
    

    //on/off behavior
    const onOffToggle = document.getElementById("toggle");

    //of is the default at the start
    onOffToggle.checked = false; //hence 0
    IO.postData("onoff", 0);

    onOffToggle.addEventListener("change", () => {
      const state = onOffToggle.checked ? 1 : 0;
      IO.postData("onoff", state);
      console.log("onoff =", state);
    });

 

    

});

 