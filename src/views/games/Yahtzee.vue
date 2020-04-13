<template>
  <div class="my-2" id="container">
    <v-row>
      <v-col xs="12" md="11" lg="10" xl="8" class="mx-auto">
        <p class="display-2 text-center">YAHTZEE</p>
        <v-row>
          <v-col cols="12" xs="12" sm="12" md="6" class="mx-auto d-flex justify-center">
            <div class="mx-auto">
              <p v-for="(item, i) in data.upperNew" :key="i" class="d-flex title">
                <span v-if="item.text">
                  <p id="bonus">{{item.text}}</p>
                </span>
                <v-icon color="black" x-large>{{item.icon}}</v-icon>
                <v-col v-if="item.button">
                  <v-btn
                    color="red"
                    dark
                    class="mx-1 mt-1 elevation-4"
                    v-for="(btn, i) in item.values"
                    :key="i"
                    @click="add(btn, 0), item.enabled = true"
                    :disabled="item.enabled"
                  >{{btn}}</v-btn>
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
                  >Bonus Added! (35 pts)</v-alert>
                </v-col>
                <v-col v-if="item.extra && upperScore < 63">
                  <p class="subtitle-1 bonus">If Upper Section is greater than 63</p>
                </v-col>
              </p>
            </div>
          </v-col>
          <v-col cols="12" xs="12" sm="12" md="6" class="mr-auto d-flex justify-center">
            <div>
              <p v-for="(item, i) in data.lowerNew" :key="i" wi class="d-flex title">
                <span>
                  <p id="textAlign">{{item.text}}</p>
                </span>
                <v-col v-if="item.button">
                  <!-- add functionality for single button to be disabled for Yahtzee -->
                  <v-btn
                    color="red"
                    dark
                    class="mx-1 mt-1 elevation-4"
                    v-for="(btn, i) in item.values"
                    :key="i"
                    @click="add(btn, item.yahtzee), item.enabled = true"
                    :disabled="item.enabled"
                  >{{btn}}</v-btn>
                </v-col>
                <v-col
                  v-if="item.input"
                  cols="80"
                  class="d-flex align-baseline justify-space-between"
                >
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
        <v-row>
          <v-col v-if="!this.yahtzee" class="my-0 pt-0 text-center">
            <p class="headline">Extra YAHTZEE's</p>
            <v-btn
              class="mx-1"
              color="green"
              @click="add(bonus.v, bonus.e = true)"
              :disabled="bonus.e"
              v-for="(bonus, i) in yahtzeeBonus"
              :key="i"
            >{{bonus.v}}</v-btn>
			
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-card
      class="display-1 mx-auto d-flex justify-center align-center elevation-4"
      height="100"
      color="red"
      width="300"
      dark
    >Total: {{this.totalScore}}</v-card>
	<v-btn @click="test = true">Test</v-btn>
  </div>
</template>

<script>
export default {
	data() {
		return {
			rolls: 0,
			dialog: false,
			upperScore: 0,
			test: false,
			lowerScore: 0,
			yahtzee: true,
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
						yahtzee: true,
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
			yahtzeeBonus: [
				{ e: false, v: 100 },
				{ e: false, v: 100 },
				{ e: false, v: 100 },
				{ e: false, v: 100 }
			]
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
		add(value, section) {
			console.log(section);
			this.rolls++;
			section === 0 ? (this.upperScore += value) : (this.lowerScore += value);
			console.log(this.upperScore);
			this.totalScore += value;
			this.rolls === 13 ? (this.dialog = true) : (this.dialog = false);
			if (section == true) {
				this.yahtzee = false;
			}
			if (this.upperScore >= 63) {
				this.totalScore += 63;
			}
		}
	}
};
</script>

<style>
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
#container {
  /* background-color: grey; */
}
</style>
