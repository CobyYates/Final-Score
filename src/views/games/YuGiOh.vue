<template>
	<div>
		<v-row class="mx-12">
			<v-col cols="12" sm="6" md="5" lg="4" xl="4" class="ml-auto">
				<p class="text-center title">PLAYER ONE</p>
				<v-data-table
					:headers="playerOneHeaders"
					:items="playerOne"
					hide-default-footer
					dark
					class="mb-12"
				>
					<template v-slot:item.score="props">
						<v-edit-dialog :return-value.sync="props.item.score">
							{{ props.item.score }}
							<template v-slot:input>
								<v-text-field
									v-model="props.item.score"
									:rules="[max3chars]"
									label="Add Score"
									single-line
									counter
								></v-text-field>
							</template>
						</v-edit-dialog>
					</template>
				</v-data-table>
				<p>TOTAL SCORE: {{scoreTotal()}}</p>
                <br>
                <p>Player One recived -200 damage</p>
                <v-button>GIVE DAMAGE</v-button>
                <br>
                <v-button>GIVE POINTS</v-button>
                <p v-show="playerTwoWinner">Player One Lost All Points</p>
                <p v-show="playerOneWinner">Player One Kicked Player Two's Trash</p>
                <p v-show=true>Player One Lost All Points</p>
                <p v-show=false>Player One Kicked Player Two's Trash</p>
				<div class="container col-sm-12 main-content">
					<div class="block-container">
						<button type="button" :onclick="rollDice" class="btn btn-primary diceButton">Roll the dice</button>
					</div>
					<div class="block-container">
						<img id="dice" class="dice" :src="path">
					</div>
				</div>
			</v-col>
            <v-col cols="12" sm="6" md="5" lg="4" xl="4" class="mr-auto">
				<p class="text-center title">PLAYER TWO</p>
				<v-data-table
					:headers="playerOneHeaders"
					:items="playerOne"
					hide-default-footer
					dark
					class="mb-12"
				>
					<template v-slot:item.score="props">
						<v-edit-dialog :return-value.sync="props.item.score">
							{{ props.item.score }}
							<template v-slot:input>
								<v-text-field
									v-model="props.item.score"
									:rules="[max3chars]"
									label="Add Score"
									single-line
									counter
								></v-text-field>
							</template>
						</v-edit-dialog>
					</template>
				</v-data-table>
				<p>TOTAL SCORE: {{scoreTotal()}}</p>
                <br>
                <p>Player One recived -1500 damage</p>
                <v-button>GIVE DAMAGE</v-button>
                <br>
                <v-button>GIVE POINTS</v-button>
                <p v-show="playerOneWinner">Player Two Lost All Points</p>
                <p v-show="playerTwoWinner">Player Two Kicked Player One's Trash</p>
                <p v-show=false>Player Two Lost All Points</p>
                <p v-show=true>Player Two Kicked Player One's Trash</p>
				<div class='container'>
					<div id="coin" class=''>
						<div id="heads" class="heads"></div>
						<div id="tails" class="tails"></div>
					</div>
					<button id="flip" :onclick="flipCoin">Flip Coin</button>
					<p>Heads: <span id="headsCount">0</span> Tails: <span id="tailsCount">0</span></p>
					<p><span id="status"></span></p>
				</div>
			</v-col>
		</v-row>
	</div>
</template>

<script>
var path = 'https://openclipart.org/download/282132/Die';
// var generateRandomNumber = '';
// var defineImgPath = '';
var deferFn = '';
var processResult = '';
const coin = document.querySelector('#coin');
const status = document.querySelector('#status');
const heads = document.querySelector('#headsCount');
const tails = document.querySelector('#tailsCount');
let headsCount = 0;
let tailsCount = 0;
export default {
	data() {
		return {
			max3chars: v => v.length <= 3 || 'Input too long!',
			winnerCheck: false,
			path: 'https://openclipart.org/download/282132/Die',
			playerOneHeaders: [
				{
					text: 'Points Lost/Gained',
					align: 'start',
					sortable: false,
					value: 'name',
				},
				{ text: 'Score', value: 'score' },
			],
			playerOne: [
				{
					name: 'Damage Received',
					score: -200,
				},
				{
					name: 'Points Gained',
					score: 20,
				},
				{
					name: 'Damage Received',
					score: -2500,
				},
				{
					name: 'Damage Received',
					score: -300,
				},
				{
					name: 'Damage Received',
					score: -1500,
				},
				{
					name: 'Points Gained',
					score: 500,
				},
				{
					name: 'Damage Received',
					score: -200,
				},
			],
		};
	},
	methods: {
		scoreTotal(){
			return this.playerOne.reduce((acc, playerOne) => {return acc + playerOne.score}, 0)
		},
		deferFn(callback, ms) {
			setTimeout(callback, ms); 
		},
		processResult(result) {
			if (result === 'heads') {
				headsCount++;
				heads.innerText = headsCount;
			} else {
				tailsCount++;
				tails.innerText = tailsCount;
			}
			status.innerText = result.toUpperCase();
		},
		// TODO: make this work
		flipCoin() {
			coin.setAttribute('class', '');
			const random = Math.random();
			const result = random < 0.5 ? 'heads' : 'tails';
			deferFn(function() {
				coin.setAttribute('class', 'animate-' + result);
				deferFn(processResult.bind(null, result), 2900);
			}, 100);
		},
	},

	computed: {
		generateRandomNumber () {
			return Math.floor(Math.random() * 6) + 1;
		},
		defineImgPath: function (result) {
			if (result == 1) {
				path = 'https://openclipart.org/download/282127/Die';
			}
			if (result == 2) {
				path = 'https://openclipart.org/download/282128/Die';
			}
			if (result == 3) {
				path = 'https://openclipart.org/download/282129/Die';
			}
			if (result == 4) {
				path = 'https://openclipart.org/download/282130/Die';
			}
			if (result == 5) {
				path = 'https://openclipart.org/download/282131/Die';
			}
			if (result == 6) {
				path = 'https://openclipart.org/download/282127/Die';
			}
			return path;
		},
		// changeDiceFace (result) {
		// var dice = document.querySelector('#dice');
		// dicePath = dice.setAttribute('src', path + result + '.svg');
		// return dicePath;
		// },
		// TODO: make this work
		// rollDice () {
		// 	var result = generateRandomNumber();
		// 	defineImgPath(result);
		// 	//changeDiceFace(result); //this now done in defineImgPath the path/dice face
		// 	return false;
		// },
	},
};
</script>

<style scoped>
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