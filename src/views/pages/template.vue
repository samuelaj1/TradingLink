<script>
import appConfig from "../../../app.config.json";

/**
 * Starter component
 */
export default {
  head() {
    return {
      title: `${this.title}`,
    };
  },
  data() {
    return {
      title: "Starter",
    };
  },
  page: {
    title: "Mortiply",
    meta: [{ name: "description", content: appConfig.description }],
  },
};
</script>

<template>
  <div>
    <h1> Starter </h1>
  </div>
</template>
