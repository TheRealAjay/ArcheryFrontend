<template>
	<LoadingScreen v-if="loading === true"></LoadingScreen>
	<div class="container">
		<div class="row">
			<div class="col-12">
				<h6>{{ eventInfo.formattedDate + " &nbsp " + eventInfo.formattedTime }}</h6>
				<h3 class="mb-3">{{ eventInfo.eventName }}</h3>
				<p class="mb-3">{{ eventInfo.eventAddress }}</p>
			</div>
		</div>
		<div class="row mt-5 align-items-center">
			<div class="col-12 col-lg-9">
				<div class="header">Ergebnisse</div>
			</div>
			<div class="col-12 col-lg-3">
				<div class="archery-button small" @click="$emit('setShowWindow', config.view.EventHistory)">
					<div class="outline"></div>
					<div class="text">
						<font-awesome-icon :icon="['far', 'square-caret-left']" style="color: #ffffff;"/>
						&nbspZurück
					</div>
					<div class="overlay red"></div>
				</div>
			</div>
		</div>
		<div class="row scoreboard">
			<div class="col-12 col-lg-8">
				<div class="d-flex w-100 mb-3">
					<div class="d-flex align-items-center pe-3">Pl.</div>
					<div class="d-flex justify-content-start align-items-center" style="width: 50px"></div>
					<div class="flex-fill ps-2 d-flex justify-content-start align-items-center">Mitspieler</div>
					<div class="w-15 d-flex align-items-center">Punkte</div>
					<div class="w-auto d-flex pe-3 justify-content-end align-items-center"></div>
				</div>
				<div class="d-flex w-100 mb-3 cursor-pointer score-row" v-for="(score, index) in this.scores"
					 @click="$emit('setShowWindow', config.view.PlayerEventResults); $emit('score', score)">
					<div class="d-flex align-items-center pe-3">{{ score.place }}</div>
					<div
						class="position-relative score-row-col d-flex justify-content-start align-items-center border-white border-top border-bottom border-radius-left">
						<img :src=score.base64Picture width="50" alt="profilePic"
							 class="border-radius-circle">
						<img v-if="index === 0" src="./../assets/images/gold_medal.png" class="medal-icon"
							 alt="gold medal">
						<img v-if="index === 1" src="./../assets/images/silver_medal.png" class="medal-icon"
							 alt="silver medal">
						<img v-if="index === 2" src="./../assets/images/copper_medal.png" class="medal-icon"
							 alt="copper medal">
					</div>
					<div
						class="score-row-col flex-fill ps-3 d-flex justify-content-start align-items-center border-white border-top border-bottom">
						@{{ score.userName }}
					</div>
					<div class="score-row-col w-15 d-flex align-items-center border-white border-top border-bottom">
						{{ score.value }}
					</div>
					<div
						class="score-row-col w-auto d-flex pe-3 justify-content-end align-items-center border-white border-top border-bottom border-end border-radius-right">
						<font-awesome-icon :icon="['fas', 'caret-right']"/>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div>
		<img src="./../assets/images/bg_forms.png" alt="background mountain" class="bg-img d-none d-lg-block">
	</div>
</template>

<script>
import axios from "axios";
import config from "../../config.json";
import LoadingScreen from "@/components/LoadingScreen.vue";

export default {
	name: "EventResults",
	components: { LoadingScreen },
	emits: ["setShowWindow", "score"],
	data() {
		return {
			api: {
				getScores: "/Archery/getScoresForEvent/",
				getEventInfo: "/Archery/getEventInfo/"
			},
			eventInfo: {},
			scores: [],
			loading: false,
			config,
		}
	},
	props: ['eventId'],
	async beforeMount() {
		this.loading = true;
		await this.getEventInfo()
		await this.getScores()
	},
	methods: {
		async getScores() {
			await axios({
				url: config.api.url + this.api.getScores,
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
			.then((response) => {
				this.scores = response["data"]["scores"];
				this.loading = false;
			}).catch(err => console.log(err + "ERROR caught"));
		},
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
				this.eventInfo = response["data"];
			}
		}
	},
}
</script>

<style scoped>

</style>