<template>
    <LoadingScreen v-if="this.loading === true"></LoadingScreen>
    <div class="container">
        <div class="row align-items-center">
            <div class="col-12 col-lg-4">
                <div class="header">Events</div>
            </div>
            <div class="col-12 col-lg-3">
                <div class="archery-button small" @click="$emit('setShowWindow', config.view.Dashboard)">
                    <div class="outline"></div>
                    <div class="text">
                        <font-awesome-icon :icon="['far', 'square-caret-left']" style="color: #ffffff;" />
                        &nbspZurück
                    </div>
                    <div class="overlay red"></div>
                </div>
            </div>
            <div class="col-12 col-lg-5">
                <div class="archery-button small" @click="$emit('setShowWindow', config.view.EventHistory)">
                    <div class="outline"></div>
                    <div class="text">
                        <font-awesome-icon :icon="['fas', 'clock-rotate-left']" style="color: #ffffff;" />
                        &nbspEventverlauf
                    </div>
                    <div class="overlay dark"></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12" v-for="value in events">
                <div class="archery-button large" :class="value.isActive ? '' : 'no-pointer'"
                     @click="value.isActive ? clickActive(value.eventID) : clickDisabled()">
                    <div class="outline"></div>
                    <div class="text left">
                        <div class="mb-1">
                            <font-awesome-icon :icon="['far', 'calendar']" style="color: #ffffff;" />
                            {{ value.eventDate + " " + value.eventTime }}
                        </div>
                        <div class="light">{{ value.eventName }}</div>
                        <div class="light small">{{ value.eventAddress }}</div>
                    </div>
                    <div :class="value.isActiveClass"></div>
                </div>
            </div>
        </div>
        <div v-if="this.events.length <= 0">
            <NotFound not-found-text="Keine Events gefunden :("></NotFound>

            <div class="row justify-content-center">
                <div class="col-12 col-lg-4">
                    <div class="archery-button small" @click="$emit('setShowWindow', config.view.NewEvent)">
                        <div class="outline"></div>
                        <div class="text">
                            Hier neues Event anlegen
                        </div>
                        <div class="overlay green"></div>
                        <img src="./../assets/images/target.png" class="background" alt="Event anlegen">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import config from "../../config.json"
import axios from "axios";
import LoadingScreen from "@/components/LoadingScreen.vue";
import NotFound from "@/components/smallComponents/NotFound.vue";

export default {
    name: "EventOverview",
    components: {NotFound, LoadingScreen},
    emits: ["setShowWindow", "eventID"],
    data() {
        return {
            api: {
                getEvents: "/Archery/getAllEvents/",
            },
            config,
            loading: false,
            events: []
        }
    },
    methods: {
        async getEvents() {
            await axios({
                url: config.api.url + this.api.getEvents,
                method: "post",
                headers: {
                    "Authorization": `Bearer ${localStorage.BearerToken}`,
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                },
                data: {
                    userEmail: localStorage.Email,
                    oldData: false
                }
            }).then((result) => {
                let obj = JSON.parse(result.request.response);
                for (const objElement of obj.events) {
                    this.events.push({
                        eventID: objElement.eventID,
                        eventName: objElement.eventName,
                        eventAddress: objElement.eventAddress,
                        eventDate: objElement.formattedDate,
                        eventTime: objElement.formattedTime,
                        isActiveClass: objElement.isActiveEvent ? "overlay green" : "overlay blue",
                        isActive: objElement.isActiveEvent
                    })
                }
                setTimeout(() => {
                    this.loading = false;
                    //$(".bounce").css("background-image",'url('+imgDataURI+')');
                }, Math.random() * 500);
            })
        },
        clickActive(eventID) {
            this.$emit('setShowWindow', config.view.Event);
            this.$emit('eventID', eventID);
        },
        clickDisabled() {
        }
    },
    beforeMount() {
        this.loading = true;
        this.getEvents();
    }
}
</script>
