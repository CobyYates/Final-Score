<template>
  <v-container>
      <v-icon 
        v-for="dice in this.$store.state.dices" 
        :key="dice.i"
        x-large
        :color="dice.color">{{ dice.icon }}</v-icon>
  </v-container>
</template>

<script>
export default {
    data: () => ({
        
    })
}
</script>

<style scoped>

</style>