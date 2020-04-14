<template>
	<v-card class="mt-8 flex">
		<v-banner color="dark">Previous Games:</v-banner>
		<v-row>
			<v-col>
				<v-list>
					<v-list-item v-for="game in games" :key="game.id" link @click="goToGame(game)">
						<v-list-item-content>
							<v-list-item-title>
								{{game.gameName}}
							</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list>
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
export default {
	name: 'GamesList',
	props: [
		'gameType',
		'games',
	],
	methods: {
		goToGame(game) {
			this.$store.dispatch('setGame', game);
			this.$router.push(`/${this.gameType}/${game.gameId}`);
		},
	},
}
</script>

<style scoped>

</style>
