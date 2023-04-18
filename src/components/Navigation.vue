<template>
    <nav class="navbar navbar-dark mt-3">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <font-awesome-icon :icon="['fas', 'bullseye']" style="color: #000000;"/>
                Archers Companion
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar"
                 aria-labelledby="offcanvasNavbarLabel">
                <div class="offcanvas-header d-flex justify-content-end">
                    <div type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                        <font-awesome-icon :icon="['fas', 'xmark']" size="xl" style="color: #ffffff;"/>
                    </div>
                </div>
                <div class="offcanvas-body">
                    <div class="profile">
                        <img v-if="loggedin" :src=profilePicture class="profile-pic" alt="profileImg">
                        <img v-else src="../assets/images/logo.png" alt="">
                        <p class="offcanvas-title" id="offcanvasNavbarLabel">{{ loggedin ? username : 'Archers Companion' }}</p>
                    </div>
                    <ul v-if="loggedin" class="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#"
                               @click="changeView(config.view.Dashboard)">Dashboard</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#"
                               @click="changeView(config.view.Settings)">Einstellungen</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#"
                               @click="changeView(config.view.Login); $emit('logout')">Abmelden</a>
                        </li>
                    </ul>
                    <ul v-else class="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#"
                               @click="changeView(config.view.Home)">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#"
                               @click="changeView(config.view.Register)">Registrieren</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#"
                               @click="changeView(config.view.Login)">Anmelden</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import offcanvas from "bootstrap/js/src/offcanvas";
import config from "../../config.json"

export default {
    name: "Navigation",
    emits: ["changeView", "logout"],
    methods: {
        changeView(viewIndex) {
            this.$emit('changeView', viewIndex)
            offcanvas.getInstance(document.querySelector(".offcanvas")).hide()
        }
    },
    props: ["loggedin"],
    data() {
        return {
            profilePicture: localStorage.ProfilePicture,
            username: localStorage.Username,
            config
        }
    }
}
</script>

<style scoped>

</style>