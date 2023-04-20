<template>
    <LoadingScreen v-if="this.loading === true"></LoadingScreen>
    <div class="container">
        <div class="row align-items-center mb-4">
            <div class="col-12 col-lg-9">
                <div class="header">Event Anlegen</div>
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
        </div>
        <div class="row">
            <form class="archery-form-style">
                <div class="col-12">
                    <p class="mb-3">
                        Bitte geben Sie die Eventdaten ein, fügen Sie Zielscheiben hinzu und fügen Sie schließlich
                        Teilnehmer hinzu, um ein neues Event zu erstellen.
                    </p>
                    <p>
                        Alle Felder mit einem Stern (*) müssen ausgefüllt werden.
                    </p>
                </div>
                <div class="row">
                    <div class="archery-button col-12" :class="(show.current == show.eventData) ? 'large' : 'medium'">
                      <div class="outline"></div>
                      <div class="text left">
                        <div :class="(show.current == show.eventData) ? '' : 'light small'">
                          1. Eventdaten
                        </div>
                      </div>
                      <div v-if="show.current == show.eventData" class="overlay green"></div>
                      <img v-if="show.current == show.eventData" src="./../assets/images/target.png"
                           class="background" alt="Einstellungen">
                      <div v-if="show.current > show.eventData" class="overlay blue"></div>
                    </div>
                  <div class="archery-button col-12" :class="(show.current == show.targets) ? 'large' : 'medium'">
                    <div class="outline"></div>
                    <div class="text left">
                      <div :class="(show.current == show.targets) ? '' : 'light small'">
                        2. Zielscheiben
                      </div>
                    </div>
                    <div v-if="show.current == show.targets" class="overlay green"></div>
                    <img v-if="show.current == show.targets" src="./../assets/images/target.png"
                         class="background" alt="Einstellungen">
                    <div v-if="show.current > show.targets" class="overlay blue"></div>
                    <div v-if="show.current < show.targets" class="overlay grey"></div>
                  </div>
                  <div class="archery-button col-12" :class="(show.current == show.participants) ? 'large' : 'medium'">
                    <div class="outline"></div>
                    <div class="text left">
                      <div :class="(show.current == show.participants) ? '' : 'light small'">
                        3. Teilnehmer
                      </div>
                    </div>
                    <div v-if="show.current == show.participants" class="overlay green"></div>
                    <img v-if="show.current == show.participants" src="./../assets/images/target.png"
                         class="background" alt="Einstellungen">
                    <div v-if="show.current < show.participants" class="overlay grey"></div>
                  </div>
                </div>
                <div class="col-12" v-if="show.current === show.eventData">
                    <ValidatedInput v-model="values.eventData.eventName" error-msg="Bitte befüllen Sie dieses Feld"
                                    type="text" label="Eventname*" :valid="validation.eventName"
                                    :optional-validation=true></ValidatedInput>
                    <ValidatedInput v-model="values.eventData.address" error-msg="Bitte befüllen Sie dieses Feld"
                                    type="text" label="Adresse*" :valid="validation.address"
                                    :optional-validation=true></ValidatedInput>
                    <ValidatedInput v-model="values.eventData.zipCode" error-msg="Bitte befüllen Sie dieses Feld"
                                    type="text" label="PLZ*" :valid="validation.zipCode"
                                    :optional-validation=true></ValidatedInput>
                    <ValidatedInput v-model="values.eventData.city" error-msg="Bitte befüllen Sie dieses Feld"
                                    type="text" label="Ort*" :valid="validation.city"
                                    :optional-validation=true></ValidatedInput>
                    <ValidatedInput v-model="values.eventData.date" error-msg="Bitte befüllen Sie dieses Feld"
                                    type="date" label="Datum*" :valid="validation.date"
                                    :optional-validation=true></ValidatedInput>
                    <ValidatedInput v-model="values.eventData.time" error-msg="Bitte befüllen Sie dieses Feld"
                                    type="time" label="Uhrzeit*" :valid="validation.time"
                                    :optional-validation=true></ValidatedInput>
                  <select v-model="values.eventData.scoringType"
                          class="form-select bg-darkblue form-control my-3">
                    <option selected value=false>Dreipfeil Wertung</option>
                    <option value=true>Zweipfeil Wertung</option>
                  </select>
                    <button class="btn btn-outline mt-2 float-end" type="button" @click="showTargets()">
                        Weiter
                    </button>
                </div>
                <div class="col-12" v-if="show.current === show.targets">
                    <div class="row" v-for="(target, key, index) in values.targets">
                        <div class="col-8">
                            <validated-input label="Name*" type="text" v-model="this.values.targets[key]"
                                             error-msg="Bitte befüllen Sie dieses Feld" :valid=true
                                             :optional-validation=true></validated-input>
                            <div v-if="!targetValidation[index]" class="text-danger error-message mb-2">Bitte befüllen
                                                                                                        oder löschen
                                                                                                        Sie das Ziel.
                            </div>
                        </div>
                        <div v-if="1 < Object.keys(values.targets).length" class="col-2">
                            <a  class="cursor-pointer">
                                <font-awesome-icon :icon="['far', 'trash-can']" size="xl" style="color: #ffffff;"
                                                   @click="deleteTarget(key, index)" />
                            </a>
                        </div>
                        <div v-if="index === Object.keys(values.targets).length-1" style="font-size: 30px"
                             class="col-2">
                            <a class="cursor-pointer" @click="addTarget()">+</a>
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col-6">
                            <button class="btn mt-2 btn-outline" type="button" @click="show.current=show.eventData">
                                Zurück
                            </button>
                        </div>
                        <div class="col-6">
                            <button class="btn mt-2 btn-outline float-end" type="button"
                                    @click="showParticipants()">Weiter
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-12" v-if="show.current === show.participants">
                    <div class="row mb-4" v-for="(participant, index) in values.participants">
                        <div class="col-8">
                            <validated-input label="Nickname*" type="text"
                                             v-model="this.values.participants[index]['nickname']"
                                             error-msg="Bitte befüllen Sie dieses Feld" :valid=true
                                             :optional-validation=true></validated-input>
                            <validated-input label="Email" type="email"
                                             v-model="this.values.participants[index]['userEmail']"
                                             error-msg="Bitte befüllen Sie dieses Feld" :valid=true
                                             :optional-validation=true @keyup="partialMatch(index)"
                                             :id=index></validated-input>
                            <div v-if="partialMatchIndex == index" class="position-relative overflow-hidden"
                                 style="border: 1px solid white; border-radius: 15px">
                                <div class="autocomplete">
                                    <div v-for="(user, matchIndex) in this.partialMatches"
                                         @click="autoFill(user, index)"
                                         class="user">
                                        <img :src=user.base64Img alt="">
                                        {{ user.userEmail }}
                                    </div>
                                </div>
                                <div class="background-blurred"></div>
                            </div>
                            <validated-input label="Vorname*" type="text"
                                             v-model="this.values.participants[index]['firstName']"
                                             error-msg="Bitte befüllen Sie dieses Feld" :valid=true
                                             :optional-validation=true></validated-input>
                            <validated-input label="Nachname*" type="text"
                                             v-model="this.values.participants[index]['lastName']"
                                             error-msg="Bitte befüllen Sie dieses Feld" :valid=true
                                             :optional-validation=true></validated-input>
                            <div v-if="!participantValidation[index]" class="text-danger error-message mb-2">Bitte
                                                                                                             befüllen
                                                                                                             Sie alle
                                                                                                             Felder mit
                                                                                                             einem Stern
                                                                                                             (*).
                            </div>
                        </div>
                        <div v-if="1 < values.participants.length" class="col-2">
                            <a href="#">
                                <font-awesome-icon :icon="['far', 'trash-can']" size="xl" style="color: #ffffff;"
                                                   @click="deleteParticipant(index)" />
                            </a>
                        </div>
                        <div v-if="index === values.participants.length-1" style="font-size: 30px" class="col-2">
                            <a href="#" @click="addParticipant()">+</a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <button class="btn mt-2 btn-outline" type="button" @click="show.current=show.targets">
                                Zurück
                            </button>
                        </div>
                        <div class="col-6">
                            <button class="btn mt-2 btn-outline float-end" type="button" @click="createEvent()">
                                Event Anlegen
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

import ValidatedInput from "@/components/smallComponents/ValidatedInput.vue";
import axios from "axios";
import config from "../../config.json";
import LoadingScreen from "@/components/LoadingScreen.vue";
import {useActiveElement} from '@vueuse/core';


export default {
    name: "NewEvent",
    components: {LoadingScreen, ValidatedInput},
    emits: ['setShowWindow'],
    data() {
        return {
            api: {
                createEvent: "/Archery/createEvent/",
                addTarget: "/Archery/addTargets/",
                addParticipant: "/Archery/addParticipant/",
                getPartialMatches: "/Archery/getUsersByEmail"
            },
            config,
            targetIndex: 0,
            values: {
                eventId: 0,
                eventData: {
                    eventName: "",
                    address: "",
                    zipCode: "",
                    city: "",
                    date: "",
                    time: "",
                    scoringType: 'false'
                },
                targets: {
                    0: ""
                },
                participants: [
                    {
                        firstName: "",
                        lastName: "",
                        nickname: "",
                        userEmail: ""
                    }
                ]
            },
            validation: {
                eventName: true,
                address: true,
                zipCode: true,
                city: true,
                date: true,
                time: true,
            },
            show: {
                current: 0,
                eventData: 0,
                targets: 1,
                participants: 2
            },
            currentIndex: 0,
            loading: false,
            targetValidation: [true],
            participantValidation: [true],
            partialMatchIndex: -1,
            partialMatches: [],
            activeElement: useActiveElement()
        }
    },
    watch: {
        activeElement(newValue, oldValue) {
            if (newValue.id && newValue.value) {
                this.partialMatchIndex = newValue.id
            } else {
                setTimeout(() => {
                    this.partialMatchIndex = -1
                }, 150)
            }
        }
    },
    methods: {
        addTarget() {
            this.targetIndex++
            this.values.targets[this.targetIndex] = ""
            this.targetValidation.push(true);
        },
        deleteTarget(key, index) {
            delete this.values.targets[key]
            this.targetValidation.splice(index, 1)
        },
        deleteParticipant(index) {
            this.values.participants.splice(index, 1)
            this.participantValidation.splice(index, 1)
        },
        addParticipant() {
            this.values.participants.push({
                firstName: "",
                lastName: "",
                nickname: "",
                userEmail: ""
            })
            this.participantValidation.push(true)
        },
        async createEvent() {
            let valid = true
            for (let participantValid in this.participantValidation) {
                let temp = this.values.participants[participantValid]
                if (temp.firstName && temp.lastName && temp.nickname) {
                    this.participantValidation[participantValid] = true
                } else {
                    this.participantValidation[participantValid] = false
                    valid = false
                }
            }

            if (valid) {
                this.loading = true;
                await this.eventRequest()
                await this.targetRequest()
                await this.participantRequest()
                this.$emit('setShowWindow', config.view.EventOverview)
            }
        },
        async eventRequest() {
            let type = 'true' == this.values.eventData.scoringType
            let response = await axios({
                url: config.api.url + this.api.createEvent,
                method: "put",
                headers: {
                    "Authorization": `Bearer ${localStorage.BearerToken}`,
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                },
                data: {
                    name: this.values.eventData.eventName,
                    street: this.values.eventData.address,
                    zip: this.values.eventData.zipCode,
                    city: this.values.eventData.city,
                    date: this.values.eventData.date.replace("-", "."),
                    time: this.values.eventData.time,
                    scoringType: type,
                    arrowValue: 0,
                    userEmail: localStorage.Email
                }
            })
                .then(function (response) {
                    return response;
                })
                .catch(err => console.log(err + "ERROR caught"))
            if (response !== undefined) {
                this.values.eventId = response["data"]["eventID"]
                return response;
            }
        },
        async targetRequest() {
            let response = await axios({
                url: config.api.url + this.api.addTarget,
                method: "put",
                headers: {
                    "Authorization": `Bearer ${localStorage.BearerToken}`,
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                },
                data: {
                    eventID: this.values.eventId,
                    targets: this.values.targets
                }
            })
                .then(function (response) {
                    return response;
                })
                .catch(err => console.log(err + "ERROR caught"))
            if (response !== undefined) {
                return response;
            }
        },
        async participantRequest() {
            let response = await axios({
                url: config.api.url + this.api.addParticipant,
                method: "put",
                headers: {
                    "Authorization": `Bearer ${localStorage.BearerToken}`,
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                },
                data: {
                    eventID: this.values.eventId,
                    participants: this.values.participants
                }
            })
                .then(function (response) {
                    this.loading = false;
                    return response;
                })
                .catch(err => console.log(err + "ERROR caught"))
            if (response !== undefined) {
                return response;
            }
        },
        showTargets() {
            for (let validationKey in this.validation) {
                this.validation[validationKey] = true
            }
            let valid = true
            if (!this.values.eventData.eventName) {
                this.validation.eventName = false
                valid = false
            }
            if (!this.values.eventData.address) {
                this.validation.address = false
                valid = false
            }
            if (!this.values.eventData.zipCode) {
                this.validation.zipCode = false
                valid = false
            }
            if (!this.values.eventData.city) {
                this.validation.city = false
                valid = false
            }
            if (!this.values.eventData.date) {
                this.validation.date = false
                valid = false
            }
            if (!this.values.eventData.time) {
                this.validation.time = false
                valid = false
            }

            if (valid) {
                this.show.current = this.show.targets
            }
        },
        showParticipants() {
            let valid = true
            let counter = 0
            for (let target in this.values.targets) {
                if (this.values.targets[target]) {
                    this.targetValidation[counter] = true
                } else {
                    this.targetValidation[counter] = false
                    valid = false
                }
                counter++
            }
            if (valid) {
                this.show.current = this.show.participants
            }
        },
        partialMatch(index) {
            if (this.activeElement.id == index && this.activeElement.value) {
                this.partialMatchIndex = index
                this.getPartialMatches(index)
            } else {
                this.partialMatchIndex = -1
                this.partialMatches = []
            }
        },
        getPartialMatches(index) {
            axios({
                url: config.api.url + this.api.getPartialMatches,
                method: "post",
                headers: {
                    "Authorization": `Bearer ${localStorage.BearerToken}`,
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                },
                data: {
                    email: this.values.participants[index].userEmail,
                    nickname: ""
                }
            }).then((result) => {
                this.partialMatches = result["data"]["users"]
            })
        },
        autoFill(user, index) {
            this.values.participants[index].userEmail = user.userEmail
            this.values.participants[index].firstName = user.firstName
            this.values.participants[index].lastName = user.lastName
            this.values.participants[index].nickname = user.nickName
        }
    }
}
</script>

<style scoped>

</style>