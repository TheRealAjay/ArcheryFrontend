<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
// const axios = require('../node_modules/axios/dist/browser/axios.cjs')
import Login from './components/Login.vue'
import Register from "@/components/Register.vue";
import Dashboard from "@/components/Dashboard.vue";
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
        <Login @token="(msg) => this.token = msg" v-if="token.length == 0 && !register" @register="(msg) => this.register = msg"></Login>
        <Register v-if="token.length == 0 && register" @registered="(msg)=>register = !msg"></Register>
        <Dashboard v-if="token.length > 0"></Dashboard>
      </div>
    </div>
  </div>
</template>