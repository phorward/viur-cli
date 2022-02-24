<template>
  <div class="about">
    <h1>This is an about page</h1>
	<p> {{ value }} </p>
  </div>
</template>

<script>
import { ref } from 'vue'; 
import Request from "@/request.js";
export default {
	setup() {
		const value = ref({});

		Request.get("/projects").then((resp) => {
			let details =  JSON.parse(JSON.stringify(resp.data));
			if (details != null)
				value.value = details; 
		});

		return {
			value
		}
	}
}
</script>