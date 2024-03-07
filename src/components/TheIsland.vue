<script setup>
import PortalTeleporter from './PortalTeleporter.vue';
import '../aframe/life-like-automaton.js';
import '../aframe/physx-force-pushable.js';
import '../aframe/clickable.js';
import '../aframe/bind-position.js';
import '../aframe/bind-rotation.js';
import { ref, onMounted, onUnmounted } from 'vue';
import '../aframe/look-at.js';
import '../aframe/spawn-text.js';
import '../aframe/gameover-display.js';
import TheMainRoom from './TheMainRoom.vue';


defineProps({
  scale: Number,
});

function getItem(evt) {
  console.log("Get item");

  const item = evt.target;
  const targetElm = document.getElementById(item.getAttribute("data-target"));

  targetElm.setAttribute("visible", true);

  item.setAttribute("visible", false);
  item.removeAttribute("clickable");
  item.removeEventListener("click", this.getItem);

  itemsInHand += 1;
  sceneText.value = `Items in hand: ${itemsInHand}`;
}

function dropItems(evt) {
  if (itemsInHand <= 0) return;

  console.log("Drop items");

  const dropArea = evt.target;
  const dropAreaTargets = dropArea.children;

  for (let i = 0, l = dropAreaTargets.length; i < l; i++) {
    const handElm = document.getElementById(
      dropAreaTargets[i].getAttribute("data-target")
    );

    // Check that item is "visible" in teh hand
    if (handElm.getAttribute("visible") === true) {
      dropAreaTargets[i].setAttribute("visible", true);
      handElm.setAttribute("visible", false);
    }
  }

  itemsInHand = 0;
  sceneText.value = `Items in hand: ${itemsInHand}`;
}



//ìle Animal Crossing 

//Changements : 
//ce que j'aimerais réaliser : il y a une cerise visible sur l'île et on aimerait la mettre dans le bol de fruits. Pour ce faire : 
//il y a donc à la fois une cerise placée dans le bol visible dans une place définie et une autre cerise visible qui devient invisible
//on efface la fonction grabs

// Tableau pour stocker les positions des cerises dans le bol
/*
const positionsInBol = [
  { x: 1, y: 0.03, z: 0 },
  { x: 2, y: 0.03, z: 0 },
  { x: 1.5, y: 0.03, z: 0 }
];
*/
//Fonction pour rendre la cerise invisible
/*
function manageCerise(evt) {
  const el = evt.target;
  el.setAttribute('visible', 'false');
  //Bol
  const bol = document.querySelector('#bol');
  el.setAttribute('position', bol.getAttribute('position'));

  // Pour que la cerise soit visible dans le bol
  el.setAttribute('visible', 'true');

  // Mettre à jour le compteur de cerises dans le bol 
  const cerisesCounter = document.querySelector('#cerises-counter');
  const currentCount = parseInt(cerisesCounter.getAttribute('text').value.split(': ')[1]);
  cerisesCounter.setAttribute('text', `value: Cerises in Bol: ${currentCount + 1}; color: green; align: center; width: 20; font: https://cdn.aframe.io/fonts/Exo2Bold.fnt; letter-spacing: 5;`);
}
*/


const isGameStarted = ref(false);

// const countdownValue = ref(113);
// let interval;
// const gameOver = ref(false);

// onMounted(() => {
//   if (isGameStarted.value) {
//     interval = setInterval(() => {
//       if (countdownValue.value >= 0) {
//         const countdownText = document.querySelector('#countdownText');
//         countdownText.setAttribute('text', `value: ${countdownValue.value} secondes; width: 5`);
//         countdownValue.value--;
//       } else {
//         clearInterval(interval);
//         gameOver.value = true;
//       }
//     }, 1000);
//   }
// });

// onUnmounted(() => {
//   clearInterval(interval);
// });

</script>

<template>

  <!--  océan-->
  <a-ocean position="500 199.3 -20" color="#92E2E2" width="220" depth="50" density="200" speed="2"></a-ocean>
  <a-entity gltf-model="#physic-room" position="-7 200.1 0" scale="15 15 15">

    <!--  lumière-->
    <a-entity light="type: ambient; color: #EEE; intensity: 1" position="-1 1 0"></a-entity>

    <!--  maison-->
    <a-entity gltf-model="#maison" position="1.1 0.07 -.5" scale=".0007 .0007 .0007">
    </a-entity>

    <!--  tom nook personnage-->
    <a-entity gltf-model="#tom-nook" position="1.9 0.0 0.1" scale=".002 .002 .002" look-at="constrainVertically:true">
      <a-entity position="0 3 0">
      </a-entity>
    </a-entity>
    <!-- sapin -->
    <a-entity gltf-model="#sapin" position="1.517 0 -1.061" scale=".05 .05 .05">
    </a-entity>

    <a-entity gltf-model="#sapin" position="1.926 0 -.624" scale=".05 .05 .05">
    </a-entity>

    <a-entity gltf-model="#sapin" position="1 0 -0.3" scale=".05 .05 .05">
    </a-entity>
    <a-entity>
      <a-plane position="1.907 0.15 .1" geometry="width: 0.4; height: 0.06" material="color: #B2885E; opacity: 0.8"
        look-at="" center></a-plane>
      <a-text align="center" value="Tom Nook : Thanks for helping me" position="1.907 0.15 .1" color="white"
        scale="0.1 0.1 0.1 " look-at=""></a-text>
    </a-entity>


    <!--
    <a-box _brush="activeColor: #00ff00; context: screen" id="espace-bol-cerise" class="hand" position="0.3 1.1 -0.5"
      rotation="0 0 0" color="yellow" width="0.5" height="0.1" depth="0.5" opacity="0.5">

      <a-box id="cherry1" class="hand" gltf-model="#cerise" position="1 0.03 0" scale=".06 .06 .06"
        data-target="cherry-hand-1" @click="(evt) => getItem(evt)" visible="false"></a-box>
      <a-box id="cherry2" class="hand" gltf-model="#cerise" position="2 0.03 0" scale=".06 .06 .06"
        data-target="cherry-hand-2" @click="(evt) => getItem(evt)" visible="false"></a-box>
      <a-box id="cherry3" class="hand" gltf-model="#cerise" position="1.5 0.03 0" scale=".06 .06 .06" clickable
        data-target="cherry-hand-3" @click="(evt) => getItem(evt)" visible="false"></a-box>
    </a-box>

  -->
    <!--
    <a-entity :text="`value:${sceneText}; color: ${sceneTextColor}; align: center; width: 8`" position="0 1.8 -6"
      look-at></a-entity> -->

    <!--

    <a-box position="0 -9 1" rotation="0 45 0" clickable data-target="cherry-hand-1" @click="(evt) => getItem(evt)"
      opacity="0.5"><a-entity id="cherry-2" gltf-model="#cerise">
      </a-entity></a-box>

    <a-box position="0 0 -6" rotation="0 45 0" clickable data-target="cherry-hand-2" @click="(evt) => getItem(evt)"
      opacity="0.5"><a-entity id="cherry-2" gltf-model="#cerise">
      </a-entity> </a-box>

    <a-box width="1" height="1" depth="1" position="1.9 0.8 -0.5" rotation="0 45 0" clickable
      data-target="cherry-hand-3" opacity="0.5" @click="(evt) => getItem(evt)"><a-entity id="cherry-2"
        gltf-model="#cerise">
      </a-entity></a-box>
-->

    <!-- Entité parente pour les éléments d'écran de fin de jeu -->
    <a-entity position="0 0 0" rotation="0 0 0">
      <!-- Éléments de jeu -->

      <!-- Éléments d'écran de fin de jeu 
      <a-box v-if="gameOver" position="0 1.6 -1.156" rotation="0 0 0" width="100" height="100" color="black"
        opacity=20></a-box>


      <a-text v-if="gameOver" position="0 1.6 -1.156" rotation="0 0 0" align="center" color="white" value="Game Over"
        depthTest="false">
      </a-text>
-->
    </a-entity>

    <PortalTeleporter id="portal-physic-to-main" label="Back to the town hall" material="src: #room-physic-out-texture"
      position="1 0 0.3" rotation="0 180 0" :rot="90" scale=".2 .2 .2" :cameraEffect="true" :cameraY="1.65"
      :cameraRot="-180" />
  </a-entity>

  <!-- Physic room navigation mesh -->
  <a-entity geometry="primitive: plane; height: 100; width: 100" position="0 200.01 0" rotation="-90 0 0"
    data-role="nav-mesh" material="color: green" visible="false"></a-entity>

  <!-- Compteur de cerises dans le bol 

  <a-entity id="cerises-counter" position="1 203.76 -21.89" rotation="360 180 0" scale="2 2 2"
    text="value: Cerises in Bol: 0; color: red; align: center; width: 20; font: https://cdn.aframe.io/fonts/Exo2Bold.fnt; letter-spacing: 5;"
    look-at=""></a-entity>-->

</template>