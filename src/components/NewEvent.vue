<template>
    <div class="container">
        <div class="row">
            <form class="archery-form-style">
                <div class="col-12">
                    <h3 class="mb-4">Event Anlegen</h3>
                    <p class="mb-3">
                        Bitte geben Sie die Eventdaten ein, fügen Sie Zielscheiben hinzu und fügen Sie schließlich
                        Teilnehmer hinzu, um ein neues Event zu erstellen.
                    </p>
                    <p>
                        Alle Felder mit einem Stern (*) müssen ausgefüllt werden.
                    </p>
                </div>
                <div class="col-12">
                    <!--todo: implement display to show eventdaten/zielscheiben/teilnehmer-->
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
                    <button class="btn btn-outline mt-2 float-end" type="button" @click="show.current=show.targets">
                        Weiter
                    </button>
                </div>
                <div class="col-12" v-if="show.current === show.targets">
                    <div class="row" v-for="(target, key, index) in values.targets">
                        <div class="col-8">
                            <validated-input label="Name*" type="text" v-model="this.values.targets[key]"
                                             error-msg="Bitte befüllen Sie dieses Feld" :valid=true
                                             :optional-validation=true></validated-input>
                        </div>
                        <div v-if="1 < Object.keys(values.targets).length" class="col-2">
                            <a href="#">
                                <font-awesome-icon :icon="['far', 'trash-can']" size="xl" style="color: #ffffff;"
                                                   @click="deleteTarget(key)" />
                            </a>
                        </div>
                        <div v-if="index === Object.keys(values.targets).length-1" style="font-size: 30px"
                             class="col-2">
                            <a href="#" @click="addTarget()">+</a>
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col-12">
                            <button class="btn mt-2 btn-outline" type="button" @click="show.current=show.eventData">
                                Zurück
                            </button>
                            <button class="btn mt-2 btn-outline float-end" type="button"
                                    @click="show.current=show.participants">Weiter
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
                                             v-model="this.values.participants[index]['email']"
                                             error-msg="Bitte befüllen Sie dieses Feld" :valid=true
                                             :optional-validation=true></validated-input>
                            <validated-input label="Vorname*" type="text"
                                             v-model="this.values.participants[index]['firstName']"
                                             error-msg="Bitte befüllen Sie dieses Feld" :valid=true
                                             :optional-validation=true></validated-input>
                            <validated-input label="Nachname*" type="text"
                                             v-model="this.values.participants[index]['lastName']"
                                             error-msg="Bitte befüllen Sie dieses Feld" :valid=true
                                             :optional-validation=true></validated-input>
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
                        <div class="col-12">
                            <button class="btn mt-2 btn-outline" type="button" @click="show.current=show.targets">
                                Zurück
                            </button>
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

export default {
    name: "NewEvent",
    components: {ValidatedInput},
    data() {
        return {
            api: {
                createEvent: "/Archery/createEvent/",
                addTarget: "/Archery/addTargets/",
                addParticipant: "/Archery/addParticipant/"
            },
            targetIndex: 0,
            values: {
                eventId: 2,
                eventData: {
                    eventName: "",
                    address: "",
                    zipCode: "",
                    city: "",
                    date: "",
                    time: "",
                },
                targets: {
                    0: ""
                },
                participants: [
                    {
                        firstName: "",
                        lastName: "",
                        nickname: "",
                        email: ""
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
            currentIndex: 0
        }
    },
    methods: {
        addTarget() {
            this.targetIndex++
            this.values.targets[this.targetIndex] = ""
        },
        deleteTarget(key) {
            delete this.values.targets[key]
        },
        deleteParticipant(index) {
            this.values.participants.splice(index, 1)
        },
        addParticipant() {
            this.values.participants.push({
                firstName: "",
                lastName: "",
                nickname: "",
                email: ""
            })
        },
        async createEvent() {
            let test = this.values.eventId
            await this.eventRequest()
            await this.targetRequest()
            await this.participantRequest()
        },
        async eventRequest() {
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
                    return response;
                })
                .catch(err => console.log(err + "ERROR caught"))
            if (response !== undefined) {
                return response;
            }
        },
    }
}
</script>

<style scoped>

</style>