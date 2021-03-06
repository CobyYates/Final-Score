<template>
	<v-app id="inspire">
		<v-navigation-drawer
			v-model="drawer"
			:clipped="$vuetify.breakpoint.lgAndUp"
			:disable-resize-watcher="sizeResponse"
			app
			hide-default-footer
		>
			<v-list-item v-if="username">
				<v-list-item-content>
					<h3 class="title">Welcome, {{ username }}</h3>
				</v-list-item-content>
			</v-list-item>
			<v-list dense>
				<template v-for="item in items">
					<v-row
						v-if="item.heading"
						:key="item.heading"
						align="center"
						:to="item.to"
					>
						<v-col cols="6">
							<v-subheader v-if="item.heading">
								{{ item.heading }}
							</v-subheader>
						</v-col>
					</v-row>
					<v-list-group
						v-else-if="item.children"
						:key="item.text"
						v-model="item.model"
						:prepend-icon="item.model ? item.icon : item['icon-alt']"
						append-icon=""
					>
						<template v-slot:activator>
							<v-list-item-content>
								<v-list-item-title>
									{{ item.text }}
								</v-list-item-title>
							</v-list-item-content>
						</template>
						<v-list-item
							v-for="(child, i) in item.children"
							:key="i"
							:to="child.to"
							link
						>
							<v-list-item-action v-if="child.icon">
								<v-icon :color="child.color">{{ child.icon }}</v-icon>
							</v-list-item-action>
							<v-list-item-content>
								<v-list-item-title>
									{{ child.text }}
								</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-list-group>
					<v-list-item v-else :key="item.text" link :to="item.to">
						<v-list-item-action>
							<v-icon :color="item.color">{{ item.icon }}</v-icon>
						</v-list-item-action>
						<v-list-item-content>
							<v-list-item-title>
								{{ item.text }}
							</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</template>
			</v-list>
		</v-navigation-drawer>

		<v-app-bar
			:clipped-left="$vuetify.breakpoint.lgAndUp"
			app
			color="blue darken-3"
			dark
			dense
		>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer" />
			<v-toolbar-title style="width: 300px" class="ml-0 pl-4">
				<v-icon>mdi-chess-rook</v-icon>
				<span class="hidden-sm-and-down ml-3">
					<span class="font-weight-thin">FINAL</span> SCORE</span
				>
			</v-toolbar-title>
			
			<v-spacer />
			<!-- right content if needed -->
			<router-link to="/signIn" class="auth-link" v-if="!loggedIn">
				<v-list-item link>
					<v-list-item-icon class="mr-2">
						<v-icon>mdi-login</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>Sign In</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</router-link>
			<router-link to="/signUp" class="auth-link" v-if="!loggedIn">
				<v-list-item link>
					<v-list-item-icon class="mr-2">
						<v-icon>mdi-account-plus</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>Sign Up</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</router-link>
			<a class="auth-link" @click.prevent="signOut" v-if="loggedIn">
				<v-list-item link>
					<v-list-item-icon class="mr-2">
						<v-icon>mdi-logout</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>Sign Out</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</a>
		</v-app-bar>
		<v-content class="my-0 ">
			<router-view />
		</v-content>
	</v-app>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
export default {
	props: {
		source: String,
	},
	beforeCreate() {
		firebase.auth().onAuthStateChanged((currentUser) => {
			if (currentUser) {
				this.$store.dispatch('setUid', currentUser.uid);
				this.$store.dispatch('setUsername', currentUser.displayName);
			} else {
				this.$store.commit('resetState');
			}
		});
	},
	data: () => ({
		dialog: false,
		sizeResponse: true,
		drawer: null,
		items: [
			{ icon: 'mdi-home-outline', text: 'Home', color: 'blue', to: '/' },
			{
				text: 'Yahtzee',
				icon: 'mdi-dice-5-outline',
				color: 'red',
				to: '/yahtzee',
			},
			{
				text: 'Quixx',
				icon: 'mdi-dice-5-outline',
				color: 'green',
				to: '/qwixx' ,
			},
			{
				text: 'Yu-Gi-Oh!',
				icon: 'mdi-cards-outline',
				color: 'orange',
				to: '/yugioh',
			},
			{
				text: 'Clue',
				icon: 'mdi-incognito',
				color: '#0D47A1',
				to: '/clue',
			},
			{
				text: 'Nertz',
				icon: 'mdi-cards-playing-outline',
				color: 'red',
				to: '/nertz',
			},
			/*{
				icon: 'mdi-chevron-up',
				'icon-alt': 'mdi-chevron-down',
				text: 'Games',
				model: false,
				children: [
					{
						text: 'Yahtzee',
						icon: 'mdi-dice-5-outline',
						color: 'red',
						to: '/yahtzee',
					},
					{
						text: 'Quixx',
						icon: 'mdi-dice-5-outline',
						color: 'green',
						to: '/qwixx' ,
					},
					{
						text: 'Yu-Gi-Oh!',
						icon: 'mdi-cards-outline',
						color: 'orange',
						to: '/yugioh',
					},
					{
						text: 'CLUE',
						icon: 'mdi-incognito',
						color: '#0D47A1',
						to: '/clue',
					},
					{
						text: 'Nertz',
						icon: 'mdi-cards-playing-outline',
						color: 'red',
						to: '/nertz',
					},
				],
			},
			{ icon: 'mdi-settings', text: 'Settings', color: 'grey', to: '' },*/
		],
	}),
	computed: {
		username() {
			return this.$store.state.username;
		},
		loggedIn() {
			return !!this.$store.state.uid;
		},
	},
	methods: {
		signOut() {
			this.$store.dispatch('signOut');
			this.$router.push('/');
		},
	},
	watch: {
		'$route' () {
			this.$store.dispatch('clearError');
		},
	},
};
</script>

<style scoped>
.auth-link {
	text-decoration: none;
}
</style>
