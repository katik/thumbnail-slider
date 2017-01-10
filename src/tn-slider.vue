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
		<span class="tn-prev" @click='slidePrev()'>上一张</span>
		<div class="tn-transform-container">
			<div class="tn-transform-wrapper">
				<slot></slot>
			</div>
		</div>
  		<span class="tn-next" @click='slideNext()'>下一张</span>
  	</div>
</template>
<script type="text/javascript">
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
						row:'scrollWidth',
						column:'clientHeight',
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
			}
		},

		mounted() {
			console.log(233);
			let wrapper = this.$el.getElementsByClassName('tn-transform-wrapper')[0];
			Transform(wrapper);
			this.$transformWrapper = wrapper;
			this.fullLength = this.direction == 'column' ? this.$el.getElementsByClassName('tn-transform-container')[0].clientHeight
							: this.$el.getElementsByClassName('tn-transform-container')[0].clientWidth;
			let els = this.$el.getElementsByClassName('tn-item');
			let elLength = this.fullLength/this.count;
			Array.prototype.map.call(els, (el) => {
			    this.direction == 'column' ? el.style.height = elLength + 'px' : el.style.width = elLength + 'px';
			});
			// $(this.$el).find(".tn-item").css('height',this.fullLength/this.count);
		},

		methods: {
			clickItem(el) {
				this.index = [].slice.call(this.$el.getElementsByClassName("tn-item")).indexOf(el);
				this.$emit('on-click-item',{index:this.index});
			},
			slidePrev() {
				this._slideBy(this.$transformWrapper[this.directionAtrMap.translate[this.direction]] + this.fullLength);
			},
			slideNext() {
				this._slideBy(this.$transformWrapper[this.directionAtrMap.translate[this.direction]] - this.fullLength);
			},
			_slideToItem(item) {
				let offset =  .5*this.fullLength - .5*this.fullLength/this.count - item[this.directionAtrMap.offset[this.direction]];
				this._slideBy(offset);
				console.log('offset', offset);
			},
			_slideBy(offset) {
				let size = this.$el.getElementsByClassName('tn-transform-wrapper')[0][this.directionAtrMap.size[this.direction]];
				let translateAtr = this.directionAtrMap.translate[this.direction];
				if(offset >= 0){
					offset = 0;
				}
				if(offset < 0 && offset <= this.fullLength - size)
				{
					offset =  this.fullLength - size;
				}
				if(this.animation == 'ease'){
					new this._animate(this.$transformWrapper,translateAtr,offset,500, this._ease, null);
				}
				else{
					new this._animate(this.$transformWrapper,translateAtr,offset,0, null, null);
				}
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