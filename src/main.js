import {createApp} from 'vue'
import App from './App.vue'

import "./style/progress.css";

import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

import {faBullseye} from "@fortawesome/free-solid-svg-icons";
import {faCalendar} from "@fortawesome/free-regular-svg-icons";
import {faGears} from "@fortawesome/free-solid-svg-icons";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {faSquareCaretLeft} from "@fortawesome/free-regular-svg-icons";
import {faClockRotateLeft} from "@fortawesome/free-solid-svg-icons";
import {faTrashCan} from "@fortawesome/free-regular-svg-icons";
import {faCaretRight} from "@fortawesome/free-solid-svg-icons";

library.add(faBullseye)
library.add(faCalendar)
library.add(faGears)
library.add(faXmark)
library.add(faSquareCaretLeft)
library.add(faClockRotateLeft)
library.add(faTrashCan)
library.add(faCaretRight)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')

