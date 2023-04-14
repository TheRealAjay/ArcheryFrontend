<script setup>
import Login from './components/Login.vue'
import Register from "@/components/Register.vue";
import Dashboard from "@/components/Dashboard.vue";
import Navigation from "@/components/Navigation.vue";
import Events from "@/components/Events.vue";
import EventHistory from "@/components/EventHistory.vue";

</script>

<script>
import config from "../config.json"
export default {
  data() {
    return {
      testMsg: 'test message',
      register: false,
      showWindow: 2,
      bearerTokenExists: false
    }
  },
  beforeMount() {
    this.bearerTokenExists = localStorage.getItem("BearerToken") !== null;
    if(this.bearerTokenExists){
      this.showWindow = config.view.Dashboard
    }
  },
  methods:{
    sucessfulLogin(){
      this.showWindow = config.view.Dashboard;
      this.bearerTokenExists = true;
    },
    logout(){
      localStorage.clear();
      this.bearerTokenExists = false
      this.showWindow = config.view.Login
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <Navigation :loggedin="bearerTokenExists" @change-view="(newView) => showWindow = newView" @logout="logout"></Navigation>
        <Login v-if="showWindow === config.view.Login"
               @register="() => showWindow = config.view.Register" @success="sucessfulLogin"></Login>
        <Register v-if="showWindow === config.view.Register"
                  @registered="(msg)=>showWindow = config.view.Login"></Register>
      </div>
    </div>
  </div>
    <Dashboard v-if="showWindow === config.view.Dashboard" @setShowWindow="(param) => showWindow = param"></Dashboard>
    <Events v-if="showWindow === config.view.Event" @setShowWindow="(param) => showWindow = param"></Events>
    <EventHistory v-if="showWindow === config.view.EventHistory" @setShowWindow="(param) => showWindow = param"></EventHistory>
</template>