<template>
	<div>
		<v-container>
		<v-row>
			<v-col>
				<h2>{{ gameName }}</h2>
				<v-container>
					<v-row>
						<v-col>
							<div class="game-players-list d-flex flex-wrap">
								<v-card class="game-player mb-6" v-for="(player, index) in players" :key="player.id">
									<div class="player">
										<v-btn text fab absolute small class="delete-player" @click="deletePlayer(index)"><v-icon>mdi-delete</v-icon></v-btn>
										<h3 v-if="!player.editName" @click="editName(player)" class="pr-8">{{ player.name }}</h3>
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
											v-model="player.newScore"
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
					<v-btn @click="endRound" color="primary">End Game</v-btn>
				</div>
			</v-col>
		</v-row>
	</v-container>
		<!-- Die Roll -->
				<div class="container col-sm-12 main-content">
					<div class="block-container">
						<button type="button" :onclick="rollDice" class="btn btn-primary diceButton">Roll the dice</button>
					</div>
					<div class="block-container">
						<img id="dice" class="dice" :src="path">
					</div>
				</div>
		<!-- Coin Flip	 -->
				<div class='container'>
					<div id="coin" class=''>
						<div id="heads" class="heads"></div>
						<div id="tails" class="tails"></div>
					</div>
					<button id="flip" :onclick="flipCoin">Flip Coin</button>
					<p>Heads: <span id="headsCount">0</span> Tails: <span id="tailsCount">0</span></p>
					<p><span id="status"></span></p>
				</div>

	</div>
</template>

<script>
import firestore from '../../firebase';

const numRegex = /(^$|^-?[0-9]*$|null)/; // used to validate number

// var path = 'https://openclipart.org/download/282132/Die';
// var generateRandomNumber = '';
// var defineImgPath = '';
// var deferFn = '';
// var processResult = '';
// const coin = document.querySelector('#coin');
// const status = document.querySelector('#status');
// const heads = document.querySelector('#headsCount');
// const tails = document.querySelector('#tailsCount');
// let headsCount = 0;
// let tailsCount = 0;

export default {
	data() {
		return {
			userId: this.$store.state.uid,
			gameName: this.$store.state.gameName || '',
			players: [],
			newScores: [],
			scoreRules: [
				value => numRegex.test(value) || 'Only Numbers are Valid',
			],
		};
	},
	computed: {
		gameId() {
			return this.$route.params.gameId || null;
		},
		gameDocRef() {
			if (this.$store.state.uid) {
				return firestore.collection('users').doc(this.$store.state.uid).collection('nertz').doc(this.gameId) || null;
			}
			return null;
		},
	},
	methods: {
		getGame() {
			this.gameDocRef.onSnapshot((doc) => {
				this.gameName = doc.data().gameName;
				this.players = doc.data().gameData.players;
			});

		},
		updateFirestore() {
			this.gameDocRef.update({
				players: this.players,
			});
		},
		addPlayer() {
			let nextId = 1;
			if (this.players.length > 0) {
				nextId = this.players[this.players.length - 1].id + 1;
			}
			this.players.push({
				id: nextId,
				name: 'New Player',
				scores: [],
				newScore: null,
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
		editScore(index) {
			console.log(index);
		},

	},
	created() {
		this.getGame();
	},
}


</script>

<style scoped>
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

.main-content {
	padding: 0;
	margin-top: 10px;
}

.block-container {
	width: 100%;
	display: inline;
}

.dice {
	display: inline-block;
	padding: 10px 0 0 20px;
	border-radius: 10px;
	width:50px;
	height:50px;
}

.diceButton {
	vertical-align: top;
	padding-top: 20px;
}

h2 {
  margin: .25rem;
}

div.container {
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

button {
  padding: 1rem;
  background-color: lightgray;
}

#coin {
  position: relative;
  width: 5rem;
  height: 5rem;
  margin: 2rem 0rem;
  transform-style: preserve-3d;

}

#coin div {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  backface-visibility: hidden;
  background-size: contain;
  position: absolute;
}

.heads {
    background-image: url("https://en.numista.com/catalogue/photos/tokens/127867-original.jpg");
}

.animate-heads {
  animation: flipHeads 3s;
  animation-fill-mode: forwards;
}

@keyframes flipHeads {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(1800deg);
  }
}

.tails {
    background-image: url("https://en.numista.com/catalogue/photos/tokens/89965-original.jpg");
  transform: rotateY(-180deg);
}

.animate-tails {
  animation: flipTails 3s;
  animation-fill-mode: forwards;
}

@keyframes flipTails {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(1620deg);
  }
}


</style>