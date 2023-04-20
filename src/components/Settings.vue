<template>
    <LoadingScreen v-if="this.loading === true"></LoadingScreen>
    <div class="container">
        <div class="row align-items-center mb-5">
            <div class="col-12 col-lg-9">
                <div class="header">Einstellungen</div>
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
            <div class="col-12 d-flex justify-content-start align-items-center">
                <div>
                    <img v-if="loggedin" :src=profilePicture class="profile-pic img-fluid" alt="profileImg">
                </div>
                <div class="ms-3">
                    <div class="name">
                        {{ firstName }} {{ lastName }}
                    </div>
                    <div class="username">
                        @{{ username }}
                    </div>
                </div>
            </div>
        </div>
        <form action="">
            <div class="row">
                <div class="col-12">
<!--                    <ValidatedInput v-model="values.firstName" error-msg="Bitte befüllen Sie dieses Feld"-->
<!--                                    type="text" label="Vorname*" :valid="validation.eventName"-->
<!--                                    :optional-validation=true />-->
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import config from "../../config.json";
import axios from "axios";
import LoadingScreen from "@/components/LoadingScreen.vue";
import ValidatedInput from "@/components/smallComponents/ValidatedInput.vue";

export default {
    name: "Settings",
    components: {ValidatedInput, LoadingScreen},
    props: ["loggedin"],
    emits: ["setShowWindow"],
    data() {
        return {
            api: {
                changeUsername: "/Archery/changeUserName/",
                getUserData: "/Archery/getUserData/",
            },
            profilePicture: localStorage.ProfilePicture,
            username: localStorage.Username,
            loading: false,
            firstName: "",
            lastName: "",
            values: {
                firstName: "",
                lastName: "",
                nickName: "",
            },
            validation: {
                firstName: true,
                lastName: true,
                nickName: true,
            },
            config,
        }
    },
    methods: {
        async getUserData() {
            await axios({
                url: config.api.url + this.api.getUserData,
                method: "post",
                headers: {
                    "Authorization": `Bearer ${localStorage.BearerToken}`,
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                },
                data: {
                    userEmail: localStorage.Email,
                }
            }).then((result) => {
                let obj = JSON.parse(result.request.response);
                this.firstName = obj.firstName;
                this.lastName = obj.lastName;
                setTimeout(() => {
                    this.loading = false;
                }, Math.random() * 500);
            })
        },
    },
    beforeMount() {
        this.loading = true;
        this.getUserData();
    }
}
</script>

<style scoped>

</style>