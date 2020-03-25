<template>
	<v-card class="error-card mt-6">
		<v-card-title class="red white--text">{{ error }}</v-card-title>
	</v-card>
</template>

<script>
export default {
	props: ['error'],
};
</script>

<style scoped lang=scss>
.error-card {
	margin-top: 1rem;
}
</style>