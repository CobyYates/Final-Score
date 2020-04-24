<template>
	<v-app id="container" :key="componentKey">
		<v-row id="stripes">
			<v-col xs="12" md="11" lg="10" xl="8" class="mx-auto">
				<v-row>
					<v-col cols="4"></v-col>
					<v-col cols="4"><p class="display-2 text-center">YAHTZEE</p></v-col>
					<v-col cols="4"><Rules :game="this.gameTitle"/></v-col>
				</v-row>
				<v-row v-if="gameStarted == false">
					<v-col class="mx-auto beforeGame d-flex justify-center align-center">
						<v-btn x-large color="success" @click="startGame()"
							>Start Game</v-btn
						>
					</v-col>
				</v-row>

				<v-row v-else-if="gameStarted">
					<v-col
						cols="12"
						xs="12"
						sm="12"
						md="6"
						class="mx-auto my-0 py-0 d-flex justify-center"
					>
						<div class="mx-auto">
							<p
								v-for="(item, i) in gameData.data.upperNew"
								:key="i"
								class="d-flex title"
							>
								<span v-if="item.text">
									<p id="bonus">{{ item.text }}</p>
								</span>
								<v-icon color="white" x-large>{{ item.icon }}</v-icon>
								<v-col v-if="item.button">
									<v-btn
										color="red"
										dark
										class="mx-1 mt-1 elevation-4"
										v-for="(btn, i) in item.values"
										:key="i"
										@click="add(btn, 0), (item.enabled = true)"
										:disabled="item.enabled"
										>{{ btn }}</v-btn
									>
								</v-col>
								<v-col cols="7" v-if="upperScore >= 63 && item.extra">
									<v-alert
										dense
										dark
										text
										border="left"
										icon="mdi-dice-6"
										prominent
										color="red"
										>Bonus Added! (35 pts)</v-alert
									>
								</v-col>
								<v-col v-if="item.extra && upperScore < 63">
									<p class="subtitle-1 bonus">
										If Upper Section is greater than 63
									</p>
								</v-col>
							</p>
						</div>
					</v-col>
					<v-col
						cols="12"
						xs="12"
						sm="12"
						md="6"
						class="mr-auto my-0 py-0 d-flex justify-center"
					>
						<div>
							<p
								v-for="(item, i) in gameData.data.lowerNew"
								:key="i"
								wi
								class="d-flex title"
							>
								<span>
									<p id="textAlign">{{ item.text }}</p>
								</span>
								<v-col v-if="item.button">
									<v-btn
										color="red"
										dark
										class="mx-1 mt-1 elevation-4"
										v-for="(btn, i) in item.values"
										:key="i"
										@click="add(btn, item.yahtzee), (item.enabled = true)"
										:disabled="item.enabled"
										>{{ btn }}</v-btn
									>
									<div v-if="i == 5 && !yahtzee">
										<v-btn
											color="green"
											class="mx-1 mt-2 elevation-4"
											:disabled="yah.e"
											@click="add(yah.v, lowerScore, false), (yah.e = true)"
											dark
											v-for="yah in item.yahtzeeBonus"
											:key="yah.i"
											>{{ yah.v }}</v-btn
										>
									</div>
								</v-col>
								<v-col v-if="item.input" cols="8">
									<v-form class="d-flex align-baseline justify-space-between">
										<v-text-field
											dense
											solo
											placeholder="total of dice"
											class="mr-6"
											v-model="item.values"
										></v-text-field>
										<v-btn
											color="red"
											dark
											class="ml-1 elevation-4"
											@click="
												add(parseInt(item.values), lowerScore),
													(item.enabled = true)
											"
											:disabled="item.enabled"
											>Add</v-btn
										>
									</v-form>
								</v-col>
							</p>
						</div>
						<v-dialog v-model="endDialog" persistent max-width="290">
							<v-card>
								<v-card-title class="headline">Game Over</v-card-title>
								<v-card-text class="title text-center">Congratulations! You have finished the game.</v-card-text>
								<p class="display-1 text-center mx-auto d-flex justify-center align-center">
									Your Score: {{ this.totalScore }}
								</p>
								<v-card-text class="title text-center">Start New Game?</v-card-text>
								<v-card-actions>
									<v-spacer></v-spacer>
									<v-btn color="green darken-1" text @click="endDialog = false"
										>No</v-btn
									>
									<v-btn
										color="green darken-1"
										text
										@click="(endDialog = false), saveGame"
										>Yes</v-btn
									>
								</v-card-actions>
							</v-card>
						</v-dialog>
					</v-col>
				</v-row>
				<v-row> </v-row>
			</v-col>
		</v-row>
		<v-card
			v-if="this.gameStarted"
			class="display-1 mx-auto d-flex justify-center align-center elevation-4"
			height="100"
			color="red"
			width="300"
			dark
			>Total: {{ this.totalScore }}</v-card
		>
		<v-row v-if="userId">
			<v-col cols="6" class="mx-auto">
				<GamesList :dark="this.dark" :gameTitle="this.gameTitle" />
			</v-col>
		</v-row>
	</v-app>
</template>

<script>
import Rules from '../../components/Rules';
import firebase from 'firebase/app';
import firestore from '../../firebase';
import 'firebase/firestore';
import GamesList from '../../components/GamesList';
export default {
	components: {
		Rules,
		GamesList,
	},
	computed: {
		yahtzeeCollectionRef() {
			if (this.$store.state.uid) {
				return (
					firestore
						.collection('users')
						.doc(this.$store.state.uid)
						.collection('yahtzee') || null
				);
			}
			return null;
		},
	},
	data() {
		return {
			rolls: 0,
			endDialog: false,
			gameStarted: false,
			upperScore: 0,
			dark: true,
			lowerScore: 0,
			yahtzee: true,
			dialog: true,
			componentKey: 0,
			totalScore: 0,
			userId: this.$store.state.uid,
			gameTitle: 'yahtzee',
			gameName: 'Yahtzee',
			gameData: {
				data: {
					upperNew: [
						{
							icon: 'mdi-dice-1',
							button: true,
							input: false,
							default: 0,
							enabled: false,
							extra: false,
							values: [1, 2, 3, 4, 5, 6],
						},
						{
							icon: 'mdi-dice-2',
							button: true,
							input: false,
							default: 0,
							enabled: false,
							extra: false,
							values: [2, 4, 6, 8, 10, 12],
						},
						{
							icon: 'mdi-dice-3',
							button: true,
							input: false,
							default: 0,
							enabled: false,
							extra: false,
							values: [3, 6, 9, 12, 15, 18],
						},
						{
							icon: 'mdi-dice-4',
							button: true,
							input: false,
							default: 0,
							enabled: false,
							extra: false,
							values: [4, 8, 12, 16, 20, 24],
						},
						{
							icon: 'mdi-dice-5',
							button: true,
							input: false,
							default: 0,
							enabled: false,
							extra: false,
							values: [5, 10, 15, 20, 25, 30],
						},
						{
							icon: 'mdi-dice-6',
							button: true,
							input: false,
							default: 0,
							enabled: false,
							extra: false,
							values: [6, 12, 18, 24, 30, 36],
						},
						{
							text: 'Bonus',
							button: false,
							input: false,
							default: 0,
							enabled: false,
							extra: true,
							values: [35],
						},
					],
					lowerNew: [
						{
							text: '3 of kind',
							button: false,
							input: true,
							default: 0,
							enabled: false,
							values: null,
						},
						{
							text: '4 of kind',
							button: false,
							input: true,
							default: 0,
							enabled: false,
							values: null,
						},
						{
							text: 'Full House',
							button: true,
							input: false,
							default: 0,
							enabled: false,
							values: [25],
						},
						{
							text: 'Sm. Straight',
							button: true,
							input: false,
							default: 0,
							enabled: false,
							values: [30],
						},
						{
							text: 'Lg. Straight',
							button: true,
							input: false,
							default: 0,
							enabled: false,
							values: [40],
						},
						{
							text: 'YAHTZEE',
							button: true,
							input: false,
							yahtzee: true,
							default: 0,
							enabled: false,
							values: [50],
							yahtzeeBonus: [
								{ e: false, v: 100 },
								{ e: false, v: 100 },
								{ e: false, v: 100 },
								{ e: false, v: 100 },
							],
						},
						{
							text: 'Chance',
							button: false,
							input: true,
							default: 0,
							enabled: false,
							values: null,
						},
					],
				},
			},
		};
	},
	methods: {
		getGame() {
			this.yahtzeeCollectionRef.onSnapshot((doc) => {
				this.gameName = doc.data().gameName;
				this.gameData = doc.data().gameData;
			});
		},
		updateFirestore() {
			this.gameDocRef.update({
				updated: firebase.firestore.Timestamp.now(),
				gameData: this.gameData,
			});
			this.restartGame()
		},
		startGame() {
			this.gameStarted = true;
		},
		restartGame(){
			this.$router.go(0);
		},
		upperTotal(section) {
			return section.reduce((acc, section) => {
				return acc + parseInt(section.score);
			}, 0);
		},
		add(value, section, notAdd) {
			notAdd == false ? this.rolls : this.rolls++;
			section === 0 ? (this.upperScore += value) : (this.lowerScore += value);
			this.totalScore += value;

			if (section == true) {
				this.yahtzee = false;
			}
			if (this.upperScore >= 63) {
				this.totalScore += 63;
			}
			
			if (this.rolls === 13) {
				this.endDialog = true
				this.yahtzeeCollectionRef.add({
					created: firebase.firestore.Timestamp.now(),
					updated: firebase.firestore.Timestamp.now(),
					gameId: '',
					gameName: `Score: ${this.totalScore}`,
					gameData: this.gameData.data,
				})
					.then((docRef) => {
						docRef.update({
							gameId: docRef.id,
						})
						docRef.get().then(game => {
							this.$store.dispatch('setGame', game.data())
						})
					})
					.catch((err) => {
						console.error('Error adding document: ', err)
					})
			}
			else {this.endDialog = false}
		},
		saveGame() {
			this.updateFirestore();
		},
	},
	created() {
		this.getGame()
	},
};
</script>

<style scoped>
#textAlign {
	width: 120px;
	margin-top: 20px;
	text-align: right;
}
#bonus {
	padding-right: 10px;
	margin-top: 20px;
}
.bonus {
	margin-top: 12px;
}

#inspire {
	background: none;
}

#container {
	padding-top: 0;
	padding-bottom: 200px;
	margin-bottom: 0;
	margin-top: 0;
	background: #222222;
	background: -webkit-linear-gradient(to right, #434343, #1b1b1b);
	background: linear-gradient(to right, #434343, #1b1b1b);
}
p {
	color: white;
}

.beforeGame {
	height: 50vh;
}
</style>
