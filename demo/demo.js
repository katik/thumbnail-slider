// const tnItem = ThumbnailSlider.TnItem;
// const tnSlider = ThumbnailSlider.TnSlider;

require('../src/transform.js');
import Vue from 'vue'
import App from './App.vue'

new Vue({
  el: '.wrapper',
  render: h => h(App),
})

// new Vue({
//     el: '.wrapper',
//     components: {
//         'tn-item': TnItem,
//         'tn-slider': TnSlider
//     },
//     data: {
//         index: 0,
//         slides: [
//             { src: 'http://cdn1.dooioo.com/fetch/vp/yishou/ptgi/960x960/20160715/d8c92614-8ac4-4a55-940c-0faa56d9ccf9.jpg' },
//             { src: 'http://cdn1.dooioo.com/fetch/vp/yishou/ptgi/300x225/20160715/d39fece6-d715-44df-9450-722f86d4350b.jpg' },
//             { src: 'http://cdn1.dooioo.com/fetch/vp/yishou/ptgi/300x225/20160715/d8c92614-8ac4-4a55-940c-0faa56d9ccf9.jpg' },
//             { src: 'http://cdn1.dooioo.com/fetch/vp/yishou/ptgi/300x225/20160715/d6960d15-28d5-411e-b14e-ba04943bb961.jpg' },
//             { src: 'http://cdn1.dooioo.com/fetch/vp/yishou/ptgi/960x960/20160715/d8c92614-8ac4-4a55-940c-0faa56d9ccf9.jpg' },
//             { src: 'http://cdn1.dooioo.com/fetch/vp/yishou/ptgi/300x225/20160715/d39fece6-d715-44df-9450-722f86d4350b.jpg' },
//         ]
//     },
// });

// new Vue({
//     el: '.sliderId',
//     render: h => h(TnSlider)
// });
// new Vue({
//     el: '.itemId',
//     render: h => h(TnSlider)
// });