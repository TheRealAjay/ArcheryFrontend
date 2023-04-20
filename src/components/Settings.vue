<template>
    <LoadingScreen v-if="this.loading === true"></LoadingScreen>
    <div class="container">
        <div class="row align-items-center mb-5">
            <div class="col-12 col-lg-9">
                <div class="header">Einstellungen</div>
            </div>
            <div class="col-12 col-lg-3">
                <div class="archery-button small" @click="$emit('setShowWindow', config.view.Dashboard)">
                    <div class="outline"></div>
                    <div class="text">
                        <font-awesome-icon :icon="['far', 'square-caret-left']" style="color: #ffffff;" />
                        &nbspZurück
                    </div>
                    <div class="overlay red"></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 d-flex justify-content-start align-items-center">
                <div>
                    <img v-if="loggedin" :src=profilePicture class="profile-pic img-fluid" alt="profileImg">
                </div>
                <div class="ms-3">
                    <div class="name">
                        {{ firstName }} {{ lastName }}
                    </div>
                    <div class="username">
                        @{{ username }}
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 d-flex justify-content-center">
                <div class="main">
                    <div class="bow">
                        <div class="bow__base"></div>
                        <div class="bow__top"></div>
                        <div class="bow__bottom"></div>
                        <div class="rope">
                            <div class="rope__top"></div>
                            <div class="rope__bottom"></div>
                        </div>
                    </div>
                    <div class="arrow">
                        <div class="arrow__line"></div>
                        <div class="arrow__head"></div>
                        <div class="arrow__top"></div>
                        <div class="arrow__bottom"></div>
                    </div>
                    <div class="line line-1"></div>
                    <div class="line line-2"></div>
                    <div class="wall"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import config from "../../config.json";
import axios from "axios";
import LoadingScreen from "@/components/LoadingScreen.vue";
import ValidatedInput from "@/components/smallComponents/ValidatedInput.vue";

export default {
    name: "Settings",
    components: {ValidatedInput, LoadingScreen},
    props: ["loggedin"],
    emits: ["setShowWindow"],
    data() {
        return {
            api: {
                changeUsername: "/Archery/changeUserName/",
                getUserData: "/Archery/getUserData/",
            },
            profilePicture: localStorage.ProfilePicture,
            username: localStorage.Username,
            loading: false,
            firstName: "",
            lastName: "",
            values: {
                firstName: "",
                lastName: "",
                nickName: "",
            },
            validation: {
                firstName: true,
                lastName: true,
                nickName: true,
            },
            config,
        }
    },
    methods: {
        async getUserData() {
            await axios({
                url: config.api.url + this.api.getUserData,
                method: "post",
                headers: {
                    "Authorization": `Bearer ${localStorage.BearerToken}`,
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                },
                data: {
                    userEmail: localStorage.Email,
                }
            }).then((result) => {
                let obj = JSON.parse(result.request.response);
                this.firstName = obj.firstName;
                this.lastName = obj.lastName;
                setTimeout(() => {
                    this.loading = false;
                }, Math.random() * 500);
            })
        },
    },
    beforeMount() {
        this.loading = true;
        this.getUserData();
    }
}
</script>

<style scoped>

/**/
.main {
    width    : 800px;
    height   : 600px;
    position : absolute;
    overflow : hidden;
}

@media (max-width : 800px) {
    .main {
        transform : scale(0.75);
    }
}

@media (max-width : 600px) {
    .main {
        transform : scale(0.5);
    }
}

/**/
.bow {
    position  : absolute;
    top       : 120px;
    left      : 345px;
    width     : 120px;
    height    : 350px;
    animation : bow 8s infinite;
}

.bow__base {
    position      : absolute;
    top           : calc(50% - 260px);
    right         : 0%;
    width         : 1500px;
    height        : 520px;
    z-index       : 100;
    border-radius : 70% 30% 30% 70%/50% 50% 50% 50%;
    border-top    : 15px solid transparent;
    border-right  : 15px solid #00bdae;
    border-bottom : 15px solid transparent;
    border-left   : 15px solid transparent;
}

.bow__base::before {
    content          : "";
    position         : absolute;
    top              : calc(50% - 37.5px);
    right            : -15px;
    width            : 25px;
    height           : 75px;
    background-image : linear-gradient(to bottom, #2c6087 30%, #f82b48 30%, #f82b48 70%, #00bdae 70%);
}

.bow__top, .bow__bottom {
    position      : absolute;
    left          : 10px;
    height        : 25px;
    width         : 12px;
    border-radius : 10px;
    background    : #00bdae;
    z-index       : 100;
}

.bow__bottom {
    bottom : 0px;
}

.rope {
    position : absolute;
    top      : 5px;
    left     : 12px;
    height   : 340px;
}

.rope__top, .rope__bottom {
    position      : absolute;
    height        : 175px;
    width         : 7px;
    border-radius : 10px;
    background    : #555468;
    animation     : row-top 4s infinite linear, row-h 4s infinite linear;
}

.rope__bottom {
    bottom    : 0%;
    animation : row-bottom 4s infinite linear, row-h 4s infinite linear;
}

.arrow {
    position  : absolute;
    top       : calc(50% - 22.5px);
    left      : calc(50% - 75px);
    width     : 300px;
    height    : 45px;
    animation : arrow 8s infinite linear, arrow-s 8s infinite linear;
}

.arrow__line {
    position      : absolute;
    width         : 280px;
    height        : 5px;
    top           : calc(50% - 2.5px);
    left          : calc(50% - 140px);
    z-index       : 50;
    background    : #555468;
    border-radius : 5px;
}

.arrow__head {
    position         : absolute;
    top              : 8px;
    right            : 5px;
    width            : 30px;
    height           : 30px;
    z-index          : 50;
    background-image : linear-gradient(-45deg, #ff6353 0%, #ff6353 50%, transparent 50%);
    transform        : rotateZ(-45deg);
}

.arrow__top, .arrow__bottom {
    position         : absolute;
    left             : 5px;
    width            : 50px;
    height           : 22px;
    background-image : linear-gradient(to right, #ff6353 0%, #ff6353 70%, #f82b48 70%);
    transform        : skewX(30deg);
}

.arrow__bottom {
    bottom           : 0;
    background-image : linear-gradient(to right, #00bdae 0%, #00bdae 70%, #2c6087 70%);
    transform        : skewX(-30deg);
}

.line {
    position   : absolute;
    left       : 100%;
    top        : 40%;
    width      : 50px;
    height     : 5px;
    background : #555468;
    animation  : line 8s infinite linear;
}

.line-2 {
    top             : 60%;
    animation-delay : 0.2s;
}

.wall {
    position   : absolute;
    width      : 5px;
    height     : 200px;
    top        : calc(50% - 100px);
    right      : -5px;
    z-index    : 50;
    background : #555468;
    animation  : wall 8s infinite linear;
}

/**/
@keyframes wall {
    0%, 80%, 96% {
        right : -10px;
    }
    82%, 95% {
        right : 0px;
    }
}

@keyframes bow {
    0%, 22%, 100% {
        top  : 120px;
        left : 345px;
    }
    30% {
        top  : 120px;
        left : -50vw;
    }
    80% {
        top  : 250vmax;
        left : 345px;
    }
}

@keyframes arrow {
    0%, 100% {
        left      : calc(50% - 75px);
        transform : rotateZ(0deg);
    }
    21% {
        left : calc(50% - 170px);
    }
    24%, 79% {
        left             : calc(100% - 350px);
        transform-origin : right;
        transform        : rotateZ(0deg);
    }
    80%, 82%, 84% {
        transform-origin : right;
        transform        : rotateZ(-5deg);
        left             : calc(100% - 305px);
    }
    81%, 83%, 85% {
        transform-origin : right;
        transform        : rotateZ(5deg);
        left             : calc(100% - 305px);
    }
    86%, 95% {
        transform-origin : right;
        transform        : rotateZ(0deg);
        left             : calc(100% - 305px);
    }
}

@keyframes arrow-s {
    0%, 40%, 42%, 44%, 46%, 48%, 60%, 62%, 64%, 66%, 68%, 70% {
        top : calc(50% - 22.5px);
    }
    41%, 43%, 45%, 47%, 49%, 61%, 63%, 65%, 67%, 69% {
        top : calc(50% - 18px);
    }
}

@keyframes row-h {
    0%, 12.5%, 44%, 50% {
        height : 175px;
    }
    42.5% {
        height : 198px;
    }
}

@keyframes row-top {
    0%, 50% {
        transform-origin : top;
        transform        : rotateZ(0deg);
    }
    40%, 42.5% {
        transform-origin : top;
        transform        : rotateZ(30deg);
    }
    47.5% {
        transform-origin : top;
        transform        : rotateZ(-15deg);
    }
}

@keyframes row-bottom {
    0%, 50% {
        transform-origin : bottom;
        transform        : rotateZ(0deg);
    }
    40%, 42.5% {
        transform-origin : bottom;
        transform        : rotateZ(-30deg);
    }
    47.5% {
        transform-origin : bottom;
        transform        : rotateZ(15deg);
    }
}

@keyframes line {
    0%, 25%, 30.1%, 35.1%, 40.1%, 45.1%, 50.1%, 55.1%, 60.1%, 65.1%, 70.1%, 75.1% {
        left : 100%;
    }
    30%, 35%, 40%, 45%, 50%, 55%, 60%, 65%, 70%, 75% {
        left : -100px;
    }
}

</style>