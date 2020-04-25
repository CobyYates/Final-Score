<template>
	<v-container>
		<v-row class="mx-4 my-4">
			<h2 class="display-3 font-weight-black underlined">Qwixx</h2>
			<v-col cols="4"><Rules :game="this.gameTitle" /></v-col>
			<v-col cols="4"><v-btn
					class="mr-6"
					large
					tile
					href="https://www.ultraboardgames.com/qwixx/game-rules.php"
					target="_blank"
					title="Open Rules in a new tab"
					>
					<v-icon class="mr-3" dark>mdi-book-open-variant</v-icon>Rules
					</v-btn>
			</v-col>
			
			
		</v-row>

		
		<!-----TO DO--------->
		
		<!------SAVE IT TO FIREBASE....---->

		
		<!---beginning of the buttons---->
		<v-row class="mb-6 mx-4">
			<div class="redBtns mr-3 mb-2" id="redButtons" v-for="(redBtn, i) in redBtns" :key="i">
				<v-btn class="red mark" @click="redRow++, redBtn.marked = !redBtn.marked"
				dark >
					<i v-bind:class="[{ 'white' : redBtn.marked }, 'material-icons']">{{redBtn.name}}</i>
				</v-btn>
				
			</div>
			<v-btn :disabled="checkRed" v-on:click="lockedRow++, lockRow(redBtns)">LOCK</v-btn>
			
		</v-row>
		<!--yellow row-->
		<v-row class="mb-6 mx-4">
			<div class="yellowBtns mr-3 mb-2" v-for="(yellowBtn, i) in yellowBtns" :key="i">
				<v-btn class="yellow mark" dark v-on:click="yellowRow++, yellowBtn.marked = !yellowBtn.marked">
					<i v-bind:class="[{ 'white' : yellowBtn.marked }, 'material-icons']">{{yellowBtn.name}}</i>
				</v-btn>
			</div>

			<v-btn :disabled="checkYellow" v-on:click="lockedRow++, lockRow(yellowBtns)">LOCK</v-btn>
		</v-row>
		<!--green row-->
		<v-row class="mb-6 mx-4">
			<div class="greenBtns mr-3 mb-2" v-for="(greenBtn, i) in greenBtns" :key="i">
				<v-btn class="green mark" dark v-on:click="greenRow++, greenBtn.marked = !greenBtn.marked">
					<i v-bind:class="[{ 'white' : greenBtn.marked }, 'material-icons']">{{greenBtn.name}}</i>
				</v-btn>
			</div>

			<v-btn :disabled="checkGreen" v-on:click="lockedRow++, lockRow(greenBtns)">LOCK</v-btn>
		</v-row>
		<!--blue row-->
		<v-row class="mb-6 mx-4">
			<div class="blueBtns mr-3 mb-2" v-for="(blueBtn, i) in blueBtns" :key="i">
				<v-btn class="blue mark" dark v-on:click="blueRow++, blueBtn.marked = !blueBtn.marked">
					<i v-bind:class="[{ 'white' : blueBtn.marked }, 'material-icons']">{{blueBtn.name}}</i>
				</v-btn>
			</div>

			<v-btn :disabled="checkBlue" v-on:click="lockedRow++, lockRow(blueBtns)">LOCK</v-btn>
		</v-row>
		<!-- penalties -->
		<v-row class="mx-4 mb-3">
			<v-col >
				<p>Penalties</p>
				
				<v-btn
					class="mx-2"
					color="black"
					dark
					@click="subtract(pen.v, totalScore, false), (pen.e = true)"
					:disabled="pen.e"
					v-for="(pen, i) in penalties"
					:key="i"
				>{{ pen.v }}</v-btn>
			</v-col>
		</v-row>

		<v-row class="mb-6 mx-4" justify="flex-start" no-gutters>
			<v-col lg="2">
				<h4 class="red--text">Final</h4>
				<p id="redFinal">{{redScore = this.calculate(redRow)}}</p>
			</v-col>
			<v-col lg="2">
				<h4 class="yellow--text">Final</h4>
				<p id="yellowFinal">{{yellowScore = this.calculate(yellowRow)}}</p>
			</v-col>
			<v-col lg="2">
				<h4 class="green--text">Final</h4>
				<p id="greenFinal">{{greenScore = this.calculate(greenRow)}}</p>
			</v-col>
			<v-col lg="2">
				<h4 class="blue--text">Final</h4>
				<p id="blueFinal">{{blueScore = this.calculate(blueRow)}}</p>
			</v-col>
			<v-col lg="2">
				<h4>TOTAL SCORE</h4>
				<p class="purple--text title" id="finalFinal">{{ totalScore = blueScore + redScore + greenScore + yellowScore + penaltyScore}}</p>
			</v-col>
		</v-row>
		<!--pull this up when 2 rows are locked-->
		<v-dialog v-model="dialog" persistent max-width="290">
              <v-card>
                <v-card-title class="headline">Game Over</v-card-title>
                <v-card-text>Congratulations! You have finished the game. Would you like to save your score?</v-card-text>
                <p
                  class="display-1 text-center mx-auto d-flex justify-center align-center"
                >Your Score: {{this.totalScore}}</p>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="dialog = false">No</v-btn>
                  <v-btn color="green darken-1" text @click="dialog = false">Yes</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

	</v-container>
</template>

<script>
import Rules from '../../components/Rules';
export default {
	components: {
		Rules,
	},
	data() {
		return {
			gameTitle: 'qwixx',
			dialog: false,
			name: null,
			redScore: 0,
			redRow: 0,
			blueScore: 0,
			blueRow:0,
			yellowScore: 0,
			yellowRow:0,
			greenScore: 0,
			greenRow:0,
			lockedRow: 0,
			totalScore: 0,
			penaltyScore:0,
		
			points: [{ e: false, v: 1 }],
			penalties: [
				{ e: false, v: -5 },
				{ e: false, v: -5 },
				{ e: false, v: -5 },
				{ e: false, v: -5 },
			],
			redBtns: [
				{ id: 2, marked: false, name: '2'},
				{ id: 3, marked: false, name: '3' },
				{ id: 4, marked: false, name: '4' },
				{ id: 5, marked: false, name: '5' },
				{ id: 6, marked: false, name: '6' },
				{ id: 7, marked: false, name: '7' },
				{ id: 8, marked: false, name: '8' },
				{ id: 9, marked: false, name: '9'},
				{ id: 10, marked: false, name: '10' },
				{ id: 11, marked: false, name: '11' },
				{ id: 12, marked: false, name: '12'},
				
			],
			yellowBtns: [
				{ id: 2, marked: false, name: '2' },
				{ id: 3, marked: false, name: '3'},
				{ id: 4, marked: false, name: '4' },
				{ id: 5, marked: false, name: '5' },
				{ id: 6, marked: false, name: '6'},
				{ id: 7, marked: false, name: '7'},
				{ id: 8, marked: false, name: '8' },
				{ id: 9, marked: false, name: '9' },
				{ id: 10, marked: false, name: '10' },
				{ id: 11, marked: false, name: '11' },
				{ id: 12, marked: false, name: '12' },

			],
			greenBtns: [
				{ id: 2, marked: false, name: '12' },
				{ id: 3, marked: false, name: '11' },
				{ id: 4, marked: false, name: '10' },
				{ id: 5, marked: false, name: '9' },
				{ id: 6, marked: false, name: '8' },
				{ id: 7, marked: false, name: '7' },
				{ id: 8, marked: false, name: '6' },
				{ id: 9, marked: false, name: '5' },
				{ id: 10, marked: false, name: '4' },
				{ id: 11, marked: false, name: '3' },
				{ id: 12, marked: false, name: '2' },

			],
			blueBtns: [
				{ id: 2, marked: false, name: '12' },
				{ id: 3, marked: false, name: '11' },
				{ id: 4, marked: false, name: '10' },
				{ id: 5, marked: false, name: '9' },
				{ id: 6, marked: false, name: '8' },
				{ id: 7, marked: false, name: '7' },
				{ id: 8, marked: false, name: '6' },
				{ id: 9, marked: false, name: '5' },
				{ id: 10, marked: false, name: '4' },
				{ id: 11, marked: false, name: '3' },
				{ id: 12, marked: false, name: '2' },
			],
		};
	},

	computed:{
		checkRed(){
			console.log('this is from computed ' + this.redBtns[10].name);
			
			if((this.redBtns[0].marked || this.redBtns[10].marked) && this.redScore >=15) {
				return false;
			}return true;
		},
		checkYellow(){
			console.log('this is from computed ' + this.yellowBtns[10].name);
			
			if((this.yellowBtns[0].marked || this.yellowBtns[10].marked) && this.yellowScore >= 15) {
				return false;
			}return true;
			
		},
		checkGreen(){
			console.log('this is from computed ' + this.greenBtns[10].name);
			
			if((this.greenBtns[0].marked || this.greenBtns[10].marked) && this.greenScore >= 15) {
				return false;
			}return true;
			
		},
		checkBlue(){
			console.log('this is from computed ' + this.blueBtns[10].name);
			
			if((this.blueBtns[0].marked || this.blueBtns[10].marked) && this.blueScore >= 15) {
				return false;
			}return true;
			
		},
	
	},

	methods: {
		lockRow(row){
			if(this.lockedRow == 2){
				this.dialog = true;
			}
			else{
				this.row = row;
				var i;
				for(i = 0; i < row.length; i++){
					row[i].marked = true;
				}
			}
		},
		
		calculate(row){
			if(row === 0){
				return 0;
			}
			else if(row === 1){
				return 1;
			}
			else if(row === 2){
				return 3;
			}
			else if(row === 3){
				return 6;
			}
			else if(row === 4){
				return 10;
			}
			else if(row === 5){
				return 15;
			}
			else if(row === 6){
				return 21;
			}
			else if(row === 7){
				return 28;
			}
			else if(row === 8){
				return 36;
			}
			else if(row === 9){
				return 45;
			}
			else if(row === 10){
				return 55;
			}
			else if(row === 11){
				return 66;
			}
			else if(row === 12){
				return 78;
			}
		},

		//method for subtracting penalties
		subtract(value, penScore, notAdd) {
			this.value = value;
			this.penScore = penScore;
			this.notAdd = notAdd;
			this.penScore += value;
			this.penaltyScore += value;
			
			if(this.penaltyScore == -20){
				this.dialog = true;
			}
			return this.penaltyScore;
		},
		
		
	},
	
};
</script>

<style scoped>
</style>