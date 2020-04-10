<template>
	<v-container>
		<v-row class="mx-4 my-4">
			<h2 class="display-3 font-weight-black underlined">Qwixx</h2>
		</v-row>
		<v-row>
			<input class="mx-4 my-4" v-model="name" placeholder="Put name here" />
			<v-btn small color="white">Submit</v-btn>
		</v-row>
		
		<v-row>
			<v-col>
				<v-btn class="mx-2" color="red" id="redRow" dark v-for="(item, i) in 11" :key="item.i">{{ i + 2}}</v-btn>
				<v-btn class="mx-2" @onclick="lockRow(rowName)">Lock</v-btn>
			</v-col>
		</v-row>
		<v-row>
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
		</v-row>

		<v-row>
			<v-col class="d-flex flex-row-reverse justify-end">
				<v-btn class="mx-2">Lock</v-btn>
				<v-btn class="mx-2" color="green" dark v-for="(item, i) in 11" :key="item.i">{{ i + 2}}</v-btn>
			</v-col>
		</v-row>

		<v-row>
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
				<p class="purple--text title" id ="finalFinal">hello</p>
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
			greenScore: true,
			totalScore: 0,
			rowName: null,

			points: [{ e: false, v: 1 }],
			penalties: [
				{ e: false, v: -5 },
				{ e: false, v: -5 },
				{ e: false, v: -5 },
				{ e: false, v: -5 },
			],
		};
	},
	methods: {
		upperTotal(section) {
			return section.reduce((acc, section) => {
				return acc + parseInt(section.score);
			}, 0);
		},
		isDisable(bonus, i) {
			console.log(bonus, i);
		},
		//method for adding points when clicking colored buttons
		add(value, totalScore){
			console.log(totalScore);
			totalScore = totalScore + value;
		},
		//method for subtracting penalties
		subtract(value, totalScore) {
			console.log(totalScore);
			return this.totalScore - this.value;
		},
		//click event for lock button
		lockRow(rowName) {
			console.log(rowName)
			
			alert('red row blocked');
		},
	},
};
</script>

<style scoped>
</style>