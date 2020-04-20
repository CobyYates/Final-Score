<template>
<v-container>
	<v-row class="pa-4 pl-8 pr-8">
		<v-col cols="12">
			<h1><span class="font-weight-light">Your</span> Games</h1>
		</v-col>
		<v-col cols="12">
			<v-card
			elevation="5"
			class="mx-auto ma-4 game-card"
			v-for="item in items"
			:key="item.text"
			:to="item.to"
			link
			>
			<v-img position="top center" :src="item.img" :alt="'Image of ' + item.text" aspect-ratio="1.25"></v-img>
			<div class="d-flex justify-space-between align-center content">
				<v-card-title>{{ item.text }}</v-card-title>
				<v-icon color="grey">mdi-arrow-right-thick</v-icon>
			</div>
			</v-card>
		</v-col>
	</v-row>
</v-container>
</template>

<script>
export default {
	name: 'Home',
	data: () => ({
		items: [
			{
				text: 'Yahtzee',
				img: require('../assets/images/yahtzee.png'),
				to: '/yahtzee',
			},
			{
				text: 'Qwixx',
				img: require('../assets/images/quix.jpg'),
				to: '/qwixx',
			},
			{
				text: 'Yu-Gi-Oh!',
				img: require('../assets/images/yugioh.jpg'),
				to: '/yugioh',
			},
			{
				text: "Clue",
				img: require("../../src/assets/images/clue.jpg"),
				to: "/clue"
			},
			{
				text: 'Nertz',
				img: require('../assets/images/nertz.jpg'),
				to: '/nertz',
			},
		],
	}),
}
</script>

<style scoped>
	.game-card {
		display: inline-block;
		width: 98%;
		margin: 10px 1% !important;
	}
	.game-card .content {
		padding: 10px 20px;
	}
	@media only screen and (min-width: 768px) {
		.game-card {
			width: 48%;
		}
	}
	@media only screen and (min-width: 1200px) {
		.game-card {
			width: 31.33%;
		}
	}
	@media only screen and (min-width: 1400px) {
		.game-card {
			width: 23%;
		}
	}
</style>