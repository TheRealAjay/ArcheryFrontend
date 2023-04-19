<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h6>{{ eventInfo.formattedDate + " &nbsp " + eventInfo.formattedTime }}</h6>
                <h3 class="mb-3">{{ eventInfo.eventName }}</h3>
                <p class="mb-3">{{ eventInfo.eventAddress }}</p>
            </div>
        </div>
        <div class="row mt-5">
            <div class="col-12">
                <div class="header">Ergebnisse</div>
            </div>
        </div>
        <div class="row scoreboard">
            <div class="d-flex w-100 mb-3">
                <div class="d-flex align-items-center pe-3">Platzierung</div>
                <div class="d-flex justify-content-start align-items-center "></div>
                <div class="flex-fill ps-3 d-flex justify-content-start align-items-center">Benutzername</div>
                <div class="w-15 d-flex align-items-center">Gesamtpunkte</div>
                <div class="w-auto d-flex pe-3 justify-content-end align-items-center"></div>
            </div>
            <div class="col-12" v-for="score in this.scores">
                <div class="d-flex w-100 mb-3 cursor-pointer"
                     @click="$emit('setShowWindow', config.view.PlayerEventResults); $emit('score', score)">
                    <div class="d-flex align-items-center pe-3">{{ score.place }}</div>
                    <div class="d-flex justify-content-start align-items-center border-white border-top border-bottom border-radius-left">
                        <img :src=score.base64Picture width="50" alt="profilePic"
                             class="border-radius-circle">
                    </div>
                    <div class="flex-fill ps-3 d-flex justify-content-start align-items-center border-white border-top border-bottom">
                        @{{ score.userName }}
                    </div>
                    <div class="w-15 d-flex align-items-center border-white border-top border-bottom">
                        {{ score.value }}
                    </div>
                    <div class="w-auto d-flex pe-3 justify-content-end align-items-center border-white border-top border-bottom border-end border-radius-right">
                        <font-awesome-icon :icon="['fas', 'caret-right']" style="color: #ffffff;" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import config from "../../config.json";

export default {
    name: "EventResults",
    emits: ["setShowWindow", "score"],
    data() {
        return {
            api: {
                getScores: "/Archery/getScoresForEvent/",
                getEventInfo: "/Archery/getEventInfo/"
            },
            eventInfo: {},
            scores: [],
            config
        }
    },
    props: ['eventId'],
    async beforeMount() {
        await this.getEventInfo()
        await this.getScores()
    },
    methods: {
        async getScores() {
            let response = await axios({
                url: config.api.url + this.api.getScores,
                method: "post",
                headers: {
                    "Authorization": `Bearer ${localStorage.BearerToken}`,
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                },
                data: {
                    eventID: this.eventId,
                }
            })
                .then(function (response) {
                    return response;
                })
                .catch(err => console.log(err + "ERROR caught"))
            if (response !== undefined) {
                this.scores = response["data"]["scores"]
            }
        },
        async getEventInfo() {
            let response = await axios({
                url: config.api.url + this.api.getEventInfo,
                method: "post",
                headers: {
                    "Authorization": `Bearer ${localStorage.BearerToken}`,
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                },
                data: {
                    eventID: this.eventId,
                }
            })
                .then(function (response) {
                    return response;
                })
                .catch(err => console.log(err + "ERROR caught"))
            if (response !== undefined) {
                this.eventInfo = response["data"]
            }
        }
    }
}
</script>

<style scoped>

</style>