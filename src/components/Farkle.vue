<template>
  <v-container>
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
      

      <v-textarea 
        background-color="red"
        color="black"
        label="Red Score"
      ></v-textarea>

      <v-textarea 
        background-color="yellow"
        color="black"
        label="Yellow Score"
      ></v-textarea>

      <v-textarea 
        background-color="green"
        color="black"
        label="Green Score"
      ></v-textarea>
      </div>
      
  
      <v-btn class="mr-4" @click="submit">submit</v-btn>
      <v-btn @click="clear">clear</v-btn>
    </form>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      name:null,
      redScore:0,
      blueScore:0,
      greenScore:0,
      yellowScore:0,
      penaltyScore:0,
      totalScore:0
    }),

    computed: {
      form () {
        return {
          name: this.name,
          address: this.address,
          city: this.city,
          state: this.state,
          zip: this.zip,
          country: this.country,
        }
      },
    },

    watch: {
      name () {
        this.errorMessages = ''
      },
    },

    methods: {
      addressCheck () {
        this.errorMessages = this.address && !this.name
          ? 'Hey! I\'m required'
          : ''

        return true
      },
      resetForm () {
        this.errorMessages = []
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
          this.$refs[f].reset()
        })
      },
      submit () {
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
          if (!this.form[f]) this.formHasErrors = true

          this.$refs[f].validate(true)
        })
      },
    },
  }
</script>

<style scoped>

</style>