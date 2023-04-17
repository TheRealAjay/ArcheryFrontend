<template>
  <div class="container archery-form-style">
    <div class="row">
      <div class="col-12 mb-4">
        <h6>13.03.2023</h6>
        <h3 class="mb-4">Eventname</h3>
        <p class="mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elit dolor, tincidunt et velit
          non, vestibulum pellentesque risus. Fusce et libero sit amet eros vulputate euismod.</p>
        <p> Alle Felder mit einem Stern (*) müssen ausgefüllt werden.</p>
      </div>
      <div v-for="(target, index) in targets" class="col-12">
        <div class="archery-button large">
          <div class="outline"></div>
          <div class="text">
            <font-awesome-icon :icon="['fas', 'bullseye']" style="color: #000000;"/>
            {{target.targetName}}
          </div>
          <div v-if="currentTarget === index" class="overlay green"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import config from "../../config.json";

export default {
  data() {
    return {
      api: {
        getTargets: "/Archery/getTargets/"
      },
      targets: [],
      currentTarget: 0
    }
  },
  name: "Event",
  props: ['eventID'],
  async beforeMount() {
    await this.getTargets();
  },
  methods: {
    async getTargets() {
      let response = await axios({
        url: config.api.url + this.api.getTargets,
        method: "post",
        headers: {
          "Authorization": `Bearer ${localStorage.BearerToken}`,
          "Content-Type": "application/json",
          "Accept": "*/*",
        },
        data: {
          eventID: 3,
        }
      })
          .then(function (response) {
            return response;
          })
          .catch(err => console.log(err + "ERROR caught"))
      if (response !== undefined) {
        this.targets = response["data"]["targets"]
      }
    }
  }
}
</script>

<style scoped>

</style>