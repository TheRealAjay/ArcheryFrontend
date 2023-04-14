import {createApp} from 'vue'
import App from './App.vue'

import './assets/main.css'


import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

import {faBullseye} from "@fortawesome/free-solid-svg-icons";
import {faCalendar} from "@fortawesome/free-regular-svg-icons";
import {faGears} from "@fortawesome/free-solid-svg-icons";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

library.add(faBullseye)
library.add(faCalendar)
library.add(faGears)
library.add(faXmark)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')

