<script setup>
import { ref } from "vue";

import TheCameraRig from "./TheCameraRig.vue";
import TheMainRoom from "./TheMainRoom.vue";
import TheIsland from "./TheIsland.vue";

defineProps({
  scale: Number,
  overlaySelector: String,
});

const allAssetsLoaded = ref(false);
</script>

<template>
  <!--ajout du fog-->
  <!--mettre stats si on veut voir les statistiques-->
  <a-scene
    fog="type: linear; color: #87CEEB; near: 3; far: 9, density : -0.1"
    background="color: #87CEEB;"
    :awebxr="`
      requiredFeatures: local-floor;
      referenceSpaceType: local-floor;
      optionalFeatures: dom-overlay;
      overlayElement: ${overlaySelector};
    `"
    axr-mode-ui="XRMode: xr"
    aphysx="
      autoLoad: true;
      delay: 1000;
      useDefaultScene: false;
      wasmUrl: lib/physx.release.wasm;
    "
  >
    <!--assets-->
    <a-assets @loaded="allAssetsLoaded = true">
      <a-asset-item
        id="room"
        src="assets/interieur-piece-principale.glb"
      ></a-asset-item>
      <!--son lorsqu'on clique sur un objet (fossile ou cerise)-->
      <a-asset-item
        id="click-sound"
        src="assets/click-resource-sound.mp3"
      ></a-asset-item>
      <!--mon île-->
      <a-asset-item
        id="physic-room"
        src="assets/ile-animal-crossing.glb"
      ></a-asset-item>
      <!--bol pour ressource-->
      <a-asset-item id="bol" :src="`assets/bol.glb`"></a-asset-item>
      <!--sapin-->
      <a-asset-item id="sapin" :src="`assets/sapin.glb`"></a-asset-item>
      <!--maison sur l'île-->
      <a-asset-item id="maison" :src="`assets/maison.glb`"></a-asset-item>
      <!--cerise-->
      <a-asset-item id="cerise" :src="`assets/cerise2.glb`"></a-asset-item>
      <!--fossile -->
      <a-asset-item id="fossile" :src="`assets/fossile.glb`"></a-asset-item>
      <!--tom nook personnage sur île-->
      <a-asset-item
        id="tom-nook"
        :src="`assets/tom-nook-personnage.glb`"
      ></a-asset-item>
      <!--rounard personnage-->
      <a-asset-item
        id="rounard"
        :src="`assets/rounard-personnage.glb`"
      ></a-asset-item>
    </a-assets>
    <template v-if="allAssetsLoaded">
      <TheMainRoom :scale="scale" />
      <TheIsland />
    </template>
    <TheCameraRig />
  </a-scene>
</template>
