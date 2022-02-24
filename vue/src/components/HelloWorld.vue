<template>
  <div class="hello">
    <h1>{{ value }}</h1>
    <p>{{ number }}</p>
    <button v-bind:onclick="fn">DDD</button>
    <p>{{ viur["state"] }}</p>
  </div>
</template>

<script>
//import { Request } from "@/request.js";
import { ref } from "vue";
import Request from "@/request.js";
//import router from "@/router/index.js";
//import About from "@/views/About.vue";

export default {
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  setup() {
    const viur = ref({});
    const fn = function () {
      console.log("Hello");
    };

    Request.get("/has/viur").then((resp) => {
      viur.value = JSON.parse(JSON.stringify(resp.data));
    });

    return {
      viur,
      fn,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
