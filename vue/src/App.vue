<template>
  <div>
    <sl-dropdown class="theme-picker">
      <sl-button
        size="small"
        pill=""
        slot="trigger"
        caret=""
        type="default"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <sl-text>{{ displayTheme }}</sl-text>
      </sl-button>
      <sl-menu role="menu" v-on:sl-select="changeTheme($event)">
        <sl-menu-item
          value="light"
          aria-disabled="false"
          aria-checked="false"
          :checked="theme == 'light' ? true : false"
          role="menuitem"
          tabindex="0"
          >Light</sl-menu-item
        >
        <sl-divider aria-orientation="horizontal" role="separator"></sl-divider>
        <sl-menu-item
          value="dark"
          aria-disabled="false"
          aria-checked="true"
          :checked="theme == 'dark' ? true : false"
          role="menuitem"
          tabindex="-1"
          aria-selected="true"
          >Dark</sl-menu-item
        >
      </sl-menu>
    </sl-dropdown>

    <!-- 		<div v-if="state.project == true" id="nav">
 -->
    <sl-tab-group>
      <router-link to="/">
        <sl-tab class="animate__animated animate__fadeInLeft" panel="general">
          Project
        </sl-tab>
      </router-link>
    </sl-tab-group>
    <!-- 		</div>
		<div v-else>
			<router-view />
		</div> -->

    <!-- <sl-textarea id="info" :placeholder="details" readonly resize="none"></sl-textarea> -->
    <sl-details id="info">
      Hostname: {{ hostname }}<br />
      User: {{ user }}<br />
      Viur: {{ state.viur }}<br />
      Path: {{ path }}
    </sl-details>
  </div>
  <router-view></router-view>
</template>

<script>
//import { Request } from "@/request.js";
import { ref, computed, reactive, inject } from "vue";
import Request from "@/request.js";
import { useStore } from "vuex";
import router from "@/router";

export default {
  setup() {
    const store = useStore();

    const state = reactive({
      viur: "",
      project: false,
    });

    const path = ref("");
    const user = ref("");
    const hostname = ref("");

    const socket = inject("socket");

    socket.on("connect", function () {
      store.commit("connected", true);
    });

    Request.get("/has/viur").then((resp) => {
      let details = JSON.parse(JSON.stringify(resp.data));
      if (details != null && details["state"]) state.viur = details["version"];
    });

    Request.get("/path").then((resp) => {
      if (resp.data != null) path.value = resp.data;
    });

    Request.get("/user").then((resp) => {
      if (resp.data != null) user.value = resp.data;
    });

    Request.get("/hostname").then((resp) => {
      if (resp.data != null) hostname.value = resp.data;
    });

    Request.get("/has/project").then((resp) => {
      let details = JSON.parse(JSON.stringify(resp.data));
      if (details != null && details["state"]) {
        state.project = details["state"];
        if (!state.project) router.push({ path: "/welcome" });
      }
    });

    const changeTheme = function (item) {
      store.commit("theme", item.detail.item.value);
    };

    return {
      user,
      hostname,
      state,
      path,
      theme: computed(() => store.state.theme),
      displayTheme: computed(
        () =>
          store.state.theme.charAt(0).toUpperCase() + store.state.theme.slice(1)
      ),
      changeTheme,
    };
  },
};
</script>

<style lang="less">
#nav {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #071420;
  list-style-type: none;
  margin: 0;
  padding: 0;
  text-align: center;
}

body {
  background-color: var(--sl-color-neutral-0);
  /* color: rgb(51, 187, 38); */
}

.theme-picker {
  visibility: visible;
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 30;
}

#info {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: rgb(7, 108, 167);
  text-align: left;
  position: fixed;
  bottom: 0;
  left: 0;
}


/* #nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
} */
</style>
