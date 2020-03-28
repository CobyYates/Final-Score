<template>
	<v-container>
		<v-row>
			<v-col>
				<form @submit.prevent="signUp">
					<v-text-field
						type="email"
						label="Email Address"
						v-model="email"
						name="email"
						id="email"
						:rules="emailRules"
					></v-text-field>
					<v-text-field label="Username" v-model="username" name="username" id="username"></v-text-field>
					<v-text-field
						type="password"
						label="Password"
						v-model="password"
						name="password"
						id="password"
						:rules="passwordRules"
					></v-text-field>
					<v-text-field
						type="password"
						label="Confirm Password"
						v-model="confirmPassword"
						name="confirmPassword"
						id="confirmPassword"
						:rules="password2Rules"
					></v-text-field>
					<v-btn class="submit primary" type="submit" :disabled="loginDisabled">Sign Up</v-btn>
				</form>
				<error :error="error" v-if="error"></error>
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<v-card class="text-center d-inline-flex">
					<v-card-title class="d-block">
						Been here before?
						<router-link to="/signIn">Sign In</router-link>
					</v-card-title>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default {
	data() {
		return {
			email: '',
			username: '',
			password: '',
			confirmPassword: '',
			emailRules: [
				value => emailRegex.test(value) || 'Valid email is required',
			],
			passwordRules: [
				value => value.length > 5 || 'Password much be at least 6 characters',
			],
			password2Rules: [
				value => value.length > 5 || 'Password much be at least 6 characters',
				value => value === this.password || 'Passwords much match',
			],
		};
	},
	computed: {
		user() {
			return this.$store.state.username;
		},
		loginDisabled() {
			return this.$store.state.loginDisabled;
		},
		error() {
			return this.$store.state.error;
		},
	},
	methods: {
		signUp() {
			if (this.loginDisabled == false) {
				this.$store.dispatch('disableLogin');
				this.$store.dispatch('createUser', { email: this.email, username: this.username, password: this.password });
			}
		},
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
