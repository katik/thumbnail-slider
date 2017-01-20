# Overview

thumbnail-slider is a simple slider for a list of images which can be used in photo albums likewise.

# Install

```bash
$ npm install thumbnail-slider
```

## Import using module
Import components to your project:

```JavaScript
require('thumbnail-slider/dist/thumbnailSlider.css');

// in ES6 modules
import { TnSlider, TnItem } from 'ThumbnailSlider';

// in CommonJS
const { TnSlider, TnItem } = require('ThumbnailSlider');

// in Global variable
const { TnSlider, TnItem } = ThumbnailSlider;
```

And register components:

```javascript
Vue.component('tn-slider', TnSlider);
Vue.component('tn-item', TnItem);
```

## Import using script tag

``` HTML
<link rel="stylesheet" href="../node-modules/thumbnail-slider/dist/thumbnailSlider.css" charset="utf-8">
<script src="../node-modules/thumbnail-slider/dist/thumbnailSlider.min.js"></script>
```

```JavaScript
import { TnSlider, TnItem } from 'ThumbnailSlider';

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
            { src: 'https://cdn.pixabay.com/photo/2016/11/07/05/13/map-1804891__480.jpg' },
            { src: 'https://cdn.pixabay.com/photo/2016/11/07/05/13/map-1804891__480.jpg' },
            { src: 'https://cdn.pixabay.com/photo/2016/11/07/05/13/map-1804891__480.jpg' },
          ]
      }
  },
  methods:{
    clickItem(i){
      this.index = i;
    },
  }
};
```

# Usage

Work on a Vue instance:

```HTML
<tn-slider class='wrapper' :index='index' :count='6'>
      <p slot='tn-prev' class='prev-icon'>prev</p>
      <tn-item v-for='(slide,i) in slides' @on-item-click='clickItem(i)'>
          <div class='customed-item'>
            <img :src="slide.src">
              <p>notes: blabla</p>
          </div>
      </tn-item>
      <p slot='tn-next' class='next-icon'>next</p>
</tn-slider>
```

```CSS
.customed-item {
        
}
.prev-icon {
    
}
.next-icon {
    
}
```

# Options

Here list Props and events on the component

| Option | Description |
| ----- | ----- |
| counts | Number(default: 1) slide items per view. |
| index | Number (default:0) - current slide item in middle |
| direction | String (default:'row') - the direction of slide, which can be 'row' or 'column' |
| animation | String (default:'ease') - now only 2 options: 'none' or 'ease' |
| animation-time | Number (default:'400') - time for animation |
| @on-item-click | function - trigged when slide item be clicked|


# Develop

```bash
$ npm run dev
$ npm run build
```

# Many thanks to 
[transform.js](http://alloyteam.github.io/AlloyTouch/transformjs/)

# License
MIT