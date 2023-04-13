<template>
    <div class="container">
        <div class="row ">
            <div class="col-12">
                <div class="header">Events</div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="archery-button small" @click="$emit('setShowWindow', 0)">
                    <div class="outline"></div>
                    <div class="text">(ICON) Zurück</div>
                    <div class="overlay red"></div>
                </div>
            </div>
            <div class="col-12">
                <div class="archery-button small" @click="$emit('setShowWindow', 4)">
                    <div class="outline"></div>
                    <div class="text">(ICON) Eventverlauf</div>
                    <div class="overlay dark"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Events",
    emits: ["setShowWindow"]
}
</script>

<style scoped>

</style>