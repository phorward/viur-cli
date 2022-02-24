<template>
  <div class="welcome">
		<h1 class="animate__animated animate__bounceIn backInDown"> 
			<sl-icon name="clock"> </sl-icon>
			Please setup ur project details. 
		</h1>
  </div>
</template>

<script>
import { inject, computed, ref } from "vue";
import { useStore } from 'vuex';

export default {
	name: "Welcome",

	components: {},

	setup() {
		const x = ref("EE");
		return {
			x
		}
  },
};
</script>
