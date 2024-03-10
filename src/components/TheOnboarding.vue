<script setup>
import { ref } from "vue";
// A noter que le jeu peut prendre du temps à charger
defineProps({
  loaded: Boolean,
});

const showOnboarding = ref(true);

function enterScene() {
  showOnboarding.value = false;
  if (
    AFRAME.utils.device.checkHeadsetConnected() &&
    !AFRAME.utils.device.isMobile()
  ) {
    document.querySelector("a-scene").enterVR();
  }
  //ajout de la musique de fond Animal Crossing
  const audioSrc = "assets/animal-crossing-musique.mp3";
  const audioElement = new Audio(audioSrc);
  audioElement.play();
}
// page d'accueil du jeu VR Animal Crossing : Tom Nook Island
</script>

<template>
  <div id="onboarding" v-if="showOnboarding">
    <div>
      <h1>A-Frame + Vite + Vue Boilerplate</h1>
      <h2>Animal Crossing :🌴 Tom Nook Island 🌴</h2>
      <p v-if="!loaded">loading...</p>
      <button v-if="loaded" @click="enterScene()">Start</button>
      <div class="licences">
        <section>
          <h3>Rules of the VR game 🎮</h3>
          <ul>
            <li>
              Welcome to the captivating and immersive world of
              <span style="font-weight: bold; color: pink">Animal Crossing:Tom Nook Island!</span>
              Get ready to embarkon on a thrilling adventure to help Tom Nook, the
              iconic tanuki owner of the village store, recover his precious
              resources! They were stolen by the mischievous Rounard, the fox
              who sells unscrupulous objects! He really needs them back to keep
              the village running smoothly.
            </li>
            <li>
              <span style="font-weight: bold; color: pink">Your mission is clear: collect as many points as possible by picking up resources scattered across
                the picturesque island of Tom Nook in the bowl you're holding.
                You have a little over a minute.</span>
              <span>To grab, simply point your joystick at the resource that interests you (</span>
              <span style="font-weight: bold; color: pink">note that the cherry is worth 1 point and the fossil 3 points.)</span> <span>So opt for fossils to gain the maximum number of points.</span>
            </li>
            <li>
              How to go to the island ? You can access it via the
              <span style="font-weight: bold; color: pink">
                teleportation portal</span>, visible from the town hall. Be quick and strategic.
            </li>
            <li>
              Are you ready to take on the challenge and save Tom Nook's
              resources? Adventure awaits!
            </li>
          </ul> 
        </section>
        <dl>
          <dt>
            <i>Included ✔️</i>
          </dt>
<dt>
            <a href="https://sketchfab.com/3d-models/animal-crossing-map-9f53cb8a02134037887875e022b2eae2" target="_blank">Isle</a>
          </dt>
          <dd> by
            <a href="https://sketchfab.com/loupyboy" target="_blank">Loupyboy</a>
            under
            <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank"> CC BY NC SA 4.0</a>
          </dd>
<dt>
            <a href="https://sketchfab.com/3d-models/free-download-low-poly-nature-pack-cb45d4926fcb4807bc93126b59325cf8" target="_blank">Nature (cherry and fir)</a>
          </dt>
          <dd> by
            <a href="https://sketchfab.com/gostbento" target="_blank">Bento</a>
            under
            <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank"> CC BY 4.0</a>
          </dd>
          <dt>
            <a href="https://sketchfab.com/3d-models/animal-crossing-new-leaf-tom-nook-3855b1d8020d4bb2bc1ce98717bf4ba2" target="_blank">Tom Nook</a>
          </dt>
          <dd> by
            <a href="https://sketchfab.com/akennedy007" target="_blank">akennedy007</a>
            under
            <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank"> CC BY 4.0</a>
          </dd>
  <dt>
            <a href="https://sketchfab.com/3d-models/animal-crossing-house-68fd7b3b59d8441e82e64960620ac0e2" target="_blank">House</a>
          </dt>
          <dd> by
            <a href="https://sketchfab.com/JMGameDev" target="_blank">JMGameDev</a>
            under
            <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank"> CC BY 4.0</a>
          </dd>
<dt>
            <a href="https://sketchfab.com/3d-models/animal-croissing-fox-redd-3549745fbdac4bc2b3a412432a75a490" target="_blank">Rounard</a>
          </dt>
          <dd> by
            <a href="https://sketchfab.com/LunaEagle" target="_blank">LunaEagle</a>
            under
            <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank"> CC BY 4.0</a>
          </dd>
         <dt>
            <a href="https://sketchfab.com/3d-models/mary-rose-bowl-low-poly-b747abc1a0db4d62bc2f9319177bac37" target="_blank">Bowl</a>
          </dt>
          <dd> by
            <a href="https://sketchfab.com/tauricity" target="_blank">John Fino (tauricity)
</a>
            under
            <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank"> CC BY 4.0</a>
          </dd> 
<dt>
            <a href="https://sketchfab.com/3d-models/animal-crossing-resident-services-interior-94ba7ce8a73b487d92895093bd4ddbb0" target="_blank">Town Hall</a>
          </dt>
          <dd> by
            <a href="https://sketchfab.com/Garu.The.Ninja" target="_blank">Garu
</a>
            under
            <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank"> CC BY 4.0</a>
          </dd> 
<dt>
            <a href="https://www.youtube.com/watch?v=jcxQXX5z7NY" target="_blank">Click Music</a>
          </dt>
          <dd> by
            <a href="https://www.youtube.com/@bigbeargaming8590" target="_blank">
Big Bear Gaming
</a>
          </dd> 
          <dt>
            <a href="https://www.youtube.com/watch?v=PJ5FMwfyB08&t=979s" target="_blank">Background Music</a>
          </dt>
          <dd> by
            <a href="https://www.youtube.com/@crispydonut426" target="_blank">
CrispyDonut
</a>
          </dd> 
          <dt>
            <a href="https://sketchfab.com/3d-models/3ds-animal-crossing-new-leaf-fossil-dbeebdc369224fcd992842f270a8770d" target="_blank">Fossil</a>
          </dt>
          <dd> by
            <a href="https://sketchfab.com/hilalarican23" target="_blank">U.A.C.WAD</a>
            under
            <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank"> CC BY 4.0</a>
          </dd>
<dt>
            <a href="https://github.com/c-frame/aframe-extras" target="_blank">Aframe-extras controls and animation-mixer</a>
          </dt><dd>
            <a href="https://github.com/c-frame/aframe-extras/blob/master/LICENSE" target="_blank">MIT License</a>
          </dd>

          <dt>
            <a href="https://github.com/c-frame/physx" target="_blank">Aframe physx</a>
          </dt><dd>
            <a href="https://github.com/c-frame/aframe-extras/blob/master/LICENSE" target="_blank">MIT License</a>
          </dd>

          <dt>
            <a href="https://github.com/jure/aframe-blink-controls/" target="_blank">Aframe-blink-controls</a>
          </dt><dd>
            <a href="https://github.com/jure/aframe-blink-controls/blob/main/LICENSE" target="_blank">MIT License</a>
          </dd>

          <dt>
            <a href="https://github.com/diarmidmackenzie/aframe-multi-camera/" target="_blank">Aframe-multi-camera</a>
          </dt><dd>
            <a href="https://github.com/diarmidmackenzie/aframe-multi-camera/blob/main/LICENSE" target="_blank">MIT License</a>
          </dd>

          <dt>
            <a href=" https://github.com/AdaRoseCannon/aframe-xr-boilerplate" target="_blank">Simple-navmesh-constraint</a>
          </dt><dd>
            By Ada Rose Cannon under MIT License
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 1.5rem;
}

a {
  color: #eee;
  text-decoration: none;
}

.licences {
  margin: 2rem 0;
  font-size: 1rem;
  text-align: left;
}

.licences dt {
  padding-top: 0.75rem;
  font-size: 0.9rem;
  font-weight: bold;
}

.licences dd {
  margin-left: 0;
  font-size: 0.8rem;
}

#onboarding {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #967456;
  color: #ccc;
  width: 100vw;
  height: 100vh;
  padding: 1rem;
  font-family: monospace;
  z-index: 10000;
  overflow: auto;
}

#onboarding>* {
  margin: 0 auto;
  max-width: 50rem;
  width: calc(100vw - 10rem);
  text-align: center;
  border-radius: 0.3rem;
  padding: 1rem;
  font-size: 1.3rem;
}

#onboarding button {
  font-size: 1.3rem;
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;
  background-color: rgb(211, 211, 177);
  color: rgb(38, 35, 35);
  border: none;
  cursor: pointer;
}
</style>
#onboarding li { #onboarding li { font-size: 1rem; text-align: left; }
