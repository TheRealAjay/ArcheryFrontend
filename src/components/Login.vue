<template>


  <form novalidate class="archery-form-style">
    <h3 class="mb-3">Login</h3>
    <ValidatedInput v-model="email" type="email" label="Nutzername/Email" :valid=true></ValidatedInput>
    <ValidatedInput error-msg="Nutzername oder Passwort falsch" v-model="password" type="password" label="Passwort"
                    :valid=valid></ValidatedInput>
    <button @click="fetchToken" class="btn btn-success" type="button">Anmelden</button>

    <p class="m-2">Noch keinen Account erstell? Hier registrieren!</p>
    <button class="btn btn-primary" @click="$emit('register', true)" type="button">Registrieren</button>
  </form>


</template>

<script>
import axios from "axios";
import config from '../../config.json'
import ValidatedInput from "@/components/ValidatedInput.vue";

export default {
  name: "Login",
  components: {ValidatedInput},
  emits: ['token', 'register'],
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
            return response["data"]["token"]
          })
          .catch(err => console.log(err + "ERROR caught"))
      if (response != undefined) {
        this.valid = true;
        this.$emit('token', response)
      }
      else{
        this.valid = false;
      }
    }
  }
}
</script>