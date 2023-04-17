<script setup>
import Login from './components/Login.vue'
import Register from "@/components/Register.vue";
import Dashboard from "@/components/Dashboard.vue";
import Navigation from "@/components/Navigation.vue";
import Events from "@/components/EventOverview.vue";
import EventHistory from "@/components/EventHistory.vue";
import Home from "@/components/Home.vue";
import NewEvent from "@/components/NewEvent.vue";
import Settings from "@/components/Settings.vue";
import EventOverview from "@/components/EventOverview.vue";
import Event from "@/components/Event.vue";

</script>

<script>
import config from "../config.json"

export default {
    data() {
        return {
            testMsg: 'test message',
            register: false,
            showWindow: config.view.Event,
            bearerTokenExists: false,
            eventID: 0,
            config
        }
    },
    // beforeMount() {
    //     this.bearerTokenExists = localStorage.getItem("BearerToken") !== null;
    //     if (this.bearerTokenExists) {
    //         this.showWindow = config.view.Dashboard
    //     }
    // },
    methods: {
        sucessfulLogin() {
            this.showWindow = config.view.Dashboard;
            this.bearerTokenExists = true;
            this.$forceUpdate();
        },
        logout() {
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
                <Navigation :loggedin="bearerTokenExists" @change-view="(newView) => showWindow = newView"
                            @logout="logout" class="mb-5"></Navigation>
                <Login v-if="showWindow === config.view.Login"
                       @register="() => showWindow = config.view.Register" @success="sucessfulLogin"></Login>
                <Register v-if="showWindow === config.view.Register"
                          @registered="(msg)=>showWindow = config.view.Login"></Register>
                <Home v-if="showWindow === config.view.Home"></Home>
            </div>
        </div>
    </div>
    <Dashboard v-if="showWindow === config.view.Dashboard" @setShowWindow="(param) => showWindow = param"></Dashboard>
    <EventOverview v-if="showWindow === config.view.EventOverview" @eventID="(param) => eventID = param"
                   @setShowWindow="(param) => showWindow = param"></EventOverview>
    <EventHistory v-if="showWindow === config.view.EventHistory"
                  @setShowWindow="(param) => showWindow = param"></EventHistory>
    <NewEvent v-if="showWindow === config.view.NewEvent" @setShowWindow="(param) => showWindow = param"></NewEvent>
    <Settings v-if="showWindow === config.view.Settings"></Settings>
  <Event v-if="showWindow === config.view.Event"></Event>
</template>