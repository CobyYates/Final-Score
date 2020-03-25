<template>
	<div>
		<v-row class="mx-12">
			<v-col cols="12" sm="6" md="5" lg="4" xl="4" class="ml-auto">
				<p class="text-center title">UPPER SECTION</p>
				<v-data-table
					:headers="upperHeaders"
					:items="upper"
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
				<p>UPPER TOTAL: {{upperTotal()}}</p>
			</v-col>
			<v-col cols="12" sm="6" md="5" lg="4" xl="4" class="mr-auto">
				<p class="text-center title">UPPER SECTION</p>
				<v-data-table
					:headers="lowerHeaders"
					:items="lower"
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
				<p>LOWER TOTAL: {{}}</p>
				<p>OVERALL TOTAL: {{}}</p>
				<!-- <v-btn @click="scoreCard">Test</v-btn> -->
			</v-col>
		</v-row>
	</div>
</template>

<script>
export default {
	data() {
		return {
			max3chars: v => v.length <= 3 || "Input too long!",
			pagination: {},
			upperScore: 0,
			lowerScore: 0,
			totalScore: 0,
			upperHeaders: [
				{
					text: "Category",
					align: "start",
					sortable: false,
					value: "name"
				},
				{ text: "Score", value: "score" }
			],
			upper: [
				{
					name: "Aces",
					how: "Count and Add Only Aces",
					score: 0
				},
				{
					name: "Twos",
					how: "Count and Add Only Twos",
					score: 0
				},
				{
					name: "Threes",
					how: "Count and Add Only Threes",
					score: 0
				},
				{
					name: "Fours",
					how: "Count and Add Only Fours",
					score: 0
				},
				{
					name: "Fives",
					how: "Count and Add Only Fives",
					score: 6
				},
				{
					name: "Sixes",
					how: "Count and Add Only Sixes",
					score: 0
				},
				{
					name: "BONUS",
					how: "SCORE 35",
					score: 0
				}
			],
			lowerHeaders: [
				{
					text: "LOWER SECTION",
					align: "start",
					sortable: false,
					value: "name"
				},
				{ text: "Score", value: "score" }
			],
			lower: [
				{
					name: "3 of a kind",
					how: "Add Total of All Dice",
					score: 0
				},
				{
					name: "4 of a kind",
					how: "Add Total of All Dice",
					score: 0
				},
				{
					name: "Full House",
					how: "SCORE 25",
					score: 0
				},
				{
					name: "Sm. Straight",
					how: "SCORE 30",
					score: 0
				},
				{
					name: "Lg. Straight",
					how: "SCORE 40",
					score: 0
				},
				{
					name: "YAHTZEE",
					how: "SCORE 50",
					score: 0
				},
				{
					name: "Chance",
					how: "Total of All 5 Dice",
					score: 0
				},
				{
					name: "YAHTZEE BONUS",
					how: "100 PER",
					score: 0
				}
			]
		};
	},
	methods: {
		upperTotal(){
			return this.upper.reduce((acc, upper) => {return acc + upper.score}, 0)
		}
		// scoreCard(value) {
		//   const sum = value.reduce((accumulator, currentValue) => {
		//     return accumulator + currentValue
		//   }, 0)
		//   console.log(sum)
		// }
	}
};
</script>

<style></style>
