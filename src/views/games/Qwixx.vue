<template>
	<v-container>
		<v-row class="mx-4 my-4">
			<h2 class="display-3 font-weight-black underlined">Qwixx</h2>
		</v-row>
		<v-row>
			<input class="mx-4 my-4" v-model="name" placeholder="Put name here" />
			<v-btn small color="white">Submit</v-btn>
		</v-row>

		<!-- <v-row>
			<v-col>
				<v-btn class="mx-2" color="red" id="redRow" dark v-for="(item, i) in 11" :key="item.i">{{ i + 2}}</v-btn>
				<v-btn class="mx-2" @onclick="lockRow(rowName)">Lock</v-btn>
			</v-col>
		</v-row>-->
		<!-- <v-row>
			<v-col>
				<v-btn
					class="mx-2"
					color="blue"
					id="blueRow"
					dark
					v-for="(item, i) in 11"
					:key="item.i"
				>{{ i + 2}}</v-btn>
				<v-btn class="mx-2">Lock</v-btn>
			</v-col>
		</v-row>-->

		<!-- <v-row>
			<v-col class="d-flex flex-row-reverse justify-end">
				<v-btn class="mx-2">Lock</v-btn>
				<v-btn class="mx-2" color="green" dark v-for="(item, i) in 11" :key="item.i">{{ i + 2}}</v-btn>
			</v-col>
		</v-row>-->

		<!-- <v-row>
			<v-col class="d-flex flex-row-reverse justify-end">
				<v-btn class="mx-2">Lock</v-btn>
				<v-btn
					class="mx-2"
					color="yellow darken-1"
					dark
					@onclick="lockRow()"
					v-for="(item, i) in 11"
					:key="item.i"
				>{{ i + 2}}</v-btn>
			</v-col>
		</v-row>-->
		<!--red row-->
		<v-row class="mb-6">
			<div class="redBtns mr-3 mb-2" v-for="redBtn in redBtns" :key="redBtn.id">
				<v-btn class="red mark" dark v-on:click="redBtn.marked = !redBtn.marked">
					<i v-bind:class="[{ 'white' : redBtn.marked }, 'material-icons']">{{redBtn.name}}</i>
				</v-btn>
			</div>
		</v-row>
		<!--yellow row-->
		<v-row class="mb-6">
			<div class="yellowBtns mr-3 mb-2" v-for="yellowBtn in yellowBtns" :key="yellowBtn.id">
				<v-btn class="yellow mark" dark v-on:click="yellowBtn.marked = !yellowBtn.marked">
					<i v-bind:class="[{ 'white' : yellowBtn.marked }, 'material-icons']">{{yellowBtn.name}}</i>
				</v-btn>
			</div>
		</v-row>
		<!--green row-->
		<v-row class="mb-6">
			<div class="greenBtns mr-3 mb-2" v-for="greenBtn in greenBtns" :key="greenBtn.id">
				<v-btn class="green mark" dark v-on:click="greenBtn.marked = !greenBtn.marked">
					<i v-bind:class="[{ 'white' : greenBtn.marked }, 'material-icons']">{{greenBtn.name}}</i>
				</v-btn>
			</div>
		</v-row>
		<!--blue row-->
		<v-row class="mb-6">
			<div class="blueBtns mr-3 mb-2" v-for="blueBtn in blueBtns" :key="blueBtn.id">
				<v-btn class="blue mark" dark v-on:click="blueBtn.marked = !blueBtn.marked">
					<i v-bind:class="[{ 'white' : blueBtn.marked }, 'material-icons']">{{blueBtn.name}}</i>
				</v-btn>
			</div>
		</v-row>

		<v-row>
			<v-col>
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

		<v-row class="mb-6" justify="flex-start" no-gutters>
			<v-col lg="2">
				<h4 class="red--text">Final</h4>
				<p id="redFinal">Score goes here</p>
			</v-col>
			<v-col lg="2">
				<h4 class="blue--text">Final</h4>
				<p id="blueFinal"></p>
			</v-col>
			<v-col lg="2">
				<h4 class="yellow--text">Final</h4>
				<p id="yellowFinal"></p>
			</v-col>
			<v-col lg="2">
				<h4 class="green--text">Final</h4>
				<p id="greenFinal"></p>
			</v-col>
			<v-col lg="2">
				<h4>FINAL SCORE</h4>
				<p class="purple--text title" id="finalFinal">hello</p>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			name: null,
			redScore: 0,
			blueScore: 0,
			yellowScore: 0,
			greenScore: 0,
			totalScore: 0,
			rowName: null,
			isDisabled: false,
			points: [{ e: false, v: 1 }],
			penalties: [
				{ e: false, v: -5 },
				{ e: false, v: -5 },
				{ e: false, v: -5 },
				{ e: false, v: -5 },
			],
			redBtns: [
				{ id: 1, marked: false, name: '2'},
				{ id: 1, marked: false, name: '3' },
				{ id: 1, marked: false, name: '4' },
				{ id: 1, marked: false, name: '5' },
				{ id: 1, marked: false, name: '6' },
				{ id: 1, marked: false, name: '7' },
				{ id: 1, marked: false, name: '8' },
				{ id: 1, marked: false, name: '9'},
				{ id: 1, marked: false, name: '10' },
				{ id: 1, marked: false, name: '11' },
				{ id: 1, marked: false, name: '12'},
				{ id: 1, marked: false, name: 'LOCK'},
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