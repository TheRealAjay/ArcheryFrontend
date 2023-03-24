<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
// const axios = require('../node_modules/axios/dist/browser/axios.cjs')
</script>

<script>
import axios from "axios";

export default {
  data() {
    return {
      testMsg: 'test message',
      token: '',
      // url: 'https://localhost:7245//Auth/login',
      url: 'http://88.198.105.137:5000/Auth/login'
    }
  },
  methods: {
    test() {
      this.testMsg = this.testMsg.split('').reverse().join('');
    },
    fetchToken() {
      this.token = axios({
        url: this.url,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*",
          // "Accept-Encoding": "gzip, deflate, br",
          // "Origin": "http://localhost:5173/"
        },
        data: {
          email: "test@test.test",
          password: "testtest"
        }
      })
          .then(function(response){
            return response["token"];
          })
          .catch(err => console.log(err))

    }
  }
}
</script>

<template>
  <div @click="test">{{ token || testMsg }}</div>
  <br>
  <button type="button" class="btn btn-primary" @click="fetchToken">Fetch Token</button>

</template>
