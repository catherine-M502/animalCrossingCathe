<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { copyPosition, copyRotation } from '../utils/aframe.js';
import PortalTeleporter from './PortalTeleporter.vue';
import '../aframe/life-like-automaton.js';
import '../aframe/bind-position.js';
import '../aframe/bind-rotation.js';
import '../aframe/look-at.js';
import TheIsland from './TheIsland.vue';
import '../aframe/gameover-display.js';
//mettre à 0 pour enlever le cube de la cerise
const hitboxOpacity = 0.5;

defineProps({
  scale: Number,
});
//Test avec les cubes (pour ensuite le faire avec des cerises)
const score = ref(0);
//Cerises
//const cerisesInBol = ref(0);

function grabTheThing(evt) {
  const el = evt.target;
  const grabbedEl = document.querySelector('[data-grabbed]');

  if (grabbedEl) {

  }
  el.setAttribute('bind-position', 'target: #hand-right');
  el.setAttribute('bind-rotation', 'target: #hand-right; convertToLocal: true');

  const itemScore = el.getAttribute("data-score");
  console.log(itemScore);

  el.dataset.grabbed = true;

  // Augmenter le nombre de cubes dans le bol
  // score.value++;
  score.value += parseInt(itemScore);
  //Augmenter le nombre de cerises
  //cerisesInBol.value++;

  updateCubesCounter();

  // updateCerisesCounter();
  //}

  // function dropTheThing(evt) {
  //   const grabbedEl = document.querySelector('[data-grabbed]');

  //   if (!grabbedEl) return;

  //   grabbedEl.removeAttribute('bind-position');
  //   grabbedEl.removeAttribute('bind-rotation');
  //   copyPosition(evt.target, grabbedEl);
  //   copyRotation(evt.target, grabbedEl);
  //   delete grabbedEl.dataset.grabbed;

  //   if (evt.target.id === 'bol') {

  //     grabbedEl.parentNode.removeChild(grabbedEl);
  //     score.value--;
  //     cerisesInBol.value--;
  //   }
  //   updateCubesCounter();
  // updateCerisesCounter();
  //delete grabbedEl.dataset.dropped;
}
function updateCubesCounter() {
  const counterTextEntity = document.querySelector('#cubes-counter');
  if (counterTextEntity) {
    counterTextEntity.setAttribute('text', `value: Resources grabbed in the bowl: ${score.value}; color: white; align: center; width: 5;`);
  }
}
//function updateCerisesCounter() {
//   const counterTextEntityCerise = document.querySelector('#cerises-counter');
//   if (counterTextEntityCerise) {
//     counterTextEntityCerise.setAttribute('text', `value: ${cerisesInBol.value} sec. et ... cerise(s) ramassee(s); color: orange; width: 5`);
//   }

//}

const countdownValue = ref(68);
let interval;
// const gameOver = ref(false);

function goToIsland() {
  console.log("Go out home");

  // Premier intervalle pour le décompte
  interval = setInterval(() => {
    if (countdownValue.value > 0) {
      countdownValue.value--;
    } else {
      clearInterval(interval);
    }
  }, 1000);
}



onMounted(() => {

  // Autres opérations dans onMounted
  const rounard = document.querySelector('#rounard');
  const head = document.querySelector('#head');
  if (rounard && head) {
    rounard.setAttribute('look-at', { target: `#${head.id}` });
  }
});

onUnmounted(() => {
  // Nettoyer l'intervalle à la désactivation du composant
  clearInterval(interval);
});


</script>

<template>

  <!-- <a-entity id="countdownText" position="4 201 -3" look-at
    animation="property: scale; to: 1.1 1.1 1.1 ; dir: alternate; loop: true"
    :text="`value: ${countdownValue} sec.; color: red; width: 3`" bind-position="target: [camera]"></a-entity> -->

  <!-- <a-entity countdown></a-entity> -->

  <!-- Counter text -->
  <a-entity bind-position="target: [camera]" bind-rotation="target: [camera]">
    <a-entity position="0.75 0 -2">
      <a-entity id="countdownText" look-at animation="property: scale; to: 1.1 1.1 1.1 ; dir: alternate; loop: true"
        :text="`value: ${countdownValue} sec.; color: red; width: 3; align: center`"></a-entity>
    </a-entity>
  </a-entity>

  <a-entity gltf-model="#room" rotation="0 90 0" position="2 0 -3" scale=".1 .1 .1">

    <a-entity geometry="primitive: plane; height: 2; width: 2;" position="2 2 3.9" rotation="-180 0 0"
      life-like-automaton="resolution: 64; maxGen: 30;  birthRule: 3,4,5,6,7; survivalRule: 5,6;"></a-entity>

    <a-entity geometry="primitive: plane; height: 2; width: 2;" position="2 2 -3.9"
      life-like-automaton="maxGen: 10; birthRule: 6,7,8; survivalRule: 4,5,6,7,8;"></a-entity>

    <a-entity id="cubes-counter" position="4 2010 190" rotation="360 180 0" scale="5 5 5"
      text="value: Resources grabbed in bowl: 0; color: red; align: center; width: 20; font: https://cdn.aframe.io/fonts/Exo2Bold.fnt; letter-spacing: 5;"
      look-at=""></a-entity>



    <a-entity v-if="countdownValue === 0" look-at="" id="Fin de la game" position="2 2030 191" rotation="360 180 0"
      scale="50 50 50"
      text="value: Game over;  color: red; align: center; width: 20; font: https://cdn.aframe.io/fonts/Exo2Bold.fnt; letter-spacing: 5;"></a-entity>
    <!-- rounard personnage qui regarde la caméra(moi)-->
    <a-entity id="rounard" gltf-model="#rounard" rotation="0 90 0" position="-30 0.807 -8" scale="100 100 100"
      look-at="constrainVertically:true">
    </a-entity>

    <!-- frigo-->
    <a-entity id="frigo" gltf-model="#frigo" rotation="2 -180 0" position="35 1 -10" scale="12 10 10">
    </a-entity>

    <!-- box test
    <a-box id="box-1-grabbable" color="red" scale="1 1 1" position="-26.464 7.506 -19.442" clickable
      @click="evt => grabTheThing(evt)"></a-box>

    <a-box id="box-test-grabbable" color="yellow" scale="1 1 1" position="-25 7.506 -19.442" clickable
      @click="evt => grabTheThing(evt)"></a-box>-->





    <a-box id="box-4-grabbable" color="pink" scale="4 4 4" position="-30.3 2002 40.507" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)">
      <a-entity gltf-model="#cerise"></a-entity>
    </a-box>
    <a-box id="box-5-grabbable" color="grey" scale="4 4 4" position="-30.3 2007 40.507" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)">
      <a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-6-grabbable" color="grey" scale="4 4 4" position="-30.3 2009 40.507" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-7-grabbable" color="grey" scale="1 1 1" position="-6 2013 40.507" :opacity="hitboxOpacity"
      data-score="3" clickable @click="evt => grabTheThing(evt)">
      <a-entity gltf-model="#fossile"></a-entity>
    </a-box>
    <a-box id="box-8-grabbable" color="gold" scale="4 4 4" position="-30.3 2019 191" :opacity="hitboxOpacity"
      data-score="3" clickable @click="evt => grabTheThing(evt)"></a-box>
    <a-box id="box-9-grabbable" color="purple" scale="4 4 4" position="-20 2014 -220" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-10-grabbable" color="purple" scale="4 4 4" position="-10 2009 191" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-11-grabbable" color="pink" scale="4 4 4" position="-3 2009 191" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-12-grabbable" color="pink" scale="4 4 4" position="4 2009 191" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-12-grabbable" color="gold" scale="4 4 4" position="0 2009 191" :opacity="hitboxOpacity"
      data-score="3" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-13-grabbable" color="gold" scale="4 4 4" position="10 2009 191" :opacity="hitboxOpacity"
      data-score="3" clickable @click="evt => grabTheThing(evt)"></a-box>
    <a-box id="box-14-grabbable" color="yellow" scale="4 4 4" position="-30.3 2022 191" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-15-grabbable" color="grey" scale="4 4 4" position="-30.3 2025 190" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-16-grabbable" color="grey" scale="4 4 4" position="-26 2022 190" :opacity="hitboxOpacity" clickable
      @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-17-grabbable" color="purple" scale="4 4 4" position="-4 2022 190" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-18-grabbable" color="purple" scale="3 3 3" position="-4 2022 190" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-19-grabbable" color="black" scale="3 3 3" position="30 2018 190" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-20-grabbable" color="black" scale="3 3 3" position="30 2010 190" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-21-grabbable" color="purple" scale="4 4 4" position="30 2022 190" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-22-grabbable" color="purple" scale="3 3 3" position="-1 2022 190" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-23-grabbable" color="black" scale="3 3 3" position="-4 2007 190" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-24-grabbable" color="gold" scale="3 3 3" position="-4 2005 190" :opacity="hitboxOpacity"
      data-score="3" clickable @click="evt => grabTheThing(evt)"></a-box>
    <a-box id="box-25-grabbable" color="gold" scale="3 3 3" position="30 2010 190" :opacity="hitboxOpacity"
      data-score="3" clickable @click="evt => grabTheThing(evt)"></a-box>
    <a-box id="box-26-grabbable" color="purple" scale="4 4 4" position="1 2022 190" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-27-grabbable" color="purple" scale="3 3 3" position="-1 2022 180" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-28-grabbable" color="gold" scale="3 3 3" position="-4 2003 170" :opacity="hitboxOpacity"
      data-score="3" clickable @click="evt => grabTheThing(evt)"></a-box>
    <a-box id="box-29-grabbable" color="black" scale="3 3 3" position="-4 1990 190" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity><a-entity
        gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-30-grabbable" color="black" scale="3 3 3" position="-16 2016 35" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-31-grabbable" color="black" scale="3 3 3" position="-4 2018 190" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"></a-box>
    <a-box id="box-32-grabbable" color="black" scale="3 3 3" position="-4 2010 190" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity><a-entity
        gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-33-grabbable" color="purple" scale="4 4 4" position="-2 2022 190" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-34-grabbable" color="purple" scale="3 3 3" position="-1 2022 190" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-35-grabbable" color="black" scale="3 3 3" position="-4 2007 135" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-24-grabbable" color="black" scale="3 3 3" position="-4 2005 136" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-36-grabbable" color="black" scale="3 3 3" position="-4 2010 136" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-37-grabbable" color="purple" scale="4 4 4" position="1 2022 140" :opacity="hitboxOpacity" clickable
      @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-38-grabbable" color="purple" scale="3 3 3" position="0 2022 140" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-39-grabbable" color="black" scale="3 3 3" position="-4 2003 140" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity><a-entity
        gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-40-grabbable" color="black" scale="3 3 3" position="-4 1990 130" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-41-grabbable" color="black" scale="3 3 3" position="-16 2016 35" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-42-grabbable" color="purple" scale="4 4 4" position="1 2022 140" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-43-grabbable" color="purple" scale="3 3 3" position="0 2022 140" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-44-grabbable" color="black" scale="3 3 3" position="-4 2003 120" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-45-grabbable" color="black" scale="1 1 1" position="-4 1990 110" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-46-grabbable" color="black" scale="3 3 3" position="-16 2016 100" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity><a-entity
        gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-47-grabbable" color="black" scale="3 3 3" position="4 2000 99" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-48-grabbable" color="black" scale="3 3 3" position="-4 1970 102" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-49-grabbable" color="black" scale="2 2 2" position="-16 2016 70" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-50-grabbable" color="black" scale="3 3 3" position="-4 1990 200" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-51-grabbable" color="black" scale="3 3 3" position="-16 2016 35" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-52-grabbable" color="purple" scale="4 4 4" position="1 2022 140" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-53-grabbable" color="purple" scale="3 3 3" position="0 2022 140" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-54-grabbable" color="black" scale="3 3 3" position="-4 2003 120" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-55-grabbable" color="black" scale="1 1 1" position="-4 1990 110" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-56-grabbable" color="black" scale="3 3 3" position="-16 2016 100" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-57-grabbable" color="black" scale="3 3 3" position="4 2000 99" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-58-grabbable" color="black" scale="3 3 3" position="-4 1970 102" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-59-grabbable" color="black" scale="2 2 2" position="-16 2016 222" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-60-grabbable" color="black" scale="3 3 3" position="-4 1990 130" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-61-grabbable" color="black" scale="3 3 3" position="-16 2016 35" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-62-grabbable" color="purple" scale="4 4 4" position="1 2022 140" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-63-grabbable" color="purple" scale="4 4 4" position="8 2050 140" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-64-grabbable" color="black" scale="3 3 3" position="-4 2003 120" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-65-grabbable" color="black" scale="1 1 1" position="0 1990 110" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-66-grabbable" color="black" scale="3 3 3" position="-32 2016 100" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity><a-entity
        gltf-model="#cerise"></a-entity><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-67-grabbable" color="black" scale="3 3 3" position="4 2000 99" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-68-grabbable" color="black" scale="3 3 3" position="-8 1970 102" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-69-grabbable" color="black" scale="4 4 4" position="-10 2016 70" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-70-grabbable" color="black" scale="3 3 3" position="-4 1990 130" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-71-grabbable" color="black" scale="3 3 3" position="-16 2016 35" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-72-grabbable" color="purple" scale="4 4 4" position="1 2022 140" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-73-grabbable" color="purple" scale="3 3 3" position="0 2022 140" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-74-grabbable" color="black" scale="3 3 3" position="-4 2003 120" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-75-grabbable" color="black" scale="1 1 1" position="-4 1990 110" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-76-grabbable" color="black" scale="3 3 3" position="-16 2016 90" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-77-grabbable" color="black" scale="3 3 3" position="4 2000 99" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-78-grabbable" color="black" scale="3 3 3" position="-4 1970 102" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-79-grabbable" color="black" scale="2 2 2" position="-16 2016 190" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-80-grabbable" color="black" scale="3 3 3" position="-4 1990 200" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-81-grabbable" color="black" scale="3 3 3" position="-16 2016 35" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-82-grabbable" color="purple" scale="4 4 4" position="1 2022 158" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-83-grabbable" color="purple" scale="4 4 4" position="133 2050 200" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-84-grabbable" color="black" scale="3 3 3" position="130 2003 200" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-85-grabbable" color="black" scale="1 1 1" position="128 1990 100" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-86-grabbable" color="black" scale="3 3 3" position="140 2016 200" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-87-grabbable" color="black" scale="3 3 3" position="126 2000 99" :opacity="hitboxOpacity"
      data-score="1" clickable @click="evt => grabTheThing(evt)"><a-entity gltf-model="#cerise"></a-entity></a-box>
    <a-box id="box-88-grabbable" color="gold" scale="3 3 3" position="120 1970 200" :opacity="hitboxOpacity"
      data-score="3" clickable @click="evt => grabTheThing(evt)"></a-box>
    <a-box id="box-89-grabbable" color="gold" scale="4 4 4" position="-10 2016 200" :opacity="hitboxOpacity"
      data-score="3" clickable @click="evt => grabTheThing(evt)"></a-box>
    <a-box id="box-90-grabbable" color="gold" scale="3 3 3" position="120 2003 200" :opacity="hitboxOpacity"
      data-score="3" clickable @click="evt => grabTheThing(evt)"></a-box>
    <a-box id="box-91-grabbable" color="gold" scale="1 1 1" position="120 1990 130" :opacity="hitboxOpacity"
      data-score="3" clickable @click="evt => grabTheThing(evt)"></a-box>
    <a-box id="box-92-grabbable" color="gold" scale="3 3 3" position="-29 2016 120" :opacity="hitboxOpacity"
      data-score="3" clickable @click="evt => grabTheThing(evt)"></a-box>
    <a-box id="box-93-grabbable" color="gold" scale="3 3 3" position="110 2000 99" :opacity="hitboxOpacity"
      data-score="3" clickable @click="evt => grabTheThing(evt)"></a-box>
    <a-box id="box-94-grabbable" color="gold" scale="3 3 3" position="120 1970 200" :opacity="hitboxOpacity"
      data-score="3" clickable @click="evt => grabTheThing(evt)"></a-box>
    <a-box id="box-95-grabbable" color="gold" scale="4 4 4" position="110 2016 200" :opacity="hitboxOpacity"
      data-score="3" clickable @click="evt => grabTheThing(evt)"></a-box>

    <!-- <PortalTeleporter label="Enter the Life Cube Room" life-like-automaton="resolution: 256;" position="-7.99 1.5 0"
      rotation="0 90 0" :rot="180" :y="100" /> -->

    <PortalTeleporter id="portal-physic-room" label="Go to the isle of Tom Nook" material="src: #room-physic-texture"
      position="20 9 -36.2" rotation="0 0 0" scale="3.5 3.5 3.5" :rot="180" :y="200" :cameraEffect="true" :cameraY="201"
      :cameraX="3.2" :cameraZ="0" :cameraRot="-90" @click="goToIsland()" />

  </a-entity>

  <!-- <ExitDoor /> -->

  <!-- Main room navigation mesh  -->

  <a-entity geometry="primitive: plane; height: 13.5; width: 6" position="0 0.01 -4.75" rotation="-90 0 0"
    data-role="nav-mesh" material="color: blue" visible="false"></a-entity>
  <a-entity geometry="primitive: plane; height: .5; width: 5" position="0 0.01 -11.75" rotation="-90 0 0"
    data-role="nav-mesh" material="color: red" visible="false"></a-entity>


</template>
