<template>
	<v-app id="inspire">
		<v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
			<v-list dense>
				<template v-for="item in items">
					<v-row v-if="item.heading" :key="item.heading" align="center">
						<v-col cols="6">
							<v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
						</v-col>
						<v-col cols="6" class="text-center">
							<a href="#!" class="body-2 black--text">EDIT</a>
						</v-col>
					</v-row>
					<v-list-group
						v-else-if="item.children"
						:key="item.text"
						v-model="item.model"
						:prepend-icon="item.model ? item.icon : item['icon-alt']"
						append-icon
					>
						<template v-slot:activator>
							<v-list-item-content>
								<v-list-item-title>{{ item.text }}</v-list-item-title>
							</v-list-item-content>
						</template>
						<v-list-item v-for="(child, i) in item.children" :key="i" link :to="child.to">
							<v-list-item-action v-if="child.icon">
								<v-icon>{{ child.icon }}</v-icon>
							</v-list-item-action>
							<v-list-item-content>
								<v-list-item-title>{{ child.text }}</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-list-group>
					<v-list-item v-else :key="item.text" link>
						<v-list-item-action>
							<v-icon>{{ item.icon }}</v-icon>
						</v-list-item-action>
						<v-list-item-content>
							<v-list-item-title>{{ item.text }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</template>
			</v-list>
		</v-navigation-drawer>

		<v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark dense>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer" />
			<v-toolbar-title style="width: 300px" class="ml-0 pl-4">
				<v-icon>mdi-chess-rook</v-icon>
				<span class="hidden-sm-and-down ml-3">
					<span class="font-weight-thin">FINAL</span> SCORE
				</span>
			</v-toolbar-title>
			<v-text-field
				flat
				solo-inverted
				hide-details
				prepend-inner-icon="mdi-magnify"
				label="Search"
				class="hidden-sm-and-down"
			/>
			<v-spacer />
			<!-- right content if needed -->
			<router-link to="/signIn" class="auth-link">
				<v-list-item link>
					<v-list-item-icon>
						<v-icon>mdi-login</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>Sign In</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</router-link>
			<router-link to="/signUp" class="auth-link">
				<v-list-item link>
					<v-list-item-icon>
						<v-icon>mdi-account-plus</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>Sign Up</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</router-link>
		</v-app-bar>
		<v-content>
			<router-view />
		</v-content>

		<!-- Bottom right button {+} -->
		<v-btn bottom color="pink" dark fab fixed right @click="dialog = !dialog">
			<v-icon>mdi-plus</v-icon>
		</v-btn>
		<v-dialog v-model="dialog" width="800px">
			<v-card>
				<v-card-title class="grey darken-2">Create contact</v-card-title>
				<v-container>
					<v-row class="mx-2">content</v-row>
				</v-container>
				<v-card-actions>
					<v-btn text color="primary">More</v-btn>
					<v-spacer />
					<v-btn text color="primary" @click="dialog = false">Cancel</v-btn>
					<v-btn text @click="dialog = false">Save</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-app>
</template>

<script>
import firebase from "firebase";

export default {
	props: {
		source: String
	},
	beforeCreate() {
		firebase.auth().onAuthStateChanged(currentUser => {
			if (currentUser) {
				this.$store.dispatch("setUid", currentUser.uid);
				this.$store.dispatch("setUsername", currentUser.displayName);
			} else {
				this.$store.commit("resetState");
			}
		});
	},

	data: () => ({
		dialog: false,
		drawer: null,
		items: [
			{ icon: "mdi-home-outline", text: "Home", color: "blue", to: "/" },
			{
				icon: "mdi-history",
				text: "Your Score Cards",
				color: "blue",
				to: "history"
			},
			{
				icon: "mdi-chevron-up",
				"icon-alt": "mdi-chevron-down",
				text: "Games",
				model: false,
				children: [
					{
						text: "Blank",
						icon: "mdi-checkbox-blank-outline",
						color: "blue",
						to: ""
					},
					{
						text: "Settlers",
						icon: "mdi-dice-5-outline",
						color: "purple",
						to: ""
					},
					{
						text: "Yahtzee",
						icon: "mdi-dice-5-outline",
						color: "red",
						to: "/yahtzee"
					},
					{text: "Yu-Gi-Oh!",
						icon: "mdi-cards-outline",
						color: "orange",
						to: "/yugioh"
					},
					{
						text: "Qwixx",
						icon: "mdi-dice-5-outline",
						color: "green",
						to: "/qwixx"
					},
					{
						text: "Blah Blah",
						icon: "mdi-dice-5-outline",
						color: "orange",
						to: ""
					},
					{
						text: "Blah Blah",
						icon: "mdi-dice-5-outline",
						color: "orange",
						to: ""
					},
					{
						text: "Nertz",
						icon: "mdi-cards-outline",
						color: "red",
						to: ""
					}
				]
			},
			{ icon: "mdi-settings", text: "Settings", color: "" }	
		]
	}),
	computed: {
		username() {
			return this.$store.state.username;
		}
	}
};
</script>

<style scoped>
.auth-link {
	text-decoration: none;
}
</style>
