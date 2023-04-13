<script setup>
import Login from './components/Login.vue'
import Register from "@/components/Register.vue";
import Dashboard from "@/components/Dashboard.vue";
import Navigation from "@/components/Navigation.vue";
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
        <Navigation class="mb-5" @login="()=>register=false" @register="register=true"></Navigation>
        <Login v-if="localStorage.BearerToken.length == 0 && !register"
               @register="(msg) => this.register = msg"></Login>
        <Register v-if="token.length == 0 && register" @registered="(msg)=>register = !msg"
                  @login="()=>register=false"></Register>
        <Dashboard v-if="token.length > 0"></Dashboard>
      </div>
    </div>
  </div>
</template>