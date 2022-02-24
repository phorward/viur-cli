<template>
  <div class="home">
	<div v-if="connected == false">
		<!-- <sl-progress-bar indeterminate>  </sl-progress-bar> -->
		<sl-spinner style="font-size: 3rem; --track-width: 6px;"></sl-spinner>

	</div>
	<div v-else>
		<ListenSocket value="Hello" />
		<LogUI/>
	</div>
  </div>
</template>

<script>
// @ is an alias to /src
import ListenSocket from "@/components/ListenSocket.vue";
import LogUI from "@/components/LogUI.vue";

import { inject, computed } from "vue";
import { useStore } from 'vuex';

export default {
	name: "Home",

	components: {
		ListenSocket,
		LogUI,
	},

	setup() {
		const store = useStore();

		console.log("Hehehehe");

		return {
			connected: computed(() => store.getters.connected),
		}
  },
};
</script>
