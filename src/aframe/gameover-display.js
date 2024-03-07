AFRAME.registerComponent("game-over-display", {
  init: function () {
    // Initialisation du composant
    console.log("Component initialized");

    // Création d'un élément rectangle
    const rect = document.createElement("a-plane");
    rect.setAttribute("width", "4");
    rect.setAttribute("height", "2");
    rect.setAttribute("color", "black");

    // Ajout du texte
    const text = document.createElement("a-text");
    text.setAttribute("value", "Le jeu est terminé");
    text.setAttribute("color", "white");
    text.setAttribute("align", "center");
    text.setAttribute("position", "0 0 0.01"); // Légèrement devant le rectangle

    // Ajout des éléments au composant
    this.el.appendChild(rect);
    this.el.appendChild(text);

    // Cacher l'écran de fin de jeu à l'initialisation
    this.hide();
  },
  show: function () {
    // Affichage de l'écran de fin de jeu
    console.log("Showing game over display");
    this.el.setAttribute("visible", true);
  },
  hide: function () {
    // Cacher l'écran de fin de jeu
    console.log("Hiding game over display");
    this.el.setAttribute("visible", false);
  },
});
