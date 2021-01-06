<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
	export default {
		name: 'App'
	}
</script>

<style>
	@import url("animate.css");
	* {
		padding: 0;
		margin: 0;
	}
	img{
		max-width: 100%;
		vertical-align: top;
	}
	li{
		list-style: none;
	}

	#app {
		
		font-size: 28px;

	}
	svg{
		max-width: 100%;
	}
</style>
