<script setup>
import JSON from "./components/JSON.vue"
//import JSONSolution from "./components/JSONSolution.vue"
import Form from "./components/Form.vue"
</script>

<template>
  <!-- <JSON /> -->
  <!-- <JSONSolution />-->
   <Form/>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 768px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
  .form-row {
        flex-direction: column;
        align-items: stretch;
    }

  .form-row input {
        margin-bottom: 10px;
        margin-right: 0;
    }
  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
