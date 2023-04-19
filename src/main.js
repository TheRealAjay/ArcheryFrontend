import { createApp } from 'vue'
import App from './App.vue'

import "./style/progress.css";

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faCalendar, faSquareCaretLeft, faTrashCan, faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { faBullseye, faGears, faXmark, faClockRotateLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

library.add(
	faBullseye,
	faCalendar,
	faGears,
	faXmark,
	faSquareCaretLeft,
	faClockRotateLeft,
	faTrashCan,
	faCaretRight,
	faCircleXmark
)
createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')

