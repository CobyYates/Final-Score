<template>
	<div>
		<v-row class="mx-12">
			<v-col cols="12" sm="6" md="5" lg="4" xl="4" class="ml-auto">
				<p class="text-center title">PLAYER ONE</p>
				<v-data-table
					:headers="playerOneHeaders"
					:items="playerOne"
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
				<p>TOTAL SCORE: {{scoreTotal()}}</p>
                <br>
                <p>Player One recived -200 damage</p>
                <v-button>GIVE DAMAGE</v-button>
                <br>
                <v-button>GIVE POINTS</v-button>
                <p v-show="playerTwoWinner">Player One Lost All Points</p>
                <p v-show="playerOneWinner">Player One Kicked Player Two's Trash</p>
                <p v-show=true>Player One Lost All Points</p>
                <p v-show=false>Player One Kicked Player Two's Trash</p>
			</v-col>
            <v-col cols="12" sm="6" md="5" lg="4" xl="4" class="mr-auto">
				<p class="text-center title">PLAYER TWO</p>
				<v-data-table
					:headers="playerOneHeaders"
					:items="playerOne"
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
				<p>TOTAL SCORE: {{scoreTotal()}}</p>
                <br>
                <p>Player One recived -1500 damage</p>
                <v-button>GIVE DAMAGE</v-button>
                <br>
                <v-button>GIVE POINTS</v-button>
                <p v-show="playerOneWinner">Player Two Lost All Points</p>
                <p v-show="playerTwoWinner">Player Two Kicked Player One's Trash</p>
                <p v-show=false>Player Two Lost All Points</p>
                <p v-show=true>Player Two Kicked Player One's Trash</p>
			</v-col>
		</v-row>
	</div>
</template>

<script>
export default {
	data() {
		return {
			max3chars: v => v.length <= 3 || 'Input too long!',
			winnerCheck: false,
			playerOneHeaders: [
				{
					text: 'Points Lost/Gained',
					align: 'start',
					sortable: false,
					value: 'name',
				},
				{ text: 'Score', value: 'score' },
			],
			playerOne: [
				{
					name: 'Damage Received',
					score: -200,
				},
				{
					name: 'Points Gained',
					score: 20,
				},
				{
					name: 'Damage Received',
					score: -2500,
				},
				{
					name: 'Damage Received',
					score: -300,
				},
				{
					name: 'Damage Received',
					score: -1500,
				},
				{
					name: 'Points Gained',
					score: 500,
				},
				{
					name: 'Damage Received',
					score: -200,
				},
			],
		};
	},
	methods: {
		scoreTotal(){
			return this.playerOne.reduce((acc, playerOne) => {return acc + playerOne.score}, 0)
		},
	},
};
</script>

<style></style>