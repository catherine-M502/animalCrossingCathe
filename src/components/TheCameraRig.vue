<script setup>
import '../aframe/disable-in-vr.js';
import '../aframe/hide-in-vr.js';
import '../aframe/simple-navmesh-constraint.js';
import '../aframe/blink-controls.js';
import '../aframe/physx-grab.js';


</script>
<!--Mettre le bol ici à la place pour la main gauche !-->

<template>
  <a-entity id="camera-rig" movement-controls="camera: #head;" disable-in-vr="component: movement-controls;">

    <a-entity id="head" look-controls="pointerLockEnabled: true"
      asimple-navmesh-constraint="navmesh: [data-role='nav-mesh']; height: 1.65;"
      adisable-in-vr="component: simple-navmesh-constraint;" camera position="0 1.65 0">

      <a-entity geometry="primitive: circle; radius: 0.0003;" material="shader: flat; color: white;" cursor
        raycaster="far: 4; objects: [clickable]; showLine: false;" position="0 0 -0.1"
        disable-in-vr="component: raycaster; disableInAR: false;" hide-in-vr="hideInAR: false"></a-entity>

      <a-entity id="dummy-hand-right" position="0.3 -0.4 -0.5"></a-entity>

      <a-entity id="dummy-hand-left" position="-0.3 -0.4 -0.5">
        <a-entity id="bol" gltf-model="url(assets/bol.glb)" rotation="0 90 0" position="0 0 0" scale="5 5 5"
          clickable></a-entity>
      </a-entity>
    </a-entity>

    <a-entity id="hand-left" hand-controls="hand: left" blink-controls="
          cameraRig: #camera-rig;
          teleportOrigin: #head;
          collisionEntities: [data-role='nav-mesh'];
          snapTurn: false;
        " position="0 1.5 0" physx-grab>
      <a-entity id="bol" gltf-model="url(assets/bol.glb)" rotation="0 90 0" position="0 0 -2" scale="5 5 5" clickable>
      </a-entity>

      <a-entity :key="index" v-for="index in cerisesInBol" geometry="primitive: box; width: 1; height: 1; depth: 1"
        material="color: blue" position="0 0.5 0"></a-entity>


    </a-entity>
    <a-sphere id="hand-left-collider" radius="0.02" visible="false"
      physx-body="type: kinematic; emitCollisionEvents: true">
    </a-sphere>
  </a-entity>

  <a-entity id="hand-right" hand-controls="hand: right" laser-controls="hand: right"
    raycaster="far: 4; objects: [clickable]; showLine: true;" position="0 1.5 0" physx-grab>
    <a-sphere id="hand-right-collider" radius="0.02" visible="false"
      physx-body="type: kinematic; emitCollisionEvents: true">
    </a-sphere>
  </a-entity>
  <!-- <a-entity id="desktop-hand-right" class="hand" position="0.3 1.1 -0.5" rotation="0 0 0" color="yellow" width="0.5"
    height="0.1" depth="0.5" opacity="0.5">
    <a-box id="cherry-hand-1" class="hand" position="-0.15 0.075 0" rotation="0 0 0" color="red" width="0.1"
      height="0.1" depth="0.1" opacity="1" visible="false"></a-box>
    <a-box id="cherry-hand-2" class="hand" position="0 0.075 -0.15" rotation="0 0 0" color="green" width="0.1"
      height="0.1" depth="0.1" opacity="1" visible="false"></a-box>
    <a-box id="cherry-hand-3" class="hand" position="0.15 0.075 0" rotation="0 0 0" color="blue" width="0.1"
      height="0.1" depth="0.1" opacity="1" visible="false"></a-box>
  </a-entity> -->
</template>