<template>
  <div class="home">
  
    <Register></Register>
  </div>
</template>

<script>
// @ is an alias to /src
import ListenSocket from "@/components/ListenSocket.vue";
import Register from "@/components/Register.vue";
import LogUI from "@/components/LogUI.vue";
import { ref, inject, computed } from "vue";
import { useStore } from "vuex";
import Request from "@/request.js";

export default {
  name: "Home",

  components: {
    ListenSocket,
    LogUI,
    Register,
  },

  setup() {
    const store = useStore();
    const state = ref(false);
    const content = ref("");

    const socket = inject("socket");

    const request = function () {
      Request.get("/project/state").then((resp) => {
        state.value = JSON.parse(resp["data"]);
      });
    };

    request();

    const start = function () {
      Request.post("/project/start").then((resp) => {
        //state.value = JSON.parse(resp["data"]);
        console.log("run_started", resp);
        request();
      });
    };

    const stop = function () {
      Request.post("/project/stop").then((resp) => {
        //state.value = JSON.parse(resp["data"]);
        request();

        console.log("run_stopped", resp);
      });
    };

    socket.on("run", function (data) {
      console.log("core data", data);
      content.value += data;
    });

    return {
      connected: computed(() => store.getters.connected),
      state,
      start,
      stop,
      content,
    };
  },
};
</script>
