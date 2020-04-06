<template>
	<v-container>
		<v-row class="mx-4 my-4">
			<h2 class="display-3 font-weight-black underlined">Qwixx</h2>
		</v-row>
		<v-row>
			<input class="mx-4 my-4" v-model="name" placeholder="Put name here" />
			<v-btn small outlined="true" color="purple">Submit</v-btn>
		</v-row>
		<v-row></v-row>
		<v-row>
			<v-col>
				<v-btn class="mx-2" color="red" dark v-for="(item, i) in 11" :key="item.i">{{ i + 2}}</v-btn>
				<v-btn>Lock</v-btn>
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<v-btn class="mx-2" color="blue" dark v-for="(item, i) in 11" :key="item.i">{{ i + 2}}</v-btn>
				<v-btn>Lock</v-btn>
			</v-col>
		</v-row>

		<v-row>
			<v-col class="d-flex flex-row-reverse justify-end">
				<v-btn>Lock</v-btn>
				<v-btn class="mx-2" color="green" dark v-for="(item, i) in 11" :key="item.i">{{ i + 2}}</v-btn>
			</v-col>
		</v-row>

		<v-row>
			<v-col class="d-flex flex-row-reverse justify-end">
				<v-btn>Lock</v-btn>
				<v-btn
					class="mx-2"
					color="yellow darken-1"
					dark
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
					outlined="true"
					color="black"
					dark
					v-for="(item, i) in 4"
					:key="item.i"
				>{{ i }}</v-btn>
			</v-col>
		</v-row>

		<v-row>
			<v-col>
				<p>Totals</p>
				<v-btn
					x-large
					class="mx-2"
					outlined="true"
					color="black"
					dark
					v-for="(item, i) in 4"
					:key="item.i"
				>{{ i }}</v-btn>
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
			penaltyScore: 0,
			totalScore: 0,
			//this will hold the color score values to use the reduce method to find total score
			scoreArr: [],

			methods: {
				total() {
					var sum = this.scoreArr.reduce(function(total, amount) {
						return total + amount;
					});
					sum;
				},
				save() {
					if (this.editedIndex > -1) {
						Object.assign(this.rounds[this.editedIndex], this.editedItem);
					} else {
						this.rounds.push(this.editedItem);
					}
					this.close();
				},
			},
		};
	},
};
</script>

<style scoped>
</style>