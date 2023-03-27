<template>


  <form>
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input v-model="email" type="email" class="form-control" id="email" aria-describedby="emailHelp">
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Passwort</label>
      <input v-model="password" type="password" class="form-control" id="password">
    </div>
    <button @click="fetchToken" type="submit" class="btn btn-primary">Anmelden</button>
  </form>



</template>

<script>
import axios from "axios";
import config from '../../config.json'

export default {
  name: "Login",
  data() {
    return {
      email: '',
      password: '',
      apiPath: '/Auth/login',
      token: ''
    }
  },
  methods: {
    async fetchToken() {
      this.token = await axios({
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
            console.log(response)
            return response["data"]["token"];
          })
          .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>
form{
  left: 50%;
}
</style>