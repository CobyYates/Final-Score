<template>
  <div>
    <v-data-table
      :headers="upperHeaders"
      :items="upper"
      hide-default-footer
      dark
    >
      <template v-slot:item.game1="props">
        <v-edit-dialog
          :return-value.sync="props.item.game1"
        > {{ props.item.game1 }}
          <template v-slot:input>
            <v-text-field
              v-model="props.item.game1"
              :rules="[max3chars]"
              label="Add Score"
              single-line
              counter
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
    </v-data-table>


    <v-data-table
      :headers="lowerHeaders"
      :items="lower"
      hide-default-footer
      dark
      class="mb-12"
    >
      <template v-slot:item.game1="props">
        <v-edit-dialog
          :return-value.sync="props.item.game1"
        > {{ props.item.game1 }}
          <template v-slot:input>
            <v-text-field
              v-model="props.item.game1"
              :rules="[max3chars]"
              label="Add Score"
              single-line
              counter
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        max3chars: v => v.length <= 3 || 'Input too long!',
        pagination: {},
        upperHeaders: [
          {
            text: 'UPPER SECTION',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'HOW TO SCORE', value: 'how' },
          { text: 'Game #1', value: 'game1' },
        ],
        upper: [
          {
            name: 'Aces',
            how: 'Count and Add Only Aces',
            game1: 4,
          },
          {
            name: 'Twos',
            how: 'Count and Add Only Twos',
            game1: 6,
          },
          {
            name: 'Threes',
            how: 'Count and Add Only Threes',
            game1: 6,
          },
          {
            name: 'Fours',
            how: 'Count and Add Only Fours',
            game1: 12,
          },
          {
            name: 'Fives',
            how: 'Count and Add Only Fives',
            game1: 15,
          },
          {
            name: 'Sixes',
            how: 'Count and Add Only Sixes',
            game1: 18,
          },
          {
            name: 'TOTAL SCORE',
            how: '--------------->',
            game1: 18,
          },
          {
            name: 'BONUS',
            how: 'SCORE 35',
            game1: 18,
          },
          {
            name: 'TOTAL',
            how: 'Total of Upper Section',
            game1: 18,
          },
        ],
        lowerHeaders: [
          {
            text: 'LOWER SECTION',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'HOW TO SCORE', value: 'how' },
          { text: '', value: 'game1' },
        ],
        lower: [
          {
            name: '3 of a kind',
            how: 'Add Total of All Dice',
            game1: 4,
          },
          {
            name: '4 of a kind',
            how: 'Add Total of All Dice',
            game1: 6,
          },
          {
            name: 'Full House',
            how: 'SCORE 25',
            game1: 6,
          },
          {
            name: 'Sm. Straight',
            how: 'SCORE 30',
            game1: 12,
          },
          {
            name: 'Lg. Straight',
            how: 'SCORE 40',
            game1: 15,
          },
          {
            name: 'YAHTZEE',
            how: 'SCORE 50',
            game1: 18,
          },
          {
            name: 'Chance',
            how: 'Total of All 5 Dice',
            game1: 18,
          },
          {
            name: 'YAHTZEE BONUS',
            how: '100 PER',
            game1: 18,
          },
          {
            name: 'TOTAL',
            how: 'UPPER',
            game1: 18,
          },
          {
            name: 'TOTAL',
            how: 'LOWER',
            game1: 18,
          },
          {
            name: 'GRAND TOTAL',
            how: '--------------->',
            game1: 18,
          },
        ],
      }
    },
  }
</script>

<style>

</style>