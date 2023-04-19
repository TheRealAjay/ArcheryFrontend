<template>
	<LoadingScreen v-if="loading === true"></LoadingScreen>
	<div class="container">
		<div class="row">
			<div class="col-12 col-lg-8">
				<form class="archery-form-style">
					<h3 class="mb-3">Registriere dich jetzt</h3>
					<p class="mb-3">
						Bringe dein Bogenschießen auf die nächste Stufe mit Archer's Companion.
					</p>
					<p class="mb-5">
						Unser Score-Tracking-Tool und benutzerdefinierte Parkours ermöglichen es dir, deine Leistung zu
						verbessern
						und
						dich mit anderen Bogenschützen zu messen. Registriere dich noch heute!
					</p>
					<ValidatedInput v-model="email" label="Email" type="email"
									error-msg="Bitte geben sie eine valide Email ein"
									:valid=validation.email optional-error-msg="Diese Email wurde bereits registriert"
									:optional-validation=validation.emailUnique></ValidatedInput>
					<ValidatedInput v-model="username" label="Nutzername" type="text"
									error-msg="3-20 Zeichen;Nur Zahlen und Buchstaben"
									:valid=validation.username
									optional-error-msg="Diser Nutzername ist bereits vergeben"
									:optional-validation=validation.usernameUnique></ValidatedInput>
					<ValidatedInput v-model="firstName" label="Vorname" type="text"
									error-msg="Bitte geben sie Ihren Vornamen ein"
									:valid=validation.firstName :optional-validation=true></ValidatedInput>
					<ValidatedInput v-model="lastName" label="Nachname" type="text"
									error-msg="Bitte geben sie Ihren Nachnamen ein"
									:valid=validation.lastName :optional-validation=true></ValidatedInput>
					<ValidatedInput v-model="password" label="Passwort" type="password"
									error-msg="Min. 8 Zeichen lang;Min. ein Groß- und Kleinbuchstaben;Min. eine Zahl und ein Sonderzeichen"
									:valid=validation.password :optional-validation=true></ValidatedInput>
					<ValidatedInput v-model="repeatPassword" label="Passwort wiederholen" type="password"
									error-msg="Passwort stimmt nicht überein" :valid=validation.repeatPassword
									:optional-validation=true></ValidatedInput>
					<button @click="registerApi" type="button" class="btn mt-4">Registrieren</button>
				</form>
			</div>
		</div>
	</div>
	<div>
		<img src="./../assets/images/bg_forms.png" alt="background mountain" class="bg-img">
	</div>
</template>

<script>
import ValidatedInput from "@/components/smallComponents/ValidatedInput.vue";
import axios from "axios";
import config from "../../config.json";
import LoadingScreen from "@/components/LoadingScreen.vue";

export default {
	name: "Register",
	emits: ["registered"],
	components: { ValidatedInput, LoadingScreen },
	data() {
		return {
			api: {
				registerApiPath: "/Auth/register",
				checkUserInfo: "/Archery/getUserInfo/"
			},
			email: "",
			username: "",
			password: "",
			firstName: "",
			lastName: "",
			repeatPassword: "",
			validation: {
				email: true,
				username: true,
				password: true,
				firstName: true,
				lastName: true,
				repeatPassword: true,
				emailUnique: true,
				usernameUnique: true
			},
			loading: false,
		}
	},
	methods: {

		//Api call with all necessary data for user registration
		async registerApi() {
			if (!await this.validateInput()) {
				return
			}
			let response = await axios({
				url: config.api.url + this.api.registerApiPath,
				method: "post",
				headers: {
					"Content-Type": "application/json",
					"Accept": "*/*",
				},
				data: {
					email: this.email,
					username: this.username,
					password: this.password,
					firstName: this.firstName,
					lastName: this.lastName
				}
			})
			.then(function (response) {
				return response;
			})
			.catch(err => console.log(err + "ERROR caught"))
			if (response != undefined) {
				this.$emit("registered", true);
			}
		},

		//Validates all inputs
		async validateInput() {
			let returnValue = true
			for (let key in this.validation) {
				this.validation[key] = true
			}
			if (!/(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/.test(this.email)) {
				this.validation.email = false;
				returnValue = false;
			} else if (await this.checkIfUserExists(this.email, "")) {
				this.validation.emailUnique = false;
				returnValue = false;
			}

			if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(this.password)) {
				this.validation.password = false;
				returnValue = false;
			}
			if (this.password !== this.repeatPassword) {
				this.validation.repeatPassword = false;
				returnValue = false;
			}
			if (!/^[A-Za-z0-9]{3,20}$/.test(this.username)) {
				this.validation.username = false;
				returnValue = false;
			} else if (await this.checkIfUserExists("", this.username)) {
				this.validation.usernameUnique = false;
				returnValue = false;
			}
			if (this.firstName.length < 1) {
				this.validation.firstName = false;
				returnValue = false;
			}
			if (this.lastName.length < 1) {
				this.validation.lastName = false;
				returnValue = false;
			}
			return returnValue;
		},

		//returns if either email or username are already registered (used in validation)
		async checkIfUserExists(email, username) {
			return await axios({
				url: config.api.url + this.api.checkUserInfo,
				method: "post",
				headers: {
					"Content-Type": "application/json",
					"Accept": "*/*",
				},
				data: {
					email: email,
					nickname: username
				}
			}).then(function (result) {
				return result["data"]["boolean"]
			}).catch((e => console.log(e + "Error in checkIfUserExists")))
		}
	}
}
</script>