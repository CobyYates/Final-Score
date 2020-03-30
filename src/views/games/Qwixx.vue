<template>
<div>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6">
        <form>
          <div id="player1">
            <v-text-field
              v-model="name"
              :error-messages="nameErrors"
              label="Name"
              required
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
            ></v-text-field>

            <div class="mt-4">
              <v-textarea
                :outlined="outlined"
                background-color="blue"
                color="black"
                label="Blue Score"
              ></v-textarea>
            </div>

            <v-textarea background-color="red" color="black" label="Red Score"></v-textarea>

            <v-textarea background-color="yellow" color="black" label="Yellow Score"></v-textarea>

            <v-textarea background-color="green" color="black" label="Green Score"></v-textarea>
          </div>

          <v-btn class="mr-4" @click="submit">submit</v-btn>
          <v-btn @click="clear">clear</v-btn>
        </form>
      </v-col>
    </v-row>
  </v-container>
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
// export default {  
//   data: () => ({
//   name: null,
//   redScore: 0,
//     blueScore: 0,
//     greenScore: 0,
//     yellowScore: 0,
//     penaltyScore: 0,
//     totalScore: 0
//   }),

//   computed: {
//     form() {
//       return {
//         name: this.name,
//         address: this.address,
//         city: this.city,
//         state: this.state,
//         zip: this.zip,
//         country: this.country
//       };
//     }
//   },

//   watch: {
//     name() {
//       this.errorMessages = "";
//     }
//   },

//   methods: {
//     addressCheck() {
//       this.errorMessages =
//         this.address && !this.name ? "Hey! I'm required" : "";

//       return true;
//     },
//     resetForm() {
//       this.errorMessages = [];
//       this.formHasErrors = false;

//       Object.keys(this.form).forEach(f => {
//         this.$refs[f].reset();
//       });
//     },
//     submit() {
//       this.formHasErrors = false;

//       Object.keys(this.form).forEach(f => {
//         if (!this.form[f]) this.formHasErrors = true;

//         this.$refs[f].validate(true);
//       });
//     }
//   }
// };
</script>

<style scoped>
#player1 {
  width: 50%;
}
</style>