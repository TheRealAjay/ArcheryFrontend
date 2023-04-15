<template>
    <div class="container">
        <div class="row ">
            <div class="col-12">
                <div class="header">Events</div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="archery-button small" @click="$emit('setShowWindow', config.view.Dashboard)">
                    <div class="outline"></div>
                    <div class="text">
                        <font-awesome-icon :icon="['far', 'square-caret-left']" style="color: #ffffff;" />
                        &nbspZurück</div>
                    <div class="overlay red"></div>
                </div>
            </div>
            <div class="col-12">
                <div class="archery-button small" @click="$emit('setShowWindow', config.view.EventHistory)">
                    <div class="outline"></div>
                    <div class="text">
                        <font-awesome-icon :icon="['fas', 'clock-rotate-left']" style="color: #ffffff;" />
                        &nbspEventverlauf</div>
                    <div class="overlay dark"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import config from "../../config.json"
export default {
    name: "EventOverfiew",
    emits: ["setShowWindow"],
    data(){
        return{
            config
        }
    }
}
</script>

<style scoped>

</style>