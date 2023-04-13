<script setup>
import Login from './components/Login.vue'
import Register from "@/components/Register.vue";
import Dashboard from "@/components/Dashboard.vue";
import Navigation from "@/components/Navigation.vue";
import Events from "@/components/Events.vue";
import EventHistory from "@/components/EventHistory.vue";
</script>

<script>
import axios from "axios";

export default {
    data() {
        return {
            testMsg: 'test message',
            token: '',
            register: false,
            showWindow: 0,
        }
    }
}
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <Navigation></Navigation>
                <Login @token="(msg) => this.token = msg" v-if="token.length === 0 && !register"
                       @register="(msg) => this.register = msg"></Login>
                <Register v-if="token.length === 0 && register" @registered="(msg)=>register = !msg"
                          @login="()=>register=false"></Register>
            </div>
        </div>
    </div>
    <Dashboard v-if="token.length > 0 && showWindow === 0" @setShowWindow="(param) => showWindow = param"></Dashboard>
    <Events v-if="showWindow === 1" @setShowWindow="(param) => showWindow = param"></Events>
    <EventHistory v-if="showWindow === 4" @setShowWindow="(param) => showWindow = param"></EventHistory>
</template>