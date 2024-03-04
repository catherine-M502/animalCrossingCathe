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

defineProps({
  scale: Number,
});
//ìle Animal Crossing 

//Changements : 
//ce que j'aimerais réaliser : il y a une cerise visible sur l'île et on aimerait la mettre dans le bol de fruits. Pour ce faire : 
//il y a donc à la fois une cerise placée dans le bol visible dans une place définie et une autre cerise visible qui devient invisible
//on efface la fonction grabs

// Tableau pour stocker les positions des cerises dans le bol
const positionsInBol = [
  { x: 1, y: 0.03, z: 0 },
  { x: 2, y: 0.03, z: 0 },
  { x: 1.5, y: 0.03, z: 0 }
];

//Fonction pour rendre la cerise invisible
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

// Composant du compte à rebours
const countdownValue = ref(60);

onMounted(() => {
  const interval = setInterval(() => {
    if (countdownValue.value > 0) {
      countdownValue.value--;
    } else {
      clearInterval(interval);
    }
  }, 1000);
});

onUnmounted(() => {
  clearInterval(interval);
});

</script>

<template>

  <!--  océan-->
  <a-ocean position="500 199.3 -20" color="#92E2E2" width="200" depth="50" density="200" speed="2"></a-ocean>
  <a-entity gltf-model="#physic-room" position="-7 200.1 0" scale="15 15 15">

    <!--  lumière-->
    <a-entity light="type: ambient; color: #EEE; intensity: 1" position="-1 1 0"></a-entity>

    <!--  maison-->
    <a-entity gltf-model="#maison" position="1.1 0.07 -.5" scale=".0007 .0007 .0007">
    </a-entity>


    <!--  tom nook personnage-->
    <a-entity gltf-model="#tom-nook" position="1.9 0.0 0.1" scale=".002 .002 .002" look-at="">
    </a-entity>


    <!-- sapin -->
    <a-entity gltf-model="#sapin" position="0 0.06 -.8" scale=".05 .05 .05">
    </a-entity>

    <a-entity gltf-model="#sapin" position="0 .06 -.6" scale=".05 .05 .05">
    </a-entity>

    <a-entity gltf-model="#sapin" position="1 0 -0.3" scale=".05 .05 .05">
    </a-entity>

    <!-- cerise -->
    <a-entity gltf-model="#cerise" position="1 0.03 0" scale=".06 .06 .06" clickable @click="evt => manageCerise(evt)">
    </a-entity>

    <a-entity gltf-model="#cerise" position="2 0.03 0" scale=".06 .06 .06" clickable @click="evt => manageCerise(evt)">
    </a-entity>

    <a-entity gltf-model="#cerise" position="1.5 0.03 0" scale=".06 .06 .06" clickable
      @click="evt => manageCerise(evt)">
    </a-entity>

    <!-- bol -->
    <a-entity id="bol" gltf-model="#bol" rotation="0 90 0" position="0 3 -2" scale="15 15 15" clickable></a-entity>

    <PortalTeleporter id="portal-physic-to-main" label="Retourner à salle principale"
      material="src: #room-physic-out-texture" position="1 0 0.3" rotation="0 180 0" :rot="90" scale=".2 .2 .2"
      :cameraEffect="true" :cameraY="1.65" :cameraRot="-180" />
  </a-entity>

  <!-- Physic room navigation mesh -->
  <a-entity geometry="primitive: plane; height: 100; width: 100" position="0 200.01 0" rotation="-90 0 0"
    data-role="nav-mesh" material="color: green" visible="false"></a-entity>

  <!-- Compteur de cerises dans le bol -->

  <a-entity id="cerises-counter" position="1 203.76 -21.89" rotation="360 180 0" scale="2 2 2"
    text="value: Cerises in Bol: 0; color: red; align: center; width: 20; font: https://cdn.aframe.io/fonts/Exo2Bold.fnt; letter-spacing: 5;"
    look-at=""></a-entity>

  <a-entity id="countdownTextPhysic" position="1.9 0.0 0.1"
    :text="`value: ${countdownValuePhysic}; color: black; width: 5`"></a-entity>
  <a-entity countdown></a-entity>

</template>