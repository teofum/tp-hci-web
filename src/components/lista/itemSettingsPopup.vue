<template>
    <div class="popup">
        <div class="popup-inner">
            <h1>item setings todo hello :D!!</h1>
            <button class="popup-close" @click="TogglePopup()">
                Clse popp
            </button>
        </div>
    </div>
</template>

<script>
export default{
    props: ['TogglePopup']
}
</script>

<style>
.popup{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.2);

    display: flex;
    align-items: center;
    justify-content: center;

    .popup-inner{
        background: #fff;
        padding: 32px;
    }
}
</style>