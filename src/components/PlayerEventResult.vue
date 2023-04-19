<template>
	<LoadingScreen v-if="loading === true"></LoadingScreen>
	<div class="container" v-if="loading === false">
		<div class="row">
			<div class="col-12">
				<div class="header">Performance Übersicht</div>
			</div>
			<div class="col-12">
				<div class="archery-button small" @click="$emit('setShowWindow', config.view.EventResults)">
					<div class="outline"></div>
					<div class="text">
						<font-awesome-icon :icon="['far', 'square-caret-left']" style="color: #ffffff;"/>
						&nbspZurück
					</div>
					<div class="overlay red"></div>
				</div>
			</div>
			<div class="col-12">
				<div class="mb-1">{{ eventInfo.formattedDate }}</div>
				<div class="header">{{ eventInfo.eventName }}</div>
			</div>
			<div class="col-12 d-flex justify-content-start align-items-center">
				<div class="position-relative">
					<img :src=score.base64Picture alt="Profile Picture">
					<img v-if="place === 1" src="./../assets/images/gold_medal_big.png" class="medal-icon large"
						 alt="gold medal">
					<img v-if="place === 2" src="./../assets/images/silver_medal_big.png" class="medal-icon large"
						 alt="silver medal">
					<img v-if="place === 3" src="./../assets/images/copper_medal_big.png" class="medal-icon large"
						 alt="copper medal">
				</div>
				<div class="ps-4 text">
					<div class="light">Platz {{ place }}</div>
					<div class="name mb-1">{{ firstName }} {{ lastName }}</div>
					<div class="light small">@{{ score.userName }}</div>
				</div>
			</div>
			<div class="col-12 col-lg-8 mt-5">
				<div class="d-flex w-100 mb-3">
					<div class="w-50 justify-content-start align-items-center">Zielscheibe</div>
					<div class="w-50 justify-content-end align-items-center text-end">Erreichte Punkte</div>
				</div>
				<div class="d-flex w-100 mb-2" v-for="arrowScore in arrowScores">
					<div class="w-25 justify-content-start align-items-center">{{ arrowScore.targetNumber }}</div>
					<div class="w-50 justify-content-center align-items-center">
						<div class="progress">
							<div class="progress-value " :class="'value-' + arrowScore.value"></div>
						</div>
					</div>
					<div class="w-25 justify-content-end align-items-center text-end">{{ arrowScore.value }}</div>
				</div>
				<div class="d-flex w-100 my-3">
					<div class="w-50 justify-content-start align-items-center">Gesamt</div>
					<div class="w-50 justify-content-end align-items-center text-end">{{ score.value }} Punkte</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import config from "../../config.json";
import LoadingScreen from "@/components/LoadingScreen.vue";

export default {
	components: { LoadingScreen },
	name: "PlayerEventResult",
	props: ["score", "eventId"],
	emits: ["setShowWindow"],
	data() {
		return {
			eventInfo: {},
			api: {
				getScores: "/Archery/getScoresForUser/",
				getEventInfo: "/Archery/getEventInfo/",
				getParticipantData: "/Archery/getParticipantData/"
			},
			place: 0,
			arrowScores: [],
			firstName: "",
			lastName: "",
			loading: true,
			config
		}
	},
	methods: {
		async getEventInfo() {
			let response = await axios({
				url: config.api.url + this.api.getEventInfo,
				method: "post",
				headers: {
					"Authorization": `Bearer ${localStorage.BearerToken}`,
					"Content-Type": "application/json",
					"Accept": "*/*",
				},
				data: {
					eventID: this.eventId,
				}
			})
			.then(function (response) {
				return response;
			})
			.catch(err => console.log(err + "ERROR caught"))
			if (response !== undefined) {
				this.eventInfo = response["data"]
			}
		},
		async getScoresForUser() {
			let response = await axios({
				url: config.api.url + this.api.getScores,
				method: "post",
				headers: {
					"Authorization": `Bearer ${localStorage.BearerToken}`,
					"Content-Type": "application/json",
					"Accept": "*/*",
				},
				data: {
					eventID: this.eventId,
					participantName: this.score.userName
				}
			})
			.then(function (response) {
				return response;
			})
			.catch(err => console.log(err + "ERROR caught"))
			if (response !== undefined) {
				this.arrowScores = response["data"]["arrowScores"];
				this.place = response["data"]["place"]
				this.loading = false;
			}
		},
		async getParticipantData() {
			await axios({
				url: config.api.url + this.api.getParticipantData,
				method: "post",
				headers: {
					"Authorization": `Bearer ${localStorage.BearerToken}`,
					"Content-Type": "application/json",
					"Accept": "*/*",
				},
				data: {
					participantID: this.score.userID,
				}
			}).then((result) => {
				this.firstName = result["data"]["firstName"]
				this.lastName = result["data"]["lastName"]
			})
		}
	},
	async beforeMount() {
		await this.getEventInfo()
		await this.getScoresForUser()
		await this.getParticipantData()
	}
}
</script>