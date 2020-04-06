<template>
	<v-container>
		<v-row>
			<v-col>
				<h2>{{ gameName }}</h2>
				<v-container>
					<v-row>
						<v-col>
							<error :error="error" v-if="error" class="mb-6"></error>
							<div class="game-players-list d-flex flex-wrap">
								<v-card class="game-player mb-6" v-for="(player, index) in players" :key="player.id">
									<div class="player">
										<v-btn text fab absolute small class="delete-player" @click="deletePlayer(index)"><v-icon>mdi-delete</v-icon></v-btn>
										<h3 v-if="!player.editName" @click="editName(player)">{{ player.name }}</h3>
										<v-text-field
											v-if="player.editName"
											label="Player Name"
											:clearable="true"
											class="editNameInput"
											v-model="player.name"
											@blur="endEditName(player)"
											autofocus
											ref="playerName"
											aria-autocomplete="off"
										></v-text-field>
										<ul>
											<li
												class="round-score"
												v-for="(score, index) in player.scores"
												:key="index"
												@click="editScore(index)"
											>Round {{index+1}} Score: {{ score }}</li>
										</ul>
										<p class="sum">Total: {{ player.totalScore }}</p>
										<v-text-field
											type="tel"
											label="New Score"
											:rules="scoreRules"
											pattern="[0-9]*"
											lazy-validation="true"
											class="scoreInput"
										></v-text-field>
									</div>
								</v-card>
								<div class="add-player-card mb-6">
									<v-btn color="pink" dark @click="addPlayer">
										<v-icon>mdi-plus</v-icon>
										<span>Add Player</span>
									</v-btn>
								</div>
							</div>
						</v-col>
					</v-row>
				</v-container>
				<div class="end-round-container">
					<v-btn @click="endRound" color="primary">End Round</v-btn>
				</div>
			</v-col>
		</v-row>
	</v-container>

</template>

<script>
import Error from '../../components/Error.vue';

const numRegex = /(^$|^[0-9]*$|null)/; // checks to make sure it's a number

export default {
	data() {
		return {
			userId: this.$store.state.uid,
			gameId: this.$store.state.gameId || 0,
			gameName: this.$store.state.gameName || '',
			players: [],
			newScores: [],
			scoreRules: [
				value => numRegex.test(value) || 'Only Numbers are Valid',
			],
			editingPlayer: null,
			editingName: '',
		};
	},
	computed: {
		error() {
			return this.$store.state.error;
		},
	},
	methods: {
		addPlayer() {
			let nextId = 1;
			if (this.players.length > 0) {
				nextId = this.players[this.players.length - 1].id + 1;
			}
			this.players.push({
				id: nextId,
				name: 'New Player',
				scores: [],
				totalScore: 0,
				editName: true,
			});
		},
		editName(player) {
			player.editName = true;
		},
		endEditName(player) {
			player.editName = false;
		},
		deletePlayer(index) {
			this.players.splice(index, 1);
		},
		sumScores() {
			for (let player of this.players) {
				player.totalScore = player.scores.reduce((a, b) => a + b, 0);
			}
		},
		endRound() {
			document.getElementsByClassName('scoreInput').forEach((score) => {
				if (score.getElementsByTagName('input')[0].value != '') {
					const value = parseInt(score.getElementsByTagName('input')[0].value);
					this.newScores.push(value);
				}
			});
			if (this.newScores.length === this.players.length) {
				for (let i = 0; i < this.newScores.length; i++) {
					this.players[i].scores.push(this.newScores[i]);
				}
				this.$store.dispatch('clearError');
				this.newScores = [];
				this.sumScores();
				document.getElementsByClassName('scoreInput').forEach((score) => {
					score.getElementsByTagName('input')[0].value = '';
				});
			} else {
				this.$store.dispatch('error', 'You must enter a score for each player');
				this.newScores = [];
			}
		},
		editScore(index) {
			console.log(index);
		},

	},
	created() {
		this.sumScores();
	},
	components: {
		Error,
	},
}
</script>

<style lang="scss" scoped>
.game-players-list {
	justify-content: space-around;
}
.player {
	padding: 1rem;
	position: relative;
	ul {
		list-style: none;
		padding: 0;
	}
}
.delete-player {
	top: .5rem;
	right: .5rem;
}
.sum {
	font-weight: 900;
}
.round-score {
	transition: background-color 0.5s;
}
.add-player-card {
	display: flex;
	align-items: center;
}

.end-round-container {
	display: flex;
	justify-content: center;
	margin-top: 2rem;
}
</style>