<script setup>

defineProps({
  msg: {
    type: String,
    required: true
  }
})


</script>

<script>
import {store} from './../store';

import vueFilePond from 'vue-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImageEdit from 'filepond-plugin-image-edit';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import {FilePond} from "filepond";
// import 'filepond-plugin-image-preview/dist/filepond-plugin-image-transform.min.css';

export default {
  data() {
    return {
      store
    }
  },
  name: 'app',
  components: {
    FilePond: vueFilePond(
        FilePondPluginImagePreview,
        FilePondPluginImageEdit,
        FilePondPluginImageTransform,
        FilePondPluginImageResize,
        FilePondPluginImageCrop
    )
  }
}

</script>


<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <div id="uploader">
      <FilePond />
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight : 500;
  font-size   : 2.6rem;
  top         : -10px;
}

h3 {
  font-size : 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align : center;
}

@media (min-width : 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align : left;
  }
}
</style>
