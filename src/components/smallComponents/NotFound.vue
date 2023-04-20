<template>
    <div class="empty-icon-container">
        <div class="animation-container">
            <div class="bounce"></div>
            <div class="pebble1"></div>
            <div class="pebble2"></div>
            <div class="pebble3"></div>
        </div>
        <div class="mt-1">
            <div class="text light">{{ notFoundText }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "NotFound",
    props: ['notFoundText'],
}
</script>


<style scoped>
.text.light {
    font-family : "Lato", serif;
    font-size   : 20px;
    font-weight : 400;
    z-index     : 3;
    width       : 100%;
    text-align  : center;
    padding-top : 15px;
}


.empty-icon-container {
    margin         : 50px auto;
    text-align     : center;
    display        : flex;
    flex-direction : column;
    align-items    : center;
}

.animation-container {
    position      : relative;
    display       : block;
    text-align    : center;
    height        : 100px;
    width         : 200px;
    border-bottom : solid 2px #ffffff;
    overflow      : hidden;
}

.bounce {
    display          : inline-block;
    position         : absolute;
    bottom           : 0;
    left             : 50%;
    width            : 40px;
    height           : 40px;
    margin-left      : -20px;
    background-size  : contain;
    background-image : url("data:image/png;base64,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");
    animation        : bounceAnim 1s cubic-bezier(.63, .09, .75, .46) infinite alternate,
    spinAnim 3s linear infinite;
}

@keyframes bounceAnim {
    0%, 10% {
        bottom : 50%;
    }

    100% {
        bottom : 0%;
    }
}

@keyframes spinAnim {
    0% {
        transform : rotate(0deg);
    }
    100% {
        transform : rotate(360deg);
    }
}

.pebble1 {
    position         : absolute;
    top              : 95%;
    background-color : #ffffff;
    width            : 10px;
    height           : 10px;
    border-radius    : 20px 20px 0px 0px;
    animation        : pebblesAnim 1s linear infinite;
}

.pebble2 {
    position         : absolute;
    top              : 97%;
    background-color : #ffffff;
    width            : 5px;
    height           : 5px;
    border-radius    : 10px 10px 0px 0px;
    animation        : pebblesAnim 2s linear infinite;
}

.pebble3 {
    position         : absolute;
    top              : 98%;
    background-color : #ffffff;
    width            : 3px;
    height           : 3px;
    border-radius    : 20px 20px 0px 0px;
    animation        : pebblesAnim 3s linear infinite;
}

@keyframes pebblesAnim {
    0% {
        right : -20%;
    }
    100% {
        right : 110%;
    }
}
</style>