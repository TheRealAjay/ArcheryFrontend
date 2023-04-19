<template>
  <div class="row">
    <div class="col-12">
      <h6>{{ eventInfo.formattedDate + " &nbsp " + eventInfo.formattedTime }}</h6>
      <h3 class="mb-3">{{ eventInfo.eventName }}</h3>
      <p class="mb-3">{{ eventInfo.eventAddress }}</p>
      <h3 class="mb-5">Ergebnisse</h3>
    </div>
  </div>
  <div class="row scoreboard">
      <div class="col-12" v-for="score in this.scores" @click="$emit('setShowWindow', config.view.PlayerEventResults); $emit('score', score)">
        <div>{{score.place}}</div>
        <img :src=score.base64Picture>
        <div>{{score.userName}}</div>
        <div>{{score.value}}</div>
        <div><font-awesome-icon :icon="['fas', 'caret-right']" style="color: #ffffff;" /></div>
      </div>
  </div>
</template>

<script>
import axios from "axios";
import config from "../../config.json";

export default {
name: "EventResults",
  emits:["setShowWindow", "score"],
  data(){
  return{
    api:{
      getScores: "/Archery/getScoresForEvent/",
      getEventInfo: "/Archery/getEventInfo/"
    },
    eventInfo:{},
    scores:[],
    config
  }
  },
  props: ['eventId'],
  async beforeMount() {
      await this.getEventInfo()
    await this.getScores()
  },
  methods:{
    async getScores(){
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