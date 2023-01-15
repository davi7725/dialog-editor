<template>
    <Flow /> 
</template>
<script setup lang="ts">
import Flow from "./components/Flow.vue"

window.onbeforeunload = function (e) {
    e = e || window.event;

    // For IE and Firefox prior to version 4
    if (e) {
        e.returnValue = 'Any string';
    }

    // For Safari
    return 'Any string';
};

</script>
<style>
@import "../node_modules/@vue-flow/core/dist/style.css";
@import "../node_modules/@vue-flow/core/dist/theme-default.css";
</style> 