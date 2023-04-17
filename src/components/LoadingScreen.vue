<template>
    <div class="overlay">
        <svg width="200" height="200" viewBox="0 0 100 100">
            <polyline class="line-cornered stroke-still" points="0,0 100,0 100,100" stroke-width="10"
                      fill="none">
            </polyline>
            <polyline class="line-cornered stroke-still" points="0,0 0,100 100,100" stroke-width="10"
                      fill="none"></polyline>
            <polyline class="line-cornered stroke-animation" points="0,0 100,0 100,100" stroke-width="10"
                      fill="none"></polyline>
            <polyline class="line-cornered stroke-animation" points="0,0 0,100 100,100" stroke-width="10"
                      fill="none"></polyline>
        </svg>
    </div>
</template>

<script>
export default {
    name: "LoadingScreen"
}
</script>

<style scoped>

.overlay {
    position         : fixed;
    width            : 100%;
    height           : 100%;
    background-color : #0A1929;
    top              : 0;
    z-index          : 99;
    animation        : fade-in-right 0.3s ease-in;
}

.overlay svg {
    position          : fixed;
    top               : 50%;
    left              : 50%;
    -webkit-transform : translate(-50%, -50%) rotate(45deg) scale(1);
    transform         : translate(-50%, -50%) rotate(45deg) scale(1);
}

.overlay .stroke-still {
    stroke : #232323;
}

.overlay .stroke-animation {
    -webkit-animation                 : stroke-spacing 1.2s ease-in, stroke-color 4.8s linear;
    animation                         : stroke-spacing 1.2s ease-in, stroke-color 4.8s linear;
    -webkit-animation-iteration-count : infinite;
    animation-iteration-count         : infinite;
    -webkit-animation-delay           : 0;
    animation-delay                   : 0;
    -webkit-animation-direction       : normal;
    animation-direction               : normal;
    -webkit-animation-fill-mode       : forwards;
    animation-fill-mode               : forwards;
    -webkit-animation-play-state      : running;
    animation-play-state              : running;
    -webkit-transform-origin          : center center;
    transform-origin                  : center center;
}

@keyframes fade-in-right {
    from {
        opacity   : 0;
        transform : translateX(-15px);
    }
    to {
        opacity   : 1;
        transform : translateX(0);
    }
}

@-webkit-keyframes stroke-spacing {
    0% {
        stroke-dasharray : 0 200;
    }
    45% {
        stroke-dashoffset : 0;
        stroke-dasharray  : 200 200;
    }
    90% {
        stroke-dashoffset : -200;
        stroke-dasharray  : 200 200;
    }
    100% {
        stroke-dashoffset : -200;
        stroke-dasharray  : 200 200;
    }
}

@keyframes stroke-spacing {
    0% {
        stroke-dasharray : 0 200;
    }
    45% {
        stroke-dashoffset : 0;
        stroke-dasharray  : 200 200;
    }
    90% {
        stroke-dashoffset : -200;
        stroke-dasharray  : 200 200;
    }
    100% {
        stroke-dashoffset : -200;
        stroke-dasharray  : 200 200;
    }
}

@-webkit-keyframes stroke-color {
    0% {
        stroke : #3498DB;
    }
    24% {
        stroke : #643232;
    }
    25% {
        stroke : #327864;
    }
    49% {
        stroke : #327864;
    }
    50% {
        stroke : #32326e;
    }
    74% {
        stroke : #32326e;
    }
    75% {
        stroke : #78325a;
    }
    99% {
        stroke : #78325a;
    }
}

@keyframes stroke-color {
    0% {
        stroke : #3498DB;
    }
    24% {
        stroke : #643232;
    }
    25% {
        stroke : #327864;
    }
    49% {
        stroke : #327864;
    }
    50% {
        stroke : #32326e;
    }
    74% {
        stroke : #32326e;
    }
    75% {
        stroke : #78325a;
    }
    99% {
        stroke : #78325a;
    }
}
</style>