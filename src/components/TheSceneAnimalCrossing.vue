<script setup>
import { ref } from "vue";
import "../aframe/look-at.js";
import "../aframe/bind-position.js";
import "../aframe/bind-rotation.js";

const sceneText = ref('"Fake grab" demo');
const sceneTextColor = "white";
let itemsInHand = 0;

function ceriseOnClick() {
  console.log("Cerise clicked");

  // Récupérer l'élément de la cerise
  const ceriseElm = document.getElementById("cherry-2");

  // Récupérer l'élément du bol
  const bolElm = document.getElementById("bol");

  // Masquer la cerise
  ceriseElm.setAttribute("visible", false);

  // Placer la cerise dans le bol
  bolElm.appendChild(ceriseElm);

  // Mettre à jour le texte
  itemsInHand++;
  sceneText.value = `Items in hand: ${itemsInHand}`;
}
</script>

<template>
  <a-entity :text="`value:${sceneText}; color: ${sceneTextColor}; align: center; width: 8`" position="0 1.8 -6"
    look-at></a-entity>

  <a-box position="0 0 -6" rotation="0 45 0" clickable data-target="cherry-hand-2" opacity="0.5" color="red"
    @click="ceriseOnClick()">
    <a-entity id="cherry-2" gltf-model="#cerise"></a-entity>
  </a-box>

  <!-- Ajoutez un élément pour représenter le bol -->
  <a-box id="bol" position="0 0 -8" width="1" height="1" depth="1" color="yellow" opacity="0.5"></a-box>
</template>
