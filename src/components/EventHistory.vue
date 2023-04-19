<template>
	<LoadingScreen v-if="loading === true"></LoadingScreen>
	<div class="container">
		<div class="row align-items-center">
			<div class="col-12 col-lg-9">
				<div class="header">Eventverlauf</div>
			</div>
			<div class="col-12 col-lg-3">
				<div class="archery-button small" @click="$emit('setShowWindow', config.view.EventOverview)">
					<div class="outline"></div>
					<div class="text">
						<font-awesome-icon :icon="['far', 'square-caret-left']" style="color: #ffffff;"/>
						&nbspZurück
					</div>
					<div class="overlay red"></div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-12" v-for="value in events">
				<div class="archery-button large" @click="clickActive(value.eventID)">
					<div class="outline"></div>
					<div class="text left">
						<div class="mb-1">
							<font-awesome-icon :icon="['far', 'calendar']" style="color: #ffffff;"/>
							{{ value.eventDate + " " + value.eventTime }}
						</div>
						<div class="light">{{ value.eventName }}</div>
						<div class="light small">{{ value.eventAddress }}</div>
					</div>
					<div class="overlay dark"></div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>

import config from "../../config.json"
import axios from "axios";
import LoadingScreen from "@/components/LoadingScreen.vue";

export default {
	name: "EventHistory",
	components: { LoadingScreen },
	emits: ["setShowWindow", "setEventId"],
	data() {
		return {
			api: {
				getEvents: "/Archery/getAllEvents/",
			},
			config,
			loading: false,
			events: []
		}
	},
	methods: {
		async getEvents() {
			await axios({
				url: config.api.url + this.api.getEvents,
				method: "post",
				headers: {
					"Authorization": `Bearer ${localStorage.BearerToken}`,
					"Content-Type": "application/json",
					"Accept": "*/*",
				},
				data: {
					userEmail: localStorage.Email,
					oldData: true
				}
			}).then((result) => {
				let obj = JSON.parse(result.request.response);
				for (const objElement of obj.events) {
					this.events.push({
						eventID: objElement.eventID,
						eventName: objElement.eventName,
						eventAddress: objElement.eventAddress,
						eventDate: objElement.formattedDate,
						eventTime: objElement.formattedTime
					})
				}
				setTimeout(() => {
					this.loading = false;
				}, Math.random() * 500);
			})
		},
		clickActive(eventID) {
			this.$emit('setShowWindow', config.view.EventResults);
			this.$emit('setEventId', eventID);
		}
	},
	beforeMount() {
		this.loading = true;
		this.getEvents();
	}
}
</script>

<style scoped>

</style>