<template>
	<div>
		<v-container>
		<v-row>
			<v-col>
				<v-container>
					<v-row>
						<div class="add-player-card mb-6">
							<v-btn color="orange" dark @click="addPlayer">
								<v-icon>mdi-plus</v-icon>
								<span>Add Player</span>
							</v-btn>
						</div>
					</v-row>
					<v-row>
						<v-col>
							<div class="game-players-list d-flex flex-wrap">
								<v-card class="game-player mb-6" v-for="(player, index) in players" :key="player.id">
									<div class="player">
										<v-btn text fab absolute small class="delete-player" @click="deletePlayer(index)"><v-icon style=" padding-bottom: 12px;">mdi-delete</v-icon></v-btn>
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
										<v-text-field
											type="tel"
											label="Life Points"
											:rules="scoreRules"
											pattern="[0-9]*"
											lazy-validation="true"
											class="scoreInput"
											v-model="player.newScore"
										></v-text-field>
									</div>
								</v-card>
								
							</div>
						</v-col>
					</v-row>
				</v-container>
				<div v-if="this.players.length > 0" class="end-round-container">
					<v-btn color="primary" @click="newGame()">New Game</v-btn>
				</div>
			</v-col>
		</v-row>
		<!-- Die Roll -->
				<div class="container">
					<div>
						<img id="dice" class="dice" :src="path">
						<!-- <img id="dice" class="dice" :src="this.path"> -->
					</div>
					<div>
						<v-btn type="button" @click="rollDice" class="btn diceButton">Roll the dice</v-btn>
					</div>
				</div>
		<!-- Coin Flip -->
				<div class='container'>
					<div>
						<img id="coin" class="coin" :src="coinPath">
					</div>
					<div>
					<v-btn type="button" @click="flipCoin" class="btn coinButton">Flip Coin</v-btn>
					</div>
					<p>Heads: <span id="headsCount">{{this.headCount}}</span> Tails: <span id="tailsCount">{{this.tailCount}}</span></p>
					<p><span id="status"></span></p>
				</div>
	</v-container>
	</div>
</template>

<script>

const numRegex = /(^$|^-?[0-9]*$|null)/; // used to validate number

var path = 'https://openclipart.org/download/282131/Die';
var coinPath = 'https://en.numista.com/catalogue/photos/tokens/89965-original.jpg';
var headCount = 0;
var tailCount = 0;


export default {
	data() {
		return {
			path: 'https://openclipart.org/download/282131/Die',
			coinPath: 'https://en.numista.com/catalogue/photos/tokens/89965-original.jpg',
			headCount: 0,
			tailCount: 0,
			userId: this.$store.state.uid,
			gameName: this.$store.state.gameName || '',
			players: [],
			newScores: [],
			scoreRules: [
				value => numRegex.test(value) || 'Only Numbers are Valid',
			],
		};
	},
	methods: {
		newGame() {
			this.players = [];
		},
		addPlayer() {
			let nextId = 1;
			let playersName = 'Player 1';
			if (this.players.length > 0) {
				nextId = this.players[this.players.length - 1].id + 1;
			}
			//to prevent duplicate names in game if players don't want to type in names
			playersName = 'Player' + nextId;
			this.players.push({
				id: nextId,
				name: playersName,
				scores: [],
				newScore: '8000',
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
		rollDice() {
			//radomNumberGenerator
			var result = Math.floor(Math.random() * 6) + 1;
			
			// defineImgPath;
			switch (result) {
				case 1:
					path = 'https://openclipart.org/download/282127/Die';
					break;
				case 2:
					path = 'https://openclipart.org/download/282128/Die';
					break;
				case 3:
					path = 'https://openclipart.org/download/282129/Die';
					break;
				case 4:
					path = 'https://openclipart.org/download/282130/Die';
					break;
				case 5:
					path = 'https://openclipart.org/download/282131/Die';
					break;
				case 6:
					path = 'https://openclipart.org/download/282132/Die';
					break;
			}
			// changeDiceFace
			document.getElementById('dice').src = path;
		},
		flipCoin() {
			//radomNumberGenerator
			var result = Math.floor(Math.random() * 2) + 1;
			
			// defineImgPath;
			switch (result) {
				case 1:
					coinPath = 'https://en.numista.com/catalogue/photos/tokens/89965-original.jpg';
					// headsTails = 'Tails';
					this.tailCount = tailCount + 1;
					break;
				case 2:
					coinPath = 'https://en.numista.com/catalogue/photos/tokens/127867-original.jpg';
					// headsTails = 'Heads';
					this.headCount = headCount +1;
					break;
			}
			// set new count for next switch
			headCount = this.headCount;
			tailCount = this.tailCount;


			// changeCoinFace
			document.getElementById('coin').src = coinPath;
		},
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
	margin-bottom: 2rem;
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
	padding-bottom: 20px;
	border-radius: 10px;
	width:50px;
}

.diceButton {
	vertical-align: top;
	padding-top: 20px;
}
.coinButton {
	vertical-align: top;
	padding-top: 10px;
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
  margin: .5rem 0 1rem 0;
}

</style>