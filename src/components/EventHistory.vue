<template>
    <div class="container">
        <div class="row ">
            <div class="col-12">
                <div class="header">Eventverlauf</div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="archery-button small" @click="$emit('setShowWindow', 1)">
                    <div class="outline"></div>
                    <div class="text">(ICON) Zurück</div>
                    <div class="overlay red"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "EventHistory",
    emits: ["setShowWindow"]
}
</script>

<style scoped>

</style>