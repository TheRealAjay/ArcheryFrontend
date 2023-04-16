<template>


    <form novalidate class="archery-form-style">
        <h3 class="mb-4">Login</h3>
        <ValidatedInput v-model="email" type="email" label="Nutzername/Email" :valid=true></ValidatedInput>
        <ValidatedInput error-msg="Nutzername oder Passwort falsch" v-model="password" type="password" label="Passwort"
                        :valid=valid></ValidatedInput>
        <button @click="fetchToken" class="btn text-uppercase mt-4" type="button">Anmelden</button>
        <p class="mt-4 mb-0">Noch keinen Account erstellt? </p>
        <a href="#" class="archery-link" @click="$emit('register')">Hier registrieren!</a>
    </form>


</template>

<script>
import axios from "axios";
import config from '../../config.json'
import ValidatedInput from "@/components/smallComponents/ValidatedInput.vue";

export default {
    name: "Login",
    components: {ValidatedInput},
    emits: ['register', 'success'],
    data() {
        return {
            email: '',
            password: '',
            apiPath: '/Auth/login',
            valid: true
        }
    },
    methods: {
        async fetchToken() {
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
        }
    }
}
</script>