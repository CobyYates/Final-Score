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
			name:null,
			redScore:0,
			blueScore:0,
			yellowScore:0,
			greenScore:0,
			penaltyScore:0,
			totalScore:0,
			//this will hold the color score values to use the reduce method to find total score
			scoreArr:[],

			methods: {
				total(){
					var sum = this.scoreArr.reduce( function(total, amount){
						return total + amount
					});
					sum
				}

			}
		}; 
	}
}
	
	
		
</script>

<style scoped>
#player1 {
  width: 50%;
}
</style>