<template>
  <div class="home">
    <div v-if="connected == false">
      <!-- <sl-progress-bar indeterminate>  </sl-progress-bar> -->
      <sl-spinner style="font-size: 3rem; --track-width: 6px"></sl-spinner>
    </div>
    <div v-else>
      <template v-if="state">
        <sl-button variant="danger" @click="stop">Stop</sl-button>

        <sl-tooltip content="Log">
          <sl-textarea resize="auto" :value="content" readonly></sl-textarea>
        </sl-tooltip>
      </template>
      <template v-else>
        <sl-button variant="success" @click="start">Start</sl-button>
      </template>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ListenSocket from "@/components/ListenSocket.vue";
import LogUI from "@/components/LogUI.vue";
import { ref, inject, computed } from "vue";
import { useStore } from "vuex";
import Request from "@/request.js";

export default {
  name: "Home",

  components: {
    ListenSocket,
    LogUI,
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
