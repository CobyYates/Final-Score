<template>
	<v-container>
		<v-row class="mx-4 my-4">
			<h2 class="display-3 font-weight-black underlined">Qwixx</h2>
			<v-col cols="4"><Rules :game="this.gameTitle" /></v-col>
		</v-row>
		

		
		<v-row class="mb-6 mx-4">
			<div class="redBtns mr-3 mb-2" v-for="(redBtn, i) in redBtns" :key="i">
				<v-btn class="red mark" dark v-on:click="redRow++, redBtn.marked = !redBtn.marked, showRed()">
					<i v-bind:class="[{ 'white' : redBtn.marked }, 'material-icons']">{{redBtn.name}}</i>
				</v-btn>
			</div>
		</v-row>
		<!--yellow row-->
		<v-row class="mb-6 mx-4">
			<div class="yellowBtns mr-3 mb-2" v-for="(yellowBtn, i) in yellowBtns" :key="i">
				<v-btn class="yellow mark" dark v-on:click="yellowRow++, yellowBtn.marked = !yellowBtn.marked">
					<i v-bind:class="[{ 'white' : yellowBtn.marked }, 'material-icons']">{{yellowBtn.name}}</i>
				</v-btn>
			</div>
		</v-row>
		<!--green row-->
		<v-row class="mb-6 mx-4">
			<div class="greenBtns mr-3 mb-2" v-for="(greenBtn, i) in greenBtns" :key="i">
				<v-btn class="green mark" dark v-on:click="greenRow++, greenBtn.marked = !greenBtn.marked">
					<i v-bind:class="[{ 'white' : greenBtn.marked }, 'material-icons']">{{greenBtn.name}}</i>
				</v-btn>
			</div>
		</v-row>
		<!--blue row-->
		<v-row class="mb-6 mx-4">
			<div class="blueBtns mr-3 mb-2" v-for="(blueBtn, i) in blueBtns" :key="i">
				<v-btn class="blue mark" dark v-on:click="blueRow++, blueBtn.marked = !blueBtn.marked">
					<i v-bind:class="[{ 'white' : blueBtn.marked }, 'material-icons']">{{blueBtn.name}}</i>
				</v-btn>
			</div>
		</v-row>
		<!-- penalties -->
		<v-row class="mx-4 mb-3">
			<v-col >
				<p>Penalties</p>
				<v-btn
					class="mx-2"
					color="black"
					dark
					@click="subtract(pen.v, pen.e = true)"
					:disabled="pen.e"
					v-for="(pen, i) in penalties"
					:key="i"
				>{{ pen.v }}</v-btn>
			</v-col>
		</v-row>

		<v-row class="mb-6 mx-4" justify="flex-start" no-gutters>
			<v-col lg="2">
				<h4 class="red--text">Final</h4>
				<p id="redFinal">{{this.calculate(redRow)}}</p>
			</v-col>
			<v-col lg="2">
				<h4 class="yellow--text">Final</h4>
				<p id="yellowFinal">{{this.calculate(yellowRow)}}</p>
			</v-col>
			<v-col lg="2">
				<h4 class="green--text">Final</h4>
				<p id="greenFinal">{{this.calculate(greenRow)}}</p>
			</v-col>
			<v-col lg="2">
				<h4 class="blue--text">Final</h4>
				<p id="blueFinal">{{this.calculate(blueRow)}}</p>
			</v-col>
			<v-col lg="2">
				<h4>TOTAL SCORE</h4>
				<p class="purple--text title" id="finalFinal">{{  }}</p>
			</v-col>
		</v-row>
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
			dialog: true,
			name: null,
			redScore: 0,
			redRow: 0,
			blueScore: 0,
			blueRow:0,
			yellowScore: 0,
			yellowRow:0,
			greenScore: 0,
			greenRow:0,
			totalScore: 0,
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
				{ id: 13, marked: false, name: 'LOCK'},
			],
			yellowBtns: [
				{ id: 1, marked: false, name: '2' },
				{ id: 1, marked: false, name: '3'},
				{ id: 1, marked: false, name: '4' },
				{ id: 1, marked: false, name: '5' },
				{ id: 1, marked: false, name: '6'},
				{ id: 1, marked: false, name: '7'},
				{ id: 1, marked: false, name: '8' },
				{ id: 1, marked: false, name: '9' },
				{ id: 1, marked: false, name: '10' },
				{ id: 1, marked: false, name: '11' },
				{ id: 1, marked: false, name: '12' },
				{ id: 1, marked: false, name: 'LOCK' },
			],
			greenBtns: [
				{ id: 1, marked: false, name: '12' },
				{ id: 1, marked: false, name: '11' },
				{ id: 1, marked: false, name: '10' },
				{ id: 1, marked: false, name: '9' },
				{ id: 1, marked: false, name: '8' },
				{ id: 1, marked: false, name: '7' },
				{ id: 1, marked: false, name: '6' },
				{ id: 1, marked: false, name: '5' },
				{ id: 1, marked: false, name: '4' },
				{ id: 1, marked: false, name: '3' },
				{ id: 1, marked: false, name: '2' },
				{ id: 1, marked: false, name: 'LOCK' },
			],
			blueBtns: [
				{ id: 1, marked: false, name: '12' },
				{ id: 1, marked: false, name: '11' },
				{ id: 1, marked: false, name: '10' },
				{ id: 1, marked: false, name: '9' },
				{ id: 1, marked: false, name: '8' },
				{ id: 1, marked: false, name: '7' },
				{ id: 1, marked: false, name: '6' },
				{ id: 1, marked: false, name: '5' },
				{ id: 1, marked: false, name: '4' },
				{ id: 1, marked: false, name: '3' },
				{ id: 1, marked: false, name: '2' },
				{ id: 1, marked: false, name: 'LOCK' },
			],
		};
	},
	methods: {
		showRed(){
			// if(this.redBtns[0] != this.marked || this.redBtns[10] != this.marked){
			// 	this.redBtns[11].disabled;
			// 	console.log(this.redBtns[11]);
			// }
			console.log(this.redRow);
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
		//method for adding points when clicking colored buttons
		add(value, totalScore) {
			this.value;
			console.log(totalScore);
			totalScore = totalScore + value;
		},
		//method for subtracting penalties
		subtract(value, totalScore) {
			console.log(totalScore);
			return this.totalScore - this.value;
		},
		//click event for lock button
		
	},
};
</script>

<style scoped>
</style>