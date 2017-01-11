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
		/*width: 100%;*/
		height: 37px;
		background: #f5f5f5;
		text-align: center;
	}
	.tn-prev:after{
		content: ' ';
		height: 100%;
		width: 37px;
		border:5px solid #e4e4e4;
		border-left:transparent;
		border-top:transparent;
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
		<span class="tn-prev" v-if='!hideNav' @click='slidePrev()'>上一张</span>
		<div class="tn-transform-container">
			<div class="tn-transform-wrapper">
				<slot></slot>
			</div>
		</div>
  		<span class="tn-next" v-if='!hideNav' @click='slideNext()'>下一张</span>
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
			},
			hideNav: {
				type: Boolean,
				default: false
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
			},
			fullLength() {
				let els = this.$el.getElementsByClassName('tn-item');
				let elLength = this.fullLength/this.count;
				Array.prototype.map.call(els, (el) => {
				    this.direction == 'column' ? el.style.height = elLength + 'px' : el.style.width = elLength + 'px';
				});
			}
		},

		mounted() {
			console.log(233);
			let wrapper = this.$el.getElementsByClassName('tn-transform-wrapper')[0];
			Transform(wrapper);
			this.$transformWrapper = wrapper;
			this.fullLength = this.direction == 'column' ? this.$el.getElementsByClassName('tn-transform-container')[0].clientHeight
							: this.$el.getElementsByClassName('tn-transform-container')[0].clientWidth;
			this._addResizeHandler();
			
		},

		methods: {
			clickItem(el) {
				// this.index = [].slice.call(this.$el.getElementsByClassName("tn-item")).indexOf(el);
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
			_addResizeHandler(){
				window.addEventListener("resize", resizeThrottler, false);
				var resizeTimeout;
				function resizeThrottler() {
				    if ( !resizeTimeout ) {
				      resizeTimeout = setTimeout(function() {
				        resizeTimeout = null;
				        actualResizeHandler();
				       }, 66);
				    }
				}
				function actualResizeHandler() {
	    			this.fullLength = this.direction == 'column' ? this.$el.getElementsByClassName('tn-transform-container')[0].clientHeight
					: this.$el.getElementsByClassName('tn-transform-container')[0].clientWidth;
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