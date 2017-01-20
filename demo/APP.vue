
<template>
	<div class="wrapper">
			<div class="wrapper0">
				<p>demo1:</p>
				<p>direction:column; count:5</p>
				 <tn-slider class='wrapper1' direction='column' :index='index' :count='5'>
	             	<p slot='tn-prev'>prev</p>
	                <tn-item v-for='(slide,i) in slides' @on-item-click='clickItem(i)'>
	                	<div class="huxing-wrapper">
	                		<img :src="slide.src">
	                    	<p>notes blabla...</p>
	                	</div>
	                </tn-item>
	                <p slot='tn-next'>next</p>
	            </tn-slider>
	            <button @click='addIndex()'>Index: {{index}}</button>
	            <button @click='changeImgs()'>change slides</button>
			</div>

			<div class="wrapper2">
				<p>demo2:</p>
				<p>direction:column; count:1; animation:none</p>
		    	<tn-slider direction='column' :index='index' :count='1' animation='none' :hide-nav='true'>
		                <tn-item v-for='slide in slides'>
		                    <img :src="slide.src">
		                </tn-item>
		        </tn-slider>
		    </div> 

			<div class="row2">
				<div class="wrapper4">
				<p>demo3:</p>
				<p>direction:row; count:6; animation:ease</p>
					<tn-slider class='wrapper3' :index='index' :count='6'>
		                <p slot='tn-prev'>prev</p>
		                <tn-item v-for='(slide,i) in slides' @on-item-click='clickItem(i)'>
		                    <img :src="slide.src">
		                    <p>notes: blabla</p>
		                </tn-item>
		                <p slot='tn-next'>next</p>
		            </tn-slider>
		            <button @click='addIndex()'>Index: {{index}}</button>
	            	<button @click='changeImgs()'>change slides</button>
				</div>
			    
				<div class="wrapper5">
					<p>demo4:</p>
					<p>direction:row; count:1; animation:ease</p>
			    	<tn-slider :index='index' :count='1' :hideNav='true'>
			    			<p slot='tn-prev'>prev</p>
			                <tn-item v-for='slide in slides'>
			                    <img :src="slide.src">
			                    <p>notes: blabla</p>
			                </tn-item>
			                <p slot='tn-next'>next</p>
			        </tn-slider>
			    </div>
			</div>
    </div>
</template>

<script type="text/javascript">
import TnSlider from '../src/tn-slider.vue';
import TnItem from '../src/tn-item.vue';
export default{
	name:'app',
    components: {
        'tn-item': TnItem,
        'tn-slider': TnSlider,
    },
    data() {
    	return{
	        index: 0,
	        slides: [
	        	{ src: 'http://cdn1.dooioo.com/fetch/vp/yishou/ptgi/300x225/20160715/d39fece6-d715-44df-9450-722f86d4350b.jpg' },
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
		clickItem(i){
			this.index = i;
		},
		itemClicked(e){
			this.index = e.index;
		},
		changeImgs(){
			this.slides = [
				{ src: 'http://cdn1.dooioo.com/fetch/vp/yishou/ptgi/960x960/20160715/d8c92614-8ac4-4a55-940c-0faa56d9ccf9.jpg' },
	            { src: 'http://cdn1.dooioo.com/fetch/vp/yishou/ptgi/960x960/20160715/d8c92614-8ac4-4a55-940c-0faa56d9ccf9.jpg' },
	            { src: 'http://cdn1.dooioo.com/fetch/vp/yishou/ptgi/960x960/20160715/d8c92614-8ac4-4a55-940c-0faa56d9ccf9.jpg' },
	            { src: 'http://cdn1.dooioo.com/fetch/vp/yishou/ptgi/300x225/20160715/d39fece6-d715-44df-9450-722f86d4350b.jpg' },
	        	{ src: 'http://cdn1.dooioo.com/fetch/vp/yishou/ptgi/960x960/20160715/d8c92614-8ac4-4a55-940c-0faa56d9ccf9.jpg' },
	            { src: 'http://cdn1.dooioo.com/fetch/vp/yishou/ptgi/960x960/20160715/d8c92614-8ac4-4a55-940c-0faa56d9ccf9.jpg' },
	            ]
	           this.index = 0;
		}
	}
};
</script>


