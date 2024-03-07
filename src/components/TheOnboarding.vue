<script setup>
import { ref } from 'vue';

defineProps({
  loaded: Boolean,
});

const showOnboarding = ref(true);
const isGameStarted = ref(false);
const countdownValue = ref(60); // Initial value for the countdown


function enterScene() {
  showOnboarding.value = false;
  isGameStarted.value = true;
  console.log("Game started, isGameStarted:", isGameStarted.value);
  if (AFRAME.utils.device.checkHeadsetConnected() && !AFRAME.utils.device.isMobile()) {
    document.querySelector('a-scene').enterVR();
  }
  //ajout de la musique 
  const audioSrc = "assets/animal-crossing-musique.mp3";
  const audioElement = new Audio(audioSrc);
  audioElement.play();

}
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
          <h3>Rules of the game 🎮</h3>
          <ul>
            <li>
              Welcome to the captivating world of <span style="font-weight: bold; color:  pink;">Animal Crossing:Tom
                Nook Island!</span>
              Get ready to embarkon a thrilling adventure to help Tom Nook, the iconic tanuki owner of the village
              store, recover his
              precious resources! They were stolen by the mischievous Rounard, the fox who sells unscrupulous objects!
              He really needs them back to keep the village running smoothly.</li>
            <li>
              <span style="font-weight: bold; color:  pink;">Your mission is clear: locate the resources scattered
                across the picturesque island of
                Tom Nook in the
                bowl you're holding. You have a little over a minute.</span> <span
                style="font-weight: bold; color:  pink;">Once you click on the
                resources</span>(they look like
              <span style="font-weight: bold; color:  pink;">cubes </span> and
              come
              in different colors), it will be directly stored in
              the storage area in the town hall.
              Get ready for an immersive experience in Animal Crossing: Tom Nook Island.
            </li>
            <li>
              How to go there ? You can access it via the <span style="font-weight: bold; color:  pink;"> teleportation
                portal</span>, visible from the town
              hall, go
              there. So be quick, strategic, and above all, be attentive to every corner of the island, because the
              resources could be hiding anywhere!
            </li>
            <li>
              Are you ready to take on the challenge and save Tom Nook's resources? Adventure awaits!
            </li>
          </ul>
          <h4>Sources</h4>
          <ul>
            <li>
              Animal Crossing Map,
              Sketfab,
              License: CC Attribution-NonCommercial-ShareAlikeCC Attribution-NonCommercial-ShareAlike
            </li>
            <li>
              FREE DOWNLOAD Low poly nature pack,
              Sketfab,
              License:CC Attribution
            </li>
            <li>
              Animal Crossing New Leaf- Tom Nook,
              Sketfab,
              Licence: CC Attribution
            </li>
            <li>
              Fridge,
              Sketfab,
              Licence: Free Standard
            </li>
            <li>
              Animal Crossing House,
              Sketfab,
              Licence: CC Attribution
            </li>
            <li>
              Animal Crossing fox Redd,
              Sketfab,
              Licence: CC Attribution
            </li>
            <li>
              Mary Rose Bowl - Low Poly,
              Sketfab,
              Licence: CC Attribution
            </li>
            <li>
              Animal Crossing-Resident Serivices Interior,
              Sketfab,
              Licence: CC Attribution
            </li>
          </ul>



          <h4>Movement modes support</h4>
          <ul>
            <li>
              Desktop – Keyboard for move (WASD or Arrows keys) + Mouse for look
              control (Drag and drop)
            </li>
            <li>
              Mobile – 1x Finger touch to go forward + 2x Fingers touch to go
              backward + Gaze cursor for click
            </li>
            <li>
              VR Headset – AR/VR walk + Teleport (Grip for grab and laser for
              click) + Gaze cursor for click
            </li>
          </ul>
        </section>
        <dl>
          <dt>
            <i>Included</i>
          </dt>
          <dt>
            <a href="https://github.com/c-frame/aframe-extras" target="_blank">aframe-extras controls and
              animation-mixer</a>
          </dt>
          <dd>
            <a href="https://github.com/c-frame/aframe-extras/blob/master/LICENSE" target="_blank">MIT License</a>
          </dd>

          <dt>
            <a href="https://github.com/c-frame/physx" target="_blank">aframe physx</a>
          </dt>
          <dd>
            <a href="https://github.com/c-frame/aframe-extras/blob/master/LICENSE" target="_blank">MIT License</a>
          </dd>

          <dt>
            <a href="https://github.com/jure/aframe-blink-controls/" target="_blank">aframe-blink-controls</a>
          </dt>
          <dd>
            <a href="https://github.com/jure/aframe-blink-controls/blob/main/LICENSE" target="_blank">MIT License</a>
          </dd>

          <dt>
            <a href=" https://github.com/AdaRoseCannon/aframe-xr-boilerplate"
              target="_blank">simple-navmesh-constraint</a>
          </dt>
          <dd>
            By Ada Rose Cannon under MIT License
          </dd>

          <dt>
            <a href="https://sketchfab.com/3d-models/vr-gallery-1ac32ed62fdf424498acc146fad31f7e" target="_blank">VR
              Gallery</a>
          </dt>
          <dd>
            by <a href="https://sketchfab.com/mvrc.art" target="_blank">Maxim Mavrichev</a>
            under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY 4.0</a>
          </dd>

          <dt>
            <a href="https://sketchfab.com/3d-models/3d-gallery-for-vr-projects-68f77ed8558c4bd59e0a13e2cc9d1fd1"
              target="_blank">Physic room model</a>
          </dt>
          <dd>
            by <a href="https://sketchfab.com/tekuto1s" target="_blank">tekuto1s</a>
            under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY 4.0</a>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 1.5rem
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
  background-color: white;
  color: black;
  border: none;
  cursor: pointer;
}
</style>#onboarding li {
#onboarding li {
font-size: 1rem;
text-align: left;
}
