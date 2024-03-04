AFRAME.registerComponent("spawn-text", {
  schema: {
    value: { type: "string" },
  },

  init: function () {
    console.log("spawn-text init");
    let text = document.createElement("a-text");
    let el = this.el;
    let sound = this.data.sound;
    console.log(this.data.value);
    text.setAttribute("value", this.data.value);
    text.setAttribute("position", "0 2.3 0");
    text.setAttribute("visible", false);
    text.setAttribute("geometry", "primitive: plane; width: 4; height: 0.5");
    text.setAttribute(
      "material",
      "color: white; opacity: 0.7; side: double; transparent: true; metalness: 0.5; roughness: 0.5"
    );

    el.appendChild(text);

    el.addEventListener("click", function () {
      text.setAttribute("visible", "true");
    });

    el.addEventListener("unclick", function () {
      text.setAttribute("visible", "false");
    });
  },
});
