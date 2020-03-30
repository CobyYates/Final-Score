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
			:key="item"
			>
			<v-img :src="'../../assets/images/' + item.img" :alt="'Image of ' + item.text" aspect-ratio="1.5"></v-img>
			<div class="d-flex justify-space-between align-center content">
				<v-card-title>{{ item.text }}</v-card-title>
				<v-btn
					:to="item.to"
					icon
				><v-icon color="grey">mdi-arrow-right-thick</v-icon></v-btn>
			</div>
			</v-card>
		</v-col>
	</v-row>
</v-container>
</template>

<script>
export default {
	name: 'Home',

	data() {
		return {
			items: [
				{
					text: "Settlers",
					img: "nertz.jpg",
					to: ""
				},
				{
					text: "Yahtzee",
					img: "yahtzee.png",
					to: "/yahtzee"
				},
				{ 
					text: "Quix", 
					img: "quix.jpg",
					to: "" 
				},
				{
					text: "Yu-Gi-Oh!",
					img: "yugioh.jpg",
					to: ""
				},
				{
					text: "Oh Hell!",
					img: "ohhell.jpg",
					to: "/ohhell"
				},
				{
					text: "Nertz",
					img: "nertz.jpg",
					to: ""
				}
			]
		}
	}
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

	.game-card .v-img {
		height: 250px;
		width: 100%;
		object-fit: cover;
		object-position: top;
		background-color: orange;
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