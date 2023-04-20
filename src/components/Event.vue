<template>
    <LoadingScreen v-if="loading === true"></LoadingScreen>
    <div class="container archery-form-style">
        <div class="row" v-if="showTargets">
            <div class="col-12 mb-4">
                <h6>{{ eventInfo.formattedDate + " &nbsp " + eventInfo.formattedTime }}</h6>
                <h3 class="mb-4">{{ eventInfo.eventName }}</h3>
                <p class="mb-3">{{ eventInfo.eventAddress }}</p>
            </div>
            <div v-for="(target, index) in targets" class="col-12" @click="selectTarget(index)">
                <div class="archery-button" :class="(currentTarget == index) ? 'large' : 'medium'">
                    <div class="outline"></div>
                    <div class="text left">
                        <div :class="(currentTarget == index) ? '' : 'light small'">
                            <font-awesome-icon :icon="['fas', 'bullseye']" style="color: #000000;" />
                            Zielscheibe {{ index + 1 }}
                        </div>
                        <div class="light">{{ target.targetName }}</div>
                    </div>
                    <div v-if="currentTarget == index" class="overlay green"></div>
                    <img v-if="currentTarget == index" src="./../assets/images/target_2.png"
                         class="background" alt="Einstellungen">
                    <div v-if="currentTarget > index" class="overlay blue"></div>
                    <div v-if="currentTarget < index" class="overlay grey"></div>
                </div>
            </div>

        </div>
        <div class="row" v-else>
            <h6>{{ eventInfo.eventName }}</h6>
            <h3 class="mb-4">{{ targets[currentTarget].targetName }}</h3>
            <p class="mb-5">Bitte geben Sie die Punkte für alle Spieler ein.</p>
            <h3>{{ participants[currentParticipant].nickName }}</h3>
            <div v-if="eventInfo.scoringType" class="col-12">
              <select v-model="arrowValues.arrow1" :disabled=disableArrow1
                      class="form-select bg-darkblue form-control my-3"
                      aria-label="Default select example">
                <option selected disabled value="-1">Pfeil 1</option>
                <option value="10">10 Punkte</option>
                <option value="8">8 Punkte</option>
                <option value="6">6 Punkte</option>
                <option value="0">Nicht Getroffen</option>
              </select>
              <select v-model="arrowValues.arrow2" :disabled=disableArrow2
                      class="form-select bg-darkblue form-control mb-3"
                      aria-label="Default select example">
                <option selected disabled value="-1">Pfeil 2</option>
                <option value="4">4 Punkte</option>
                <option value="2">2 Punkte</option>
                <option value="1">1 Punkte</option>
                <option value="0">Nicht Getroffen</option>
              </select>
            </div>
            <div v-else class="col-12">
                <select v-model="arrowValues.arrow1" :disabled=disableArrow1
                        class="form-select bg-darkblue form-control my-3"
                        aria-label="Default select example">
                    <option selected disabled value="-1">Pfeil 1</option>
                    <option value="20">20 Punkte</option>
                    <option value="18">18 Punkte</option>
                    <option value="16">16 Punkte</option>
                    <option value="0">Nicht Getroffen</option>
                </select>
                <select v-model="arrowValues.arrow2" :disabled=disableArrow2
                        class="form-select bg-darkblue form-control mb-3"
                        aria-label="Default select example">
                    <option selected disabled value="-1">Pfeil 2</option>
                    <option value="14">14 Punkte</option>
                    <option value="12">12 Punkte</option>
                    <option value="10">10 Punkte</option>
                    <option value="0">Nicht Getroffen</option>
                </select>
                <select v-model="arrowValues.arrow3" :disabled=disableArrow3
                        class="form-select bg-darkblue form-control mb-3"
                        aria-label="Default select example">
                    <option selected disabled value="-1">Pfeil 3</option>
                    <option value="8">8 Punkte</option>
                    <option value="6">6 Punkte</option>
                    <option value="4">4 Punkte</option>
                    <option value="0">Nicht Getroffen</option>
                </select>
            </div>
            <div class="col-6" v-if="currentParticipant > 0">
                <button @click="previousParticipant()" class="btn text-uppercase">
                    Zurück
                </button>
            </div>
            <div class="col-6" v-if="currentParticipant == participants.length-1 && currentTarget == targets.length-1">
                <button @click="finishEvent()" class="btn mt-2 btn-outline float-end text-uppercase">
                    Event Beenden
                </button>
            </div>
            <div class="col-6" v-if="currentParticipant == participants.length-1 && currentTarget != targets.length-1">
                <button @click="nextTarget()" class="btn mt-2 btn-outline float-end text-uppercase">
                    Nächstes Ziel
                </button>
            </div>
            <div class="col-6" v-if="currentParticipant != participants.length-1">
                <button @click="nextParticipant()" class="btn mt-2 btn-outline float-end text-uppercase">
                    Nächster Spieler
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import config from "../../config.json";
import LoadingScreen from "@/components/LoadingScreen.vue";

export default {
    components: {LoadingScreen},
  emits: ["setShowWindow", "eventID"],
    data() {
        return {
            api: {
                getTargets: "/Archery/getTargets/",
                getParticipants: "/Archery/getParticipants/",
                getEventInfo: "/Archery/getEventInfo/",
                addScores: "/Archery/addScores/",
                finishEvent: "/Archery/finishEvent/"
            },
            targets: [],
            participants: [],
            eventInfo: {},
            currentTarget: 0,
            showTargets: true,
            currentParticipant: 0,
            scores: [],
            loading: false,
            arrowValues: {
                arrow1: -1,
                arrow2: -1,
                arrow3: -1
            },
          config
        }
    },
    computed: {
        disableArrow1() {
            return this.arrowValues.arrow2 > 0 || this.arrowValues.arrow3 > 0
        },
        disableArrow2() {
            return this.arrowValues.arrow1 > 0 || this.arrowValues.arrow3 > 0
        },
        disableArrow3() {
            return this.arrowValues.arrow2 > 0 || this.arrowValues.arrow1 > 0
        },
    },
    name: "Event",
    props: ['eventId'],
    async beforeMount() {
        await this.getTargets();
        await this.getParticipants();
        await this.getEventInfo();
    },
    methods: {
        async getTargets() {
            let response = await axios({
                url: config.api.url + this.api.getTargets,
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
                this.targets = response["data"]["targets"]
                for (let targetsKey in this.targets) {
                    if (this.targets[targetsKey].hasScores == false) {
                        this.currentTarget = targetsKey
                        break
                    }
                }
            }
        },
        async getParticipants() {
            let response = await axios({
                url: config.api.url + this.api.getParticipants,
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
                this.participants = response["data"]["participants"]
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
        },
        selectTarget(index) {
            if (index != this.currentTarget) {
                return
            }
            this.showTargets = false
        },
        nextParticipant() {
            let position;
            let value;
            for (let arrowValuesKey in this.arrowValues) {
                if (this.arrowValues[arrowValuesKey] > 0) {
                    value = this.arrowValues[arrowValuesKey];
                    position = arrowValuesKey;
                }
            }
            if (this.scores.length == this.currentParticipant) {
                this.scores.push({
                    nickname: this.participants[this.currentParticipant].nickName,
                    value: value,
                    position: position
                })
            } else {
                this.scores[this.currentParticipant] =
                    {
                        nickname: this.participants[this.currentParticipant].nickName,
                        value: value,
                        position: position
                    }
            }
            this.currentParticipant++;
            for (let arrowValuesKey in this.arrowValues) {
                this.arrowValues[arrowValuesKey] = -1
            }
            if (this.scores.length != this.currentParticipant) {
                this.arrowValues[this.scores[this.currentParticipant].position] = this.scores[this.currentParticipant].value
            }
        },
        previousParticipant() {
            let position;
            let value;
            for (let arrowValuesKey in this.arrowValues) {
                if (this.arrowValues[arrowValuesKey] > 0) {
                    value = this.arrowValues[arrowValuesKey];
                    position = arrowValuesKey;
                }
            }
            if (value > 0) {
                if (this.scores.length == this.currentParticipant) {
                    this.scores.push({
                        nickname: this.participants[this.currentParticipant].nickName,
                        value: value,
                        position: position
                    })
                } else {
                    this.scores[this.currentParticipant] =
                        {
                            nickname: this.participants[this.currentParticipant].nickName,
                            value: value,
                            position: position
                        }
                }
            }
            this.currentParticipant--;
            for (let arrowValuesKey in this.arrowValues) {
                this.arrowValues[arrowValuesKey] = -1
            }
            this.arrowValues[this.scores[this.currentParticipant].position] = this.scores[this.currentParticipant].value
        },
        async nextTarget() {
            let position;
            let value;
            for (let arrowValuesKey in this.arrowValues) {
                if (this.arrowValues[arrowValuesKey] > 0) {
                    value = this.arrowValues[arrowValuesKey];
                    position = arrowValuesKey;
                }
            }
            if (this.scores.length == this.currentParticipant) {
                this.scores.push({
                    nickname: this.participants[this.currentParticipant].nickName,
                    value: value,
                    position: position
                })
            } else {
                this.scores[this.currentParticipant] =
                    {
                        nickname: this.participants[this.currentParticipant].nickName,
                        value: value,
                        position: position
                    }
            }
            this.currentParticipant = 0;

            for (let arrowValuesKey in this.arrowValues) {
                this.arrowValues[arrowValuesKey] = -1
            }
            await this.sendScores()
            this.currentTarget++;
        },
        async sendScores() {
            let scores = this.scores
            for (let scoresKey in scores) {
                scores[scoresKey].position = 0;
            }
            let response = await axios({
                url: config.api.url + this.api.addScores,
                method: "put",
                headers: {
                    "Authorization": `Bearer ${localStorage.BearerToken}`,
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                },
                data: {
                    targetID: this.targets[this.currentTarget].targetID,
                    scores: scores
                }
            })
                .then(function (response) {
                    return response;
                })
                .catch(err => console.log(err + " ERROR caught in sendScores() in Event.vue"))
            if (response !== undefined) {
                return response;
            }
        },

        async finishEvent() {
          this.$emit('setShowWindow', config.view.EventResults)

            let position;
            let value;
            for (let arrowValuesKey in this.arrowValues) {
                if (this.arrowValues[arrowValuesKey] > 0) {
                    value = this.arrowValues[arrowValuesKey];
                    position = arrowValuesKey;
                }
            }
            if (this.scores.length == this.currentParticipant) {
                this.scores.push({
                    nickname: this.participants[this.currentParticipant].nickName,
                    value: value,
                    position: position
                })
            } else {
                this.scores[this.currentParticipant] =
                    {
                        nickname: this.participants[this.currentParticipant].nickName,
                        value: value,
                        position: position
                    }
            }
            this.currentParticipant = 0;

            for (let arrowValuesKey in this.arrowValues) {
                this.arrowValues[arrowValuesKey] = -1
            }


            await this.sendScores()
            let response = await axios({
                url: config.api.url + this.api.finishEvent,
                method: "post",
                headers: {
                    "Authorization": `Bearer ${localStorage.BearerToken}`,
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                },
                data: {
                    eventID: this.eventId
                }
            })
                .then(function (response) {
                    return response;
                })
                .catch(err => console.log(err + " ERROR caught in sendScores() in Event.vue"))
            if (response !== undefined) {
                return response;
            }
        }
    }
}
</script>

<style scoped>

</style>