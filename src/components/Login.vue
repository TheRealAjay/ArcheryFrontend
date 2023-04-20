<template>
    <LoadingScreen v-if="loading === true"></LoadingScreen>
    <div class="container">
        <div class="row">
            <div class="col-12 col-lg-8">
                <form novalidate class="archery-form-style">
                    <h3 class="mb-4">Login</h3>
                    <ValidatedInput v-model="email" type="email" label="E-Mail" :valid=true></ValidatedInput>
                    <ValidatedInput error-msg="Nutzername oder Passwort falsch" v-model="password"
                                    type="password" label="Passwort" :valid=valid></ValidatedInput>
                    <button @click="fetchToken" class="btn text-uppercase mt-4 btn-outline" type="button">Anmelden</button>
                    <p class="mt-4 mb-0">Noch keinen Account erstellt? </p>
                    <a href="#" class="archery-link" @click="$emit('register')">Hier registrieren!</a>
                </form>
            </div>
        </div>
    </div>
    <div>
        <img src="./../assets/images/bg_forms.png" alt="background mountain" class="bg-img">
    </div>
</template>

<script>
import axios from "axios";
import config from '../../config.json'
import ValidatedInput from "@/components/smallComponents/ValidatedInput.vue";
import LoadingScreen from "@/components/LoadingScreen.vue";

export default {
    name: "Login",
    components: {LoadingScreen, ValidatedInput},
    emits: ['register', 'success'],
    data() {
        return {
            email: '',
            password: '',
            apiPath: '/Auth/login',
            valid: true,
            loading: false,
        }
    },
    methods: {
        async fetchToken() {
            this.loading = true;
            let response = await axios({
                url: config.api.url + this.apiPath,
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                },
                data: {
                    email: this.email,
                    password: this.password
                }
            })
                .then(function (response) {
                    localStorage.Username = response["data"]["username"];
                    localStorage.Email = response["data"]["email"];
                    localStorage.ProfilePicture = response["data"]["base64String"];
                    localStorage.BearerToken = response["data"]["token"];
                    return response["data"]["token"]
                })
                .catch(err => console.log(err + "ERROR caught"))
            if (response !== undefined) {
                this.valid = true;
                this.$emit('success')
            } else {
                this.valid = false;
            }
          setTimeout(() => {
            this.loading = false;
          }, Math.random() * 500 + 200);
        }
    }
}
</script>