<script setup>
import { ref } from 'vue';

import TheCameraRig from './TheCameraRig.vue';
import TheMainRoom from './TheMainRoom.vue';
import TheIsland from './TheIsland.vue';
import TheSceneAnimalCrossing from './TheSceneAnimalCrossing.vue';

defineProps({
  scale: Number,
  overlaySelector: String,
});

const allAssetsLoaded = ref(false);
</script>

<template>
  <a-scene stats _fog="type: linear; color: #87CEEB; near: 3; far: 9, density : -0.1" background="color: #87CEEB;"
    :awebxr="`
      requiredFeatures: local-floor;
      referenceSpaceType: local-floor;
      optionalFeatures: dom-overlay;
      overlayElement: ${overlaySelector};
    `" axr-mode-ui="XRMode: xr" aphysx="
      autoLoad: true;
      delay: 1000;
      useDefaultScene: false;
      wasmUrl: lib/physx.release.wasm;
    ">
    <a-assets @loaded="allAssetsLoaded = true">
      <!--
        Title: VR Gallery
        Model source: https://sketchfab.com/3d-models/vr-gallery-1ac32ed62fdf424498acc146fad31f7e
        Model author: https://sketchfab.com/mvrc.art (Maxim Mavrichev)
        Model license: CC BY 4.0 ( https://creativecommons.org/licenses/by/4.0/ )
      -->
      <a-asset-item id="room" src="assets/interieur-piece-principale.glb"></a-asset-item>
      <!--
        Title: 3D Gallery for VR projects
        Model source: https://sketchfab.com/3d-models/3d-gallery-for-vr-projects-68f77ed8558c4bd59e0a13e2cc9d1fd1
        Model author: https://sketchfab.com/tekuto1s (tekuto1s)
        Model license: CC BY 4.0 ( https://creativecommons.org/licenses/by/4.0/ )
      -->
      <!--mon île-->
      <a-asset-item id="physic-room" src="assets/ile-animal-crossing.glb"></a-asset-item>
      <!--bol pour ressource-->
      <a-asset-item id="bol" :src="`assets/bol.glb`"></a-asset-item>
      <!--sapin-->
      <a-asset-item id="sapin" :src="`assets/sapin.glb`"></a-asset-item>
      <!--maison sur l'île-->
      <a-asset-item id="maison" :src="`assets/maison.glb`"></a-asset-item>
      <!--cerise-->
      <a-asset-item id="cerise" :src="`assets/cerise2.glb`"></a-asset-item>
      <!--argent clochettes -->
      <a-asset-item id="argent" :src="`assets/argent-clochettes.glb`"></a-asset-item>
      <!--argent fossile -->
      <a-asset-item id="fossile" :src="`assets/fossile.glb`"></a-asset-item>
      <!--frigo-->
      <a-asset-item id="frigo" :src="`assets/frigo.glb`"></a-asset-item>
      <!--tom nook personnage sur île-->
      <a-asset-item id="tom-nook" :src="`assets/tom-nook-personnage.glb`"></a-asset-item>
      <!--rounard personnage-->
      <a-asset-item id="rounard" :src="`assets/rounard-personnage.glb`"></a-asset-item>
      <img id="room-physic-out-texture" :src="`assets/main-room-from-physic-room.png`">
      <img id="room-gol-out-texture" :src="`assets/main-room-from-gol-room.png`">
      <img id="room-physic-texture" :src="`assets/physicRoom.png`">
    </a-assets>
    <template v-if="allAssetsLoaded">
      <TheMainRoom :scale="scale" />
      <!---<TheSceneAnimalCrossing />-->
      <TheIsland />
    </template>
    <TheCameraRig />
  </a-scene>
</template>