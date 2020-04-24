<template>
	<v-container>
		<v-dialog v-model="dialog" width="800">
			<template v-slot:activator="{ on }">
				<v-btn color="blue" dark v-on="on" @click="getGames">
					<v-icon left>mdi-book-open-variant</v-icon>
					Game Information
				</v-btn>
			</template>

			<v-card>
				<v-tabs
					v-model="tab"
					background-color="blue"
					class="elevation-2"
					dark
				>
					<v-tabs-slider></v-tabs-slider>

					<v-tab
                        v-for="i in tabs"
                        :key="i.i"
                        :href="`#tab-${i}`"
                        @click="getData">
						{{ i }}
					</v-tab>

					<v-tab-item v-for="i in tabs" :key="i.i" :value="'tab-' + i">
						<v-card flat tile>
							<div v-if="i === 'Game Version'">
                                <p class="text-center title">Game Versions</p>
								<v-radio-group v-model="gameSelected" class="ml-5">
									<v-radio
										v-for="type in gameTypes.games"
										:key="type.i"
										:label="`${type.name}`"
										:value="type.name">
									</v-radio>
								</v-radio-group>
							</div>
							<div v-if="i === 'Game Information'">
								<div>
                                    <div v-if="selected === false">
                                        <p class="display-1 text-center py-8">Select a Game Version</p>
                                    </div>
                                    <v-container v-if="selected === true">
                                        <v-card-title class="headline" primary-title
										>{{ results.name }}
										<span class="title font-weight-light ml-6"
											>({{ results.primary_publisher }})</span
										></v-card-title>
									<v-card-text>
										<v-row>
											<v-col>
												<p class="subtitle-1">Description</p>
												<p v-html="results.description"></p>
											</v-col>
										</v-row>
										<v-row class="d-flex justify-center">
											<v-col class="text-center">
												<p class="subtitle-1">Number of Players</p>
												<v-chip label medium color="green" class="mx-2" dark
													>Min {{ results.min_players }}</v-chip
												>
												<v-chip label medium color="green" class="mx-2" dark
													>Max {{ results.max_players }}</v-chip
												>
											</v-col>
											<v-col class="text-center">
												<p class="subtitle-1">Average User Rating</p>
												<v-rating
													:value="results.average_user_rating"
													color="amber"
													dense
													half-increments
													readonly
													size="24"
												></v-rating>
											</v-col>
										</v-row>
									</v-card-text>
                                    </v-container>
								</div>
							</div>
						</v-card>
					</v-tab-item>
				</v-tabs>
				<div>
					<v-divider></v-divider>
					<v-card-actions>
						<!-- <v-btn color="success" text :to="this.results.rules_url">View Rules</v-btn> -->
						<v-spacer></v-spacer>
						<v-btn color="primary" text @click="dialog = false">Done</v-btn>
					</v-card-actions>
				</div>
			</v-card>
		</v-dialog>
	</v-container>
</template>

<script>
import axios from 'axios';
export default {
	props: ['game'],
	data: () => ({
		dialog: false,
		tab: null,
		type: 0,
		icons: false,
		radioGroup: 1,
		selected: false,
		gameSelected: null,
		gameId: null,
		radios: '',
		gameTypes: [],
		tabs: ['Game Version', 'Game Information'],
		url: process.env.VUE_APP_CLIENT_ID,
		id: 'ELR3qC7h46',
		results: null,
	}),
	methods: {
		getGames() {
			axios
				.get(
					`https://www.boardgameatlas.com/api/search?name=${this.game}&client_id=${this.id}`,
				)
				.then(response => {
					this.gameTypes = response.data;
				});
		},
		getData() {
			this.selected = true
			let test = []
			test.push(this.gameTypes)
			let id = test[0].games.filter(e => e.name === this.gameSelected)
			axios
				.get(
					`https://www.boardgameatlas.com/api/search?ids=${id[0].id}&client_id=${this.url}`,
				)
				.then(response => {
					this.results = response.data.games[0];
					console.log(this.results);
				});
		},
	},
};
</script>

<style></style>
