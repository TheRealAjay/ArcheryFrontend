<template>
    <div>
        <img src="../assets/images/home.png" alt="" class="home-image">
    </div>
    <div class="container home-container">
        <div class="row">
            <div class="col-12 col-lg-8">
                <div class="title">Bogenschießen <br> auf die moderne Art</div>
                <div class="text">
                    Unsere App bietet Event-Organisatoren und Bogenschützen gleichermaßen ein nahtloses
                    Erlebnis.<br><br> Erstelle benutzerdefinierte Kurse, verwalte Teilnehmer und erhalte am Ende des
                    Events umfassende
                    Statistiken, einschließlich deiner durchschnittlichen Punktzahl und Leistungsdaten.
                </div>
                <div class="archery-form-style mt-3 mb-5">
                    <button @click="$emit('setShowWindow', config.view.Register)" type="button" class="btn mt-2 btn-outline">
                        Jetzt registrieren
                    </button>
                </div>
            </div>
        </div>
        <h5>
        </h5>
    </div>
</template>

<script>
import config from "../../config.json";

export default {
    name: "Home",
    emits: ["setShowWindow"],
    data() {
        return {
            config: config
        }
    }
}
</script>

<style scoped>

</style>