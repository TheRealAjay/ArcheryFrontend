<template>
  <div class="container">
    <div class="col-12">
      <h3>Performance Übersicht</h3>
    </div>
    <div class="col-12">
      <div class="archery-button small" @click="$emit('setShowWindow', config.view.EventResults)">
        <div class="outline"></div>
        <div class="text">
          <font-awesome-icon :icon="['far', 'square-caret-left']" style="color: #ffffff;"/>
          &nbspZurück
        </div>
        <div class="overlay red"></div>
      </div>
    </div>
    <div class="col-12">
      <h6>{{ eventInfo.formattedDate}}</h6>
      <h3 class="mb-3">{{ eventInfo.eventName }}</h3>
    </div>
    <div class="col-12">
      <img :src=score.base64Picture alt="Profile Picture">
      <div>
        <p>Platz {{place}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import config from "../../config.json";

export default {
  name: "PlayerEventResult",
  props: ["score", "eventId"],
  emits: ["setShowWindow"],
  data(){
    return{
      eventInfo: {},
      api:{
        getScores: "/Archery/getScoresForUser/",
        getEventInfo: "/Archery/getEventInfo/",
        getParticipantData: "/Archery/getParticipantData/"
      },
      place: 0,
      arrowScores: [],
      firstName: "",
      lastName: "",
      config
    }
  },
  methods:{
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
    },
    async getScoresForUser() {
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
          participantName: this.score.userName
        }
      })
          .then(function (response) {
            return response;
          })
          .catch(err => console.log(err + "ERROR caught"))
      if (response !== undefined) {
        this.arrowScores = response["data"]["arrowScores"];
        this.place = response["data"]["place"]
      }
    },
    async getParticipantData() {
      await axios({
        url: config.api.url + this.api.getParticipantData,
        method: "post",
        headers: {
          "Authorization": `Bearer ${localStorage.BearerToken}`,
          "Content-Type": "application/json",
          "Accept": "*/*",
        },
        data: {
          participantID: this.score.userID,
        }
      }).then((result) => {
        this.firstName = result["data"]["firstName"]
        this.lastName = result["data"]["lastName"]
      })
    }
  },
  async beforeMount(){
    await this.getEventInfo()
    await this.getScoresForUser()

  }
}
</script>

<style scoped>

</style>