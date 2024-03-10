<script setup>
import PortalTeleporter from "./PortalTeleporter.vue";
import "../aframe/life-like-automaton.js";
import "../aframe/physx-force-pushable.js";
import "../aframe/clickable.js";
import "../aframe/bind-position.js";
import "../aframe/bind-rotation.js";
import "../aframe/look-at.js";

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
      <a-entity position="0 -0.89 0"> </a-entity>
    </a-entity>
    <!-- sapin -->
    <a-entity gltf-model="#sapin" position="1.517 0 -1.061" scale=".05 .05 .05">
    </a-entity>

    <a-entity gltf-model="#sapin" position="1.926 0 -.624" scale=".05 .05 .05">
    </a-entity>

    <a-entity gltf-model="#sapin" position="1 0 -0.3" scale=".05 .05 .05">
    </a-entity>
    <!--texte du personnage tom nook-->
    <a-entity>
      <a-plane position="1.907 0.15 .1" geometry="width: 0.4; height: 0.06" material="color: #B2885E; opacity: 0.8"
        look-at="" center></a-plane>
      <a-text align="center" value="Tom Nook : Thanks for helping me" position="1.907 0.15 .1" color="white"
        scale="0.1 0.1 0.1 " look-at=""></a-text>
    </a-entity>

    <PortalTeleporter id="portal-physic-to-main" label="Back to the town hall" material="src: #room-physic-out-texture"
      position="1 0 0.3" rotation="0 180 0" :rot="90" scale=".2 .2 .2" :cameraEffect="true" :cameraY="1.65"
      :cameraRot="-180" />
  </a-entity>

  <!-- physic room navigation mesh -->
  <a-entity geometry="primitive: plane; height: 100; width: 100" position="0 200.01 0" rotation="-90 0 0"
    data-role="nav-mesh" material="color: green" visible="false"></a-entity>


</template>
