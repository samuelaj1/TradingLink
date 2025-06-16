<template>
  <BaseDashboardLayout>
    <template v-slot:title>
      <h4 class="title mb-5">Work Area</h4>
    </template>

    <div class="row">
      <div class="col-md-8">
        <vue-dropzone
            id="certificateDropzone"
            ref="certificateDropzone"
            :use-custom-slot="true"
            :options="fileDropOptions"
        >
          <div class="dz-message needsclick">
            <i class="bi bi-upload h1 text-muted"></i>
            <h5>Select files, drag and drop, or take a photo with your camera.</h5>
            <p class="font-weight-lighter">Drag or select your files (PNG, JPG)</p>
          </div>
        </vue-dropzone>
      </div>
    </div>

  </BaseDashboardLayout>
</template>

<script>
import BaseDashboardLayout from '../../base-layout/tradesperson-dashboard';
import VueDropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import appConfig from "../../../../app.config.json";

export default {
  page: {
    title: "Portfolio",
    meta: [{ name: "description", content: appConfig.description }]
  },
  data() {
    return {
      fileDropOptions: {
        url: '#', // Replace with your upload URL
        maxFilesize: 2, // MB
        acceptedFiles: 'image/*',
        addRemoveLinks: true,
        dictDefaultMessage: 'Drag and drop files here or click to upload',
      }
    };
  },
  components: {
    BaseDashboardLayout,
    VueDropzone
  },
  mounted() {
    $('#portfolio').addClass('active')
  },
};
</script>
