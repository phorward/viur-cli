<template>
  <div id = "console-log">
	  	
		<!-- <sl-text>Console log</sl-text> -->
		<sl-tooltip content="Console Log">
			<sl-textarea resize="auto" :value="content" readonly></sl-textarea>
		</sl-tooltip>
  </div>
</template>

<script>
import { inject, computed } from "vue";
import { useStore } from 'vuex';

export default {
  setup() {
	//
	const store = useStore();
	
	const socket = inject('socket');

	socket.on("log", function(c){
		console.log("On log");
		store.state.content += c; 
	});

	return {
		connected: computed(() => store.state.connected),
		content: computed(() => store.state.content),
		socket
	}
  },
}

</script>

<style>
#console-log {
	margin-top: 20px;
	margin-bottom: 20px;
}
</style>