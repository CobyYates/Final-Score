<template>
	<v-container>
		<v-row>
			<v-col>
				<form @submit.prevent="signIn">
					<v-text-field
						type="email"
						label="Email Address"
						v-model="email"
						name="email"
						id="email"
						:rules="emailRules"
					></v-text-field>
					<v-text-field
						type="password"
						label="Password"
						v-model="password"
						name="password"
						id="password"
						:rules="passwordRules"
					></v-text-field>
					<v-btn class="submit primary" type="submit" :disabled="disabled">Sign In</v-btn>
				</form>
				<error :error="error" v-if="error"></error>
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<v-card class="text-center d-inline-flex">
					<v-card-title class="d-block">
						New to Final Score?
						<router-link to="/signUp">Sign Up</router-link>
					</v-card-title>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import Error from '../components/Error.vue';

const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default {
	data() {
		return {
			email: '',
			password: '',
			emailRules: [
				value => emailRegex.test(value) || 'Valid email is required',
			],
			passwordRules: [
				value => value.length > 7 || 'Password much be at least 8 characters',
			],
		};
	},
	computed: {
		error() {
			return this.$store.state.error;
		},
		disabled() {
			return this.$store.state.loginDisabled;
		},
		user() {
			return this.$store.state.username;
		},
	},
	methods: {
		signIn() {
			this.$store.dispatch('disableLogin');
			this.$store.dispatch('signIn', { email: this.email, password: this.password });
		},
	},
	components: {
		Error,
	},
	watch: {
		user(value) {
			if (value !== null && value !== undefined) {
				this.$router.push('/');
			}
		},
	},
};
</script>

<style>

</style>
