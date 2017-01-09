<style type="text/css">
	.tn-item{
		width: 100%;
		overflow: hidden;
		flex:none;
	}
</style>
<template>
	<div class="tn-item" @click='clickHandler()'>
    	<slot></slot>
  	</div>
</template>
<script type="text/javascript">
	export default {
		name: 'tn-item',

		props: {

		},

		data() {
			return {

			}
		},

		mounted() {

		},

		methods:{
			clickHandler() {
				this.$parent && this.$parent.clickItem(this.$el);
			}
		}

	}
</script>