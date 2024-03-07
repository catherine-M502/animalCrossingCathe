import { ref } from "vue";

// Fonction de service de minuterie
export function useTimer() {
  const time = ref(0);

  // Fonction pour démarrer la minuterie
  function start(initialValue) {
    time.value = initialValue;

    const interval = setInterval(() => {
      time.value--;
      if (time.value <= 0) {
        clearInterval(interval);
        // Gérez ce que vous devez faire lorsque le compte à rebours atteint zéro
      }
    }, 1000);
  }

  // Autres fonctions ou données que vous pourriez avoir besoin

  // N'oubliez pas de retourner ce dont vous avez besoin
  return {
    time,
    start,
    // Autres données ou fonctions
  };
}
