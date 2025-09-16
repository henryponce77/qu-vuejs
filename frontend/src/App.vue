<template>
  <div class="main-container d-flex flex-column gap-4">
	<h2>Qu - Joke List</h2> 
    <Filters/>
	<List />
  </div>
</template>

<script setup lang="ts">
	import Filters from '@/components/Filters.vue';
	import List from '@/components/List.vue'
</script>