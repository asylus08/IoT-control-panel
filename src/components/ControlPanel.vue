<script setup lang="ts">
import * as api from '../api/api.ts';

</script>

<template>
    <div class="control-panel">
        <button v-on:click="api.testConnection">Tester la connexion</button>
    </div>
</template>

<style scoped>
.control-panel {
    border: 2px solid white;
    border-radius: 10px;
    padding: 20px;
}
</style>