<template>
  <form>
    <ValidatedInput v-model="email" label="Email" type="email" error-msg="Bitte geben sie eine valide Email ein." :valid=validation.email></ValidatedInput>
    <ValidatedInput v-model="username" label="Nutzername" type="text" error-msg="3-20 Zeichen;Nur Zahlen und Buchstaben" :valid=validation.username></ValidatedInput>
    <ValidatedInput v-model="firstName" label="Vorname" type="text" error-msg="Bitte geben sie Ihren Vornamen ein" :valid=validation.firstName></ValidatedInput>
    <ValidatedInput v-model="lastName" label="Nachname" type="text" error-msg="Bitte geben sie Ihren Nachnamen ein" :valid=validation.lastName></ValidatedInput>
    <ValidatedInput v-model="password" label="Passwort" type="password" error-msg="Min. 8 Zeichen lang;Min. ein Groß- und Kleinbuchstaben;Min. eine Zahl und ein Sonderzeichen" :valid=validation.password></ValidatedInput>
    <ValidatedInput v-model="repeatPassword" label="Passwort wiederholen" type="password" error-msg="Passwort stimmt nicht überein" :valid=validation.repeatPassword></ValidatedInput>
    <button @click="registerApi" type="button" class="btn btn-success">Registrieren</button>
  </form>
</template>

<script>
import ValidatedInput from "@/components/ValidatedInput.vue";

export default {
  name: "Register",
  components: {ValidatedInput},
  data() {
    return {
      email: "",
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      repeatPassword:"",
      validation: {
        email: true,
        username: true,
        password: true,
        firstName: true,
        lastName: true,
        repeatPassword: true,
      }
    }
  },
  methods: {
    registerApi() {
      if (!this.validateInput()) {
        console.log("invalid")
        return
      }

    },
    validateInput() {
      let returnValue = true
      for (let key in this.validation) {
        this.validation[key] = true
        console.log(key)
      }
      if (!/(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/.test(this.email)) {
        this.validation.email = false;
        returnValue = false;
      }
      if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(this.password)) {
        this.validation.password = false;
        returnValue = false;
      }
      if (!this.password == this.repeatPassword) {
        this.validation.repeatPassword = false;
        returnValue = false;
      }
      if (!/^[A-Za-z0-9]{3,20}$/.test(this.username)) {
        this.validation.username = false;
        returnValue = false;
      }
      if (this.firstName.length < 1) {
        this.validation.firstName = false;
        returnValue = false;
      }
      if (this.lastName.length < 1) {
        this.validation.lastName = false;
        returnValue = false;
      }
      return returnValue;
    }
  }
}
</script>