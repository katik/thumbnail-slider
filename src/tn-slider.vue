<style type="text/css">
	.tn-slider{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.tn-slider-row{
		flex-direction: row;
	}
	.tn-prev,.tn-next{
		flex:none;
	}

	.tn-transform-container{
		flex:1;
		overflow: hidden;
	}

	.tn-transform-wrapper{
		position: relative;
	}

	.tn-slider-row .tn-transform-wrapper{
		white-space: nowrap;
	}

</style>
<template>
	<div class="tn-slider" :class="{'tn-slider-row' : direction=='row'}">
		<div class="tn-prev"  @click='slidePrev()'>
			<slot name='tn-prev' class='tn-prev'></slot>
		</div>
		<div class="tn-transform-container">
			<div class="tn-transform-wrapper">
				<slot></slot>
			</div>
		</div>
		<div class="tn-next"  @click='slideNext()'>
			<slot name='tn-next'></slot>
		</div>
	</div>
</template>
<script type="text/javascript">
	import './transform.js';
	export default {
		name: 'tn-slider',

		props:{
			count: {
				type: Number,
				default: 1
			},
			index: {
				type: Number,
				default: 0
			},
			direction: {
				type: String,
				default: 'row'
			},
			animation: {
				type: String,
				default: 'ease'
			},
			animationTime: {
				type: Number,
				default: 400
			}
		},

		data() {
			return {
				$transformWrapper:null,
				fullLength:0,
				currentEl:null,
				allImgs:[],
				directionAtrMap:{
					translate:{
						row:'translateX',
						column:'translateY',
					},
					offset:{
						row:'offsetLeft',
						column:'offsetTop',
					},
					size:{
						row:'clientWidth',
						column:'clientHeight',
					},
					scrollSize:{
						row:'scrollWidth',
						column:'scrollHeight'
					}
				}
			}
		},

		watch:{
			index() {
				var $el = this.$el.getElementsByClassName("tn-item")[this.index];
				if($el){
					this._slideToItem($el);
				}
			},
			fullLength() {
				this.resize();
			}
		},

		mounted() {
			let wrapper = this.$el.getElementsByClassName('tn-transform-wrapper')[0];
			Transform(wrapper);
			this.$transformWrapper = wrapper;
			setTimeout(() => {
				this.fullLength = this.$el.getElementsByClassName('tn-transform-container')[0][this.directionAtrMap.size[this.direction]];
			},50);
			this._addResizeHandler();
		},

		methods: {
			slidePrev() {
				this._slideBy(this.$transformWrapper[this.directionAtrMap.translate[this.direction]] + this.fullLength);
			},
			slideNext() {
				this._slideBy(this.$transformWrapper[this.directionAtrMap.translate[this.direction]] - this.fullLength);
			},
			resetSliderPos(){
				this.$transformWrapper[this.directionAtrMap.translate[this.direction]] = 0;
			},
			resize(){
				this.fullLength = this.$el.getElementsByClassName('tn-transform-container')[0][this.directionAtrMap.size[this.direction]];
				let els = this.$el.getElementsByClassName('tn-item');
				let elLength = this.fullLength/this.count;
				Array.prototype.map.call(els, (el) => {
					this.direction == 'column' ? el.style.height = elLength + 'px' : el.style.width = elLength + 'px';
				});
				this._slideToItem(els[this.index], true);
			},
			_slideToItem(item, noAnimating) {
				let offset =  .5*this.fullLength - .5*this.fullLength/this.count - item[this.directionAtrMap.offset[this.direction]];
				this._slideBy(offset, noAnimating);
			},
			_slideBy(offset, noAnimating) {
				let size = this.$el.getElementsByClassName('tn-transform-wrapper')[0][this.directionAtrMap.scrollSize[this.direction]];
				let translateAtr = this.directionAtrMap.translate[this.direction];
				if(offset >= 0 || this.fullLength > size){
					offset = 0;
				}
				if(offset < 0 && offset <= this.fullLength - size)
				{
					offset =  this.fullLength - size;
				}
				if(this.animation == 'ease' && !noAnimating){
					this._animate(this.$transformWrapper,translateAtr,offset,this.animationTime, this._ease, null);
				}
				else{
					this.$transformWrapper[translateAtr] = offset;
				}
			},
			_addResizeHandler(){
				let resizeTimeout;
				let self = this;
				function resizeThrottler() {
					if ( !resizeTimeout ) {
						resizeTimeout = setTimeout(function() {
							resizeTimeout = null;
							self.resize();
						}, 16);
					}
				}
				window.addEventListener("resize", self.resize, false);
			},
			_animate(el, property, value, time, ease, onEnd,onChange) {
				var current = el[property];
				var dv = value - current;
				var beginTime = new Date();
				var self = this;
				var currentEase=ease||function(a){return a };
				this.tickID=null;
				var toTick = function () {
					var dt = new Date() - beginTime;
					if (dt >= time) {
						el[property] = value;
						onChange && onChange(value);
						onEnd && onEnd(value);
						cancelAnimationFrame(self.tickID);
						self.toTick=null;
						return;
					}
					el[property] = dv * currentEase(dt / time) + current;
					self.tickID=requestAnimationFrame(toTick);
					onChange && onChange(el[property]);
				};
				toTick();
			},
			_ease(x) {
				return Math.sqrt(1 - Math.pow(x - 1, 2));
			}
		}
	}
</script>
