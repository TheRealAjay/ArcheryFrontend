<template>
  <div class="container">
    <div class="row ">
      <div class="col-12">
        <div class="header">Dashboard</div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="archery-button large" @click="$emit('setShowWindow', 1)">
          <div class="outline"></div>
          <div class="text">
            <font-awesome-icon :icon="['far', 'calendar']" style="color: #ffffff;"/>
            Events
          </div>
          <div class="overlay blue"></div>
          <img src="./../assets/images/hourglass_image.png" class="background" alt="Events">
        </div>
      </div>
      <div class="col-12">
        <div class="archery-button large" @click="$emit('setShowWindow', 2)">
          <div class="outline"></div>
          <div class="text">
            <font-awesome-icon :icon="['fas', 'bullseye']" style="color: #000000;"/>
            Event anlegen
          </div>
          <div class="overlay green"></div>
          <img src="./../assets/images/target.png" class="background" alt="Event anlegen">
        </div>
      </div>
      <div class="col-12">
        <div class="archery-button small" @click="$emit('setShowWindow', 3)">
          <div class="outline"></div>
          <div class="text"><font-awesome-icon :icon="['fas', 'gears']" style="color: #ffffff;" /> Einstellungen</div>
          <div class="overlay dark"></div>
          <img src="./../assets/images/filing.png" class="background" alt="Einstellungen">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  emits: ["setShowWindow"]
}
</script>

<style scoped>

</style>