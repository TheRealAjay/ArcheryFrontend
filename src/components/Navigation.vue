<template>
  <nav class="navbar navbar-dark mt-3">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <font-awesome-icon :icon="['fas', 'bullseye']" style="color: #000000;" />
        Archers Companion
        </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Username placeholder</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#" @click="registerEvent">Registrieren</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#" @click="loginEvent">Anmelden</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import offcanvas from "bootstrap/js/src/offcanvas";
export default {
  name: "Navigation",
  emits: ["register", "login"],
  methods:{
    registerEvent(){
      this.$emit('register')
      offcanvas.getInstance(document.querySelector(".offcanvas")).hide()
    },
    loginEvent(){
      this.$emit('login')
      offcanvas.getInstance(document.querySelector(".offcanvas")).hide()
    }
  }
}
</script>

<style scoped>

</style>