<template>
  <div>
	  	<div v-if="connected">
			<sl-button @click="pingServer()">Ping Server</sl-button>
		</div>

  </div>


</template>

<script>
import { computed } from "vue";
import { useStore } from 'vuex';

export default {
  setup() {
		  //
	const store = useStore();

	return {
		connected: computed(() => store.state.connected),
	}
  },
}

</script>