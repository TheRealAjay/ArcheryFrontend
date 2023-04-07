<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
// const axios = require('../node_modules/axios/dist/browser/axios.cjs')
import Login from './components/Login.vue'
import Register from "@/components/Register.vue";
</script>

<script>
import axios from "axios";

export default {
  data() {
    return {
      testMsg: 'test message',
      token: '',
      register: false
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12">

        <Login @token="(msg) => this.token = msg" v-if="!token && !register" @register="(msg) => this.register = msg"></Login>
        <Register v-if="!token && register" @registered="(msg)=>register = msg"></Register>
      </div>
    </div>
  </div>
</template>