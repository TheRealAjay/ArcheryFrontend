<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
// const axios = require('../node_modules/axios/dist/browser/axios.cjs')
import Login from './components/Login.vue'
</script>

<script>
import axios from "axios";

export default {
  data() {
    return {
      testMsg: 'test message',
      token: '',
      url: 'http://88.198.105.137:5000/Auth/login'
    }
  }
}
</script>

<template>
<Login></Login>
</template>
