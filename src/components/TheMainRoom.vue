<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { copyPosition, copyRotation } from '../utils/aframe.js';
import PortalTeleporter from './PortalTeleporter.vue';
import '../aframe/life-like-automaton.js';
import '../aframe/bind-position.js';
import '../aframe/bind-rotation.js';
import '../aframe/look-at.js';

defineProps({
  scale: Number,
});
//Test avec les cubes (pour ensuite le faire avec des cerises)
const cubesInBol = ref(0);
//Cerises
const cerisesInBol = ref(0);

function grabTheThing(evt) {
  const el = evt.target;
  const grabbedEl = document.querySelector('[data-grabbed]');

  if (grabbedEl) {

  }
  el.setAttribute('bind-position', 'target: #hand-right');
  el.setAttribute('bind-rotation', 'target: #hand-right; convertToLocal: true');
  el.dataset.grabbed = true;

  // Augmenter le nombre de cubes dans le bol
  cubesInBol.value++;
  //Augmenter le nombre de cerises
  cerisesInBol.value++;

  updateCubesCounter();

  updateCerisesCounter();
}

function dropTheThing(evt) {
  const grabbedEl = document.querySelector('[data-grabbed]');

  if (!grabbedEl) return;

  grabbedEl.removeAttribute('bind-position');
  grabbedEl.removeAttribute('bind-rotation');
  copyPosition(evt.target, grabbedEl);
  copyRotation(evt.target, grabbedEl);
  delete grabbedEl.dataset.grabbed;

  if (evt.target.id === 'bol') {

    grabbedEl.parentNode.removeChild(grabbedEl);
    cubesInBol.value--;
    cerisesInBol.value--;
  }
  updateCubesCounter();
  updateCerisesCounter();
  delete grabbedEl.dataset.dropped;
}
function updateCubesCounter() {
  const counterTextEntity = document.querySelector('#cubes-counter');
  if (counterTextEntity) {
    counterTextEntity.setAttribute('text', `value: Cubes in Bol: ${cubesInBol.value}; color: white; align: center; width: 5;`);
  }
}
function updateCerisesCounter() {
  const counterTextEntityCerise = document.querySelector('#cerises-counter');
  if (counterTextEntityCerise) {
    counterTextEntityCerise.setAttribute('text', `value: ${cerisesInBol.value} sec. et ... cerise(s) ramassee(s); color: orange; width: 5`);
  }
}

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

onMounted(() => {
  const rounard = document.querySelector('#rounard');
  const head = document.querySelector('#head');

  if (rounard && head) {
    rounard.setAttribute('look-at', { target: `#${head.id}` });
  }

  const interval = setInterval(() => {
    if (countdownValue.value > 0) {
      countdownValue.value--;
    } else {
      clearInterval(interval);
    }
  }, 1000);
  //console.log('Position of head:', head.getAttribute('position'));

});

</script>

<template>

  <a-entity id="countdownText" position="4 201 -5" look-at=""
    animation="property: scale; to: 1.1 1.1 1.1; dir: alternate; loop: true"
    :text="`value: ${countdownValue} sec. et ... cerise(s) ramassee(s); color: white; width: 5`"></a-entity>
  <a-entity countdown></a-entity>

  <a-entity gltf-model="#room" rotation="0 90 0" position="2 0 -3" scale=".1 .1 .1">

    <a-entity geometry="primitive: plane; height: 2; width: 2;" position="2 2 3.9" rotation="-180 0 0"
      life-like-automaton="resolution: 64; maxGen: 30;  birthRule: 3,4,5,6,7; survivalRule: 5,6;"></a-entity>

    <a-entity geometry="primitive: plane; height: 2; width: 2;" position="2 2 -3.9"
      life-like-automaton="maxGen: 10; birthRule: 6,7,8; survivalRule: 4,5,6,7,8;"></a-entity>

    <a-entity id="cubes-counter" position="-0.233 2005 -17.985" rotation="360 180 0" scale="5 5 5"
      text="value: Cubes in Bol: 0; color: red; align: center; width: 20; font: https://cdn.aframe.io/fonts/Exo2Bold.fnt; letter-spacing: 5;"
      look-at=""></a-entity>

    <!-- rounard personnage qui regarde la caméra(moi)-->

    <a-entity id="rounard" gltf-model="#rounard" rotation="0 90 0" position="-30 0.807 -8" scale="100 100 100"
      look-at="">
    </a-entity>

    <!-- frigo-->
    <a-entity id="frigo" gltf-model="#frigo" rotation="2 -180 0" position="35 1 -10" scale="12 10 10">
    </a-entity>

    <a-entity id="drop-zone-right" geometry="primitive: sphere; phiLength: 180; radius: 0.5; thetaLength: 90;"
      material="color: purple; side: double" position="-11.970 7.239 -13.367" rotation="90 0 180" clickable
      @click="evt => dropTheThing(evt)"></a-entity>

    <a-box id="box-1-grabbable" color="red" scale="1 1 1" position="-26.464 7.506 -19.442" clickable
      @click="evt => grabTheThing(evt)"></a-box>

    <a-box id="box-test-grabbable" color="yellow" scale="1 1 1" position="-25 7.506 -19.442" clickable
      @click="evt => grabTheThing(evt)"></a-box>

    <PortalTeleporter label="Enter the Life Cube Room" life-like-automaton="resolution: 256;" position="-7.99 1.5 0"
      rotation="0 90 0" :rot="180" :y="100" />

    <PortalTeleporter id="portal-physic-room" label="Aller sur l'île d'Animal Crossing"
      material="src: #room-physic-texture" position="20 9 -36.2" rotation="5 5 5" scale="3.5 3.5 3.5" :rot="180"
      :y="200" :cameraEffect="true" :cameraY="201" :cameraX="3.2" :cameraZ="0" :cameraRot="-90" />
  </a-entity>

  <ExitDoor />

  <!-- Main room navigation mesh  -->

  <a-entity geometry="primitive: plane; height: 13.5; width: 6" position="0 0.01 -4.75" rotation="-90 0 0"
    data-role="nav-mesh" material="color: blue" visible="false"></a-entity>
  <a-entity geometry="primitive: plane; height: .5; width: 5" position="0 0.01 -11.75" rotation="-90 0 0"
    data-role="nav-mesh" material="color: red" visible="false"></a-entity>

</template>
