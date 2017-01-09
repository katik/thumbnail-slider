<template>
	<div class="wrapper">
            <tn-slider class='sliderId' direction='column' :index='index' :count='5' @on-click-item='itemClicked'>
                <tn-item v-for='slide in slides' class='itemId'>
                    <img :src="slide.src">
                    <p>销售状态</p>
                </tn-item>
            </tn-slider>

            <button @click='addIndex()'>{{index}}</button>
    </div>
</template>

<script type="text/javascript">
import TnSlider from '../src/tn-slider.vue';
import TnItem from '../src/tn-item.vue';
export default{
	name:'app',
    components: {
        'tn-item': TnItem,
        'tn-slider': TnSlider
    },
    data() {
    	return{
	        index: 0,
	        slides: [
	        	            { src: 'http://cdn1.dooioo.com/fetch/vp/yishou/ptgi/960x960/20160715/d8c92614-8ac4-4a55-940c-0faa56d9ccf9.jpg' },
	            { src: 'http://cdn1.dooioo.com/fetch/vp/yishou/ptgi/960x960/20160715/d8c92614-8ac4-4a55-940c-0faa56d9ccf9.jpg' },
	            { src: 'http://cdn1.dooioo.com/fetch/vp/yishou/ptgi/960x960/20160715/d8c92614-8ac4-4a55-940c-0faa56d9ccf9.jpg' },
	            { src: 'http://cdn1.dooioo.com/fetch/vp/yishou/ptgi/960x960/20160715/d8c92614-8ac4-4a55-940c-0faa56d9ccf9.jpg' },
	            { src: 'http://cdn1.dooioo.com/fetch/vp/yishou/ptgi/960x960/20160715/d8c92614-8ac4-4a55-940c-0faa56d9ccf9.jpg' },
	            { src: 'http://cdn1.dooioo.com/fetch/vp/yishou/ptgi/300x225/20160715/d39fece6-d715-44df-9450-722f86d4350b.jpg' },
	            { src: 'http://cdn1.dooioo.com/fetch/vp/yishou/ptgi/300x225/20160715/d8c92614-8ac4-4a55-940c-0faa56d9ccf9.jpg' },
	            { src: 'http://cdn1.dooioo.com/fetch/vp/yishou/ptgi/300x225/20160715/d6960d15-28d5-411e-b14e-ba04943bb961.jpg' },
	            { src: 'http://cdn1.dooioo.com/fetch/vp/yishou/ptgi/960x960/20160715/d8c92614-8ac4-4a55-940c-0faa56d9ccf9.jpg' },
	            { src: 'http://cdn1.dooioo.com/fetch/vp/yishou/ptgi/300x225/20160715/d39fece6-d715-44df-9450-722f86d4350b.jpg' },
	        ]
    	}
	},
	methods:{
		addIndex(){
			this.index++;
		},
		itemClicked(e){
			this.index = e.index;
		}
	}
};
</script>

<style type="text/css">
	
</style>