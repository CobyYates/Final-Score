<template>
	

<v-card flat>
      <v-card-text>
        <v-container fluid>
          <v-row>
            <v-col cols="12" sm="4" md="4">
              <v-checkbox
                v-model="ex4"
                label="red"
                color="red"
                value="red"
                hide-details
              ></v-checkbox>
              <v-checkbox
                v-model="ex4"
                label="red darken-3"
                color="red darken-3"
                value="red darken-3"
                hide-details
              ></v-checkbox>
            </v-col>
            <v-col cols="12" sm="4" md="4">
              <v-checkbox
                v-model="ex4"
                label="indigo"
                color="indigo"
                value="indigo"
                hide-details
              ></v-checkbox>
              <v-checkbox
                v-model="ex4"
                label="indigo darken-3"
                color="indigo darken-3"
                value="indigo darken-3"
                hide-details
              ></v-checkbox>
            </v-col>
            <v-col cols="12" sm="4" md="4">
              <v-checkbox
                v-model="ex4"
                label="orange"
                color="orange"
                value="orange"
                hide-details
              ></v-checkbox>
              <v-checkbox
                v-model="ex4"
                label="orange darken-3"
                color="orange darken-3"
                value="orange darken-3"
                hide-details
              ></v-checkbox>
            </v-col>
          </v-row>
  
          <v-row class="mt-12">
            <v-col cols="12" sm="4" md="4">
              <v-checkbox
                v-model="ex4"
                label="primary"
                color="primary"
                value="primary"
                hide-details
              ></v-checkbox>
              <v-checkbox
                v-model="ex4"
                label="secondary"
                color="secondary"
                value="secondary"
                hide-details
              ></v-checkbox>
            </v-col>
            <v-col cols="12" sm="4" md="4">
              <v-checkbox
                v-model="ex4"
                label="success"
                color="success"
                value="success"
                hide-details
              ></v-checkbox>
              <v-checkbox
                v-model="ex4"
                label="info"
                color="info"
                value="info"
                hide-details
              ></v-checkbox>
            </v-col>
            <v-col cols="12" sm="4" md="4">
              <v-checkbox
                v-model="ex4"
                label="warning"
                color="warning"
                value="warning"
                hide-details
              ></v-checkbox>
              <v-checkbox
                v-model="ex4"
                label="error"
                color="error"
                value="error"
                hide-details
              ></v-checkbox>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>


	<!-- <div class="mt-4">
              <v-textarea
								v-model="blueScore"
                :outlined="outlined"
                background-color="blue"
                color="black"
                label="Blue Score"
              ></v-textarea>
            </div>

           <div class="mt-4">
              <v-textarea
								v-model="redScore"
                :outlined="outlined"
                background-color="red"
                color="black"
                label="Red Score"
              ></v-textarea>
            </div>

            <div class="mt-4">
              <v-textarea
								v-model="yellowScore"
                :outlined="outlined"
                background-color="yellow"
                color="black"
                label="Yellow Score"
              ></v-textarea>
            </div>

            <div class="mt-4">
              <v-textarea
								v-model="greenScore"
                :outlined="outlined"
                background-color="green"
                color="black"
                label="Green Score"
              ></v-textarea>
            </div>
	</div>-->
</template>

<script>
export default {
	data() {
		return {
			checkedNames: [],
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
			},
		};
	},
};
</script>

<style scoped>
.container {
	display: flex;
	border: 1px solid blue;
}
.row {
	padding: 10px;
	border: 1px solid orange;
}
#player1 {
	width: 100%;
}
</style>