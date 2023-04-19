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
import EventResults from "@/components/EventResults.vue";
import PlayerEventResult from "@/components/PlayerEventResult.vue";

</script>

<script>
import config from "../config.json"

export default {
    data() {
        return {
            testMsg: 'test message',
            register: false,
            showWindow: config.view.Home,
            bearerTokenExists: false,
            eventID: 0,
            score:{},
            config
        }
    },
    beforeMount() {
        this.bearerTokenExists = localStorage.getItem("BearerToken") !== null;
        if (this.bearerTokenExists) {
            this.showWindow = config.view.Dashboard
        }
    },
    methods: {
        sucessfulLogin() {
            this.showWindow = config.view.Dashboard;
            this.bearerTokenExists = true;
            this.$forceUpdate();
            window.location.reload()
        },
        logout() {
            localStorage.clear();
            this.bearerTokenExists = false;
            this.showWindow = config.view.Login;
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
            </div>
        </div>
    </div>
    <Register v-if="showWindow === config.view.Register"
              @registered="(msg)=>showWindow = config.view.Login"></Register>
    <Login v-if="showWindow === config.view.Login"
           @register="() => showWindow = config.view.Register" @success="sucessfulLogin"></Login>
    <Home v-if="showWindow === config.view.Home" @setShowWindow="(param) => showWindow = param"></Home>
    <Dashboard v-if="showWindow === config.view.Dashboard" @setShowWindow="(param) => showWindow = param"></Dashboard>
    <EventOverview v-if="showWindow === config.view.EventOverview" @eventID="(param) => eventID = param"
                   @setShowWindow="(param) => showWindow = param"></EventOverview>
    <EventHistory v-if="showWindow === config.view.EventHistory"
                  @setShowWindow="(param) => showWindow = param" @set-event-id="(param)=>eventID=param"></EventHistory>
    <NewEvent v-if="showWindow === config.view.NewEvent" @setShowWindow="(param) => showWindow = param"></NewEvent>
    <Settings v-if="showWindow === config.view.Settings" :loggedin="bearerTokenExists" @setShowWindow="(param) => showWindow = param"></Settings>
    <Event v-if="showWindow === config.view.Event" :event-id=eventID @set-show-window="(param)=>showWindow=param"></Event>
    <EventResults v-if="showWindow === config.view.EventResults" :event-id="eventID" @set-show-window="(param)=> showWindow=param" @score="(param)=>score=param"></EventResults>
    <PlayerEventResult v-if="showWindow === config.view.PlayerEventResults" :event-id="eventID" :score="score" @set-show-window="(param)=>showWindow=param"></PlayerEventResult>
</template>