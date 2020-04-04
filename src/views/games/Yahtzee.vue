<template>
  <div class="my-12">
    <p class="display-2 text-center">YAHTZEE</p>
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="4" class="mx-auto d-flex justify-center">
        <div class="mx-auto">
          <p v-for="(item, i) in data.upperNew" :key="i" class="d-flex title">
            <span>{{item.text}}</span>
            <v-icon x-large>{{item.icon}}</v-icon>
            <v-col v-if="item.button">
              <v-btn
                color="error"
                class="mx-1 my-1 elevation-4"
                v-for="(btn, i) in item.values"
                :key="i"
                @click="add(btn, upperScore), item.enabled = true"
                :disabled="item.enabled"
              >{{btn}}</v-btn>
            </v-col>
            <v-col cols="7" v-if="upperScore >= 63 && item.extra">
              <v-alert dense text border="left" icon="mdi-dice-6" prominent color="red">Bonus Added!</v-alert>
            </v-col>
            <v-col v-if="item.extra && upperScore < 63">
              <p class="subtitle-1">If Upper Section is greater than 63</p>
            </v-col>
          </p>
        </div>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="4" class="mr-auto d-flex justify-center">
        <div>
          <p v-for="(item, i) in data.lowerNew" :key="i" wi class="d-flex title">
            <span>{{item.text}}</span>
            <v-col v-if="item.button">
              <!-- add functionality for single button to be disabled for Yahtzee -->
              <v-btn
                color="error"
                class="mx-1 my-1 elevation-4"
                v-for="(btn, i) in item.values"
                :key="i"
                @click="add(btn, lowerScore), item.enabled = true"
                :disabled="item.enabled"
              >{{btn}}</v-btn>
            </v-col>
            <v-col v-if="item.input" cols="80" class="d-flex align-baseline justify-space-between">
              <v-text-field dense solo placeholder="total of dice" class="mr-6" v-model="item.values"></v-text-field>
              <v-btn
                color="error"
                class="ml-1 elevation-4"
                @click="add(parseInt(item.values), lowerScore), item.enabled = true"
                :disabled="item.enabled"
              >Add</v-btn>
            </v-col>
          </p>
        </div>
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
      </v-col>
    </v-row>
    <v-card
      class="display-1 text-center mx-auto d-flex justify-center align-center elevation-4"
      height="100"
      color="error"
      width="300"
      dark
    >Total: {{this.totalScore}}</v-card>
  </div>
</template>

<script>
export default {
	data() {
		return {
			rolls: 0,
			dialog: false,
			upperScore: 0,
			lowerScore: 0,
			totalScore: 0,
			data: {
				upperNew: [
					{
						icon: "mdi-dice-1",
						button: true,
						input: false,
						default: 0,
						enabled: false,
						extra: false,
						values: [1, 2, 3, 4, 5, 6]
					},
					{
						icon: "mdi-dice-2",
						button: true,
						input: false,
						default: 0,
						enabled: false,
						extra: false,
						values: [2, 4, 6, 8, 10, 12]
					},
					{
						icon: "mdi-dice-3",
						button: true,
						input: false,
						default: 0,
						enabled: false,
						extra: false,
						values: [3, 6, 9, 12, 15, 18]
					},
					{
						icon: "mdi-dice-4",
						button: true,
						input: false,
						default: 0,
						enabled: false,
						extra: false,
						values: [4, 8, 12, 16, 20, 24]
					},
					{
						icon: "mdi-dice-5",
						button: true,
						input: false,
						default: 0,
						enabled: false,
						extra: false,
						values: [5, 10, 15, 20, 25, 30]
					},
					{
						icon: "mdi-dice-6",
						button: true,
						input: false,
						default: 0,
						enabled: false,
						extra: false,
						values: [6, 12, 18, 24, 30, 36]
					},
					{
						text: "Bonus",
						button: false,
						input: false,
						default: 0,
						enabled: false,
						extra: true,
						values: [35]
					}
				],
				lowerNew: [
					{
						text: "3 of kind",
						button: false,
						input: true,
						default: 0,
						enabled: false,
						values: null
					},
					{
						text: "4 of kind",
						button: false,
						input: true,
						default: 0,
						enabled: false,
						values: null
					},
					{
						text: "Full House",
						button: true,
						input: false,
						default: 0,
						enabled: false,
						values: [25]
					},
					{
						text: "Sm. Straight",
						button: true,
						input: false,
						default: 0,
						enabled: false,
						values: [30]
					},
					{
						text: "Lg. Straight",
						button: true,
						input: false,
						default: 0,
						enabled: false,
						values: [40]
					},
					{
						text: "YAHTZEE",
						button: true,
						input: false,
						default: 0,
						enabled: false,
						values: [50]
					},
					{
						text: "Chance",
						button: false,
						input: true,
						default: 0,
						enabled: false,
						values: null
					}
				]
			},
			yahtzeeBonus: [ 100, 100, 100 ]
		};
	},
	methods: {
		upperTotal(section) {
			return section.reduce((acc, section) => {
				return acc + parseInt(section.score);
			}, 0);
		},
		add(value, section) {
			this.rolls++;
			console.log(this.rolls);
			section === this.upperScore
				? (this.upperScore += value)
				: (this.lowerScore += value);
			this.totalScore += value;
			this.rolls === 13 ? (this.dialog = true) : this.dialog = false;
		}
	},
	mounted() {
		// console.log(this.data[0].upper.text)
	}
};
</script>

<style></style>
