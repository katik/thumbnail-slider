<style type="text/css">
	.tn-slider{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.tn-prev,.tn-next{
		flex:none;
	}
	.tn-transform-container{
		flex:1;
		overflow: hidden;
	}

	.tn-transform-wrapper{
		/*get the child offset*/
		position: relative;
	}
</style>
<template>
	<div class="tn-slider">
		<span class="tn-prev" @click='slidePrev()'>bbb</span>
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
			}
		},

		data() {
			return {
				$transformWrapper:null,
				fullLength:0,
				currentEl:null
			}
		},

		watch:{
			index() {
				var $el = document.getElementsByClassName("tn-item")[this.index];
				if($el){
					this._slideToItem($el);
				}
			}
		},

		mounted() {
			console.log(233);
			let wrapper = $('.tn-transform-wrapper')[0];
			Transform(wrapper);
			this.$transformWrapper = wrapper;
			this.fullLength = $('.tn-transform-container').height();
			$(this.$el).find(".tn-item").css('height',this.fullLength/this.count);
		},

		methods: {
			clickItem(el) {
				this.index = [].slice.call(document.getElementsByClassName("tn-item")).indexOf(el);
				this.$emit('on-click-item',{index:this.index});
			},
			_slideToItem(item) {
				let offset =  .5*this.fullLength - .5*this.fullLength/this.count - item.offsetTop;
				this._slideBy(offset);
				console.log('offset', offset);
			},
			slidePrev() {
				this._slideBy(this.fullLength);
			},
			slideNext() {
				this._slideBy(-this.fullLength);
			},
			_slideBy(offset) {
				if(offset >= 0){
					offset = 0;
				}
				if(offset < 0 && offset <= this.fullLength - $('.tn-transform-wrapper').height())
				{
					offset =  this.fullLength - $('.tn-transform-wrapper').height();
				}
				new this._animate(this.$transformWrapper,'translateY',offset,500, this._ease, null);
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
			        //self.tickID = requestAnimationFrame(toTick);
			        //cancelAnimationFrame������ tickID = requestAnimationFrame(toTick);�ĺ���
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