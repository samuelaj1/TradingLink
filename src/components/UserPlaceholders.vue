<template>
  <div class="form-group">
    <p class="mb-2">Click to copy to clipboard</p>
    <div class="form-group">
      <span class="badge badge-dark p-1 " style="cursor: pointer" @click="clickToCopy('[fullName]')">[fullName]</span>
      <span class="badge badge-dark p-1 ml-2" style="cursor: pointer" @click="clickToCopy('[firstName]')">[firstName]</span>
      <span class="badge badge-dark p-1 ml-2" style="cursor: pointer" @click="clickToCopy('[lastName]')">[lastName]</span>
      <span class="badge badge-dark p-1 ml-2" style="cursor: pointer" @click="clickToCopy('[email]')">[email]</span>
      <span class="badge badge-dark p-1 ml-2" style="cursor: pointer" @click="clickToCopy('[phone]')">[phone]</span>
      <span class="badge badge-dark p-1 ml-2" style="cursor: pointer" @click="clickToCopy('[address]')">[address]</span>
    </div>
  </div>
</template>

<script>
import {showToast} from "../utils/functions";

export default {
  name: "UserPlaceholders",
  methods: {
    clickToCopy(value){

      navigator.clipboard.writeText(value).then(() => {
        console.log('Async: Copying to clipboard was successful!');
        showToast(this, 'copied ' + value + ' to clip board', )
      }, (err) => {
        console.error('Async: Could not copy text: ', err);
      });


    },


  }
}
</script>

<style scoped>

</style>