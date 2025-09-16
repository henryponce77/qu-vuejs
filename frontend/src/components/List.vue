<template>  
	<Pager v-if="total > 0" :total="total"/>
	<div class="d-flex flex-column gap-3">
		<div v-for="(joke, index) in jokes" :key="joke.id+index" class="card">  
			<div class="card-body">
			<span class="badge rounded-pill" :class="computedBadgeClass(joke.type)">{{ upperFirst(joke.type) }}</span>
			<h5 class="card-title">#{{ joke.id  }} - {{ joke.setup}}</h5>
			<p class="card-text">{{ joke.punchline }}</p>
			</div>
		</div>
  </div>
  <Pager v-if="total > 0" :total="total"/>
</template>

<script setup lang="ts">
	import upperFirst from "lodash/upperFirst";
	import { onBeforeMount, ref, watch } from 'vue'
  	import { useFilterStore } from '@/stores';
  	import { get, getJokes, getTotalJokesUrl } from "@/services"
	import { INITIAL_PAGE_NUMBER, JOKES_PER_PAGE } from '@/constants';
	import type { Joke } from '@/types';
  	import Pager from './Pager.vue'

	const filterStore = useFilterStore();

  	const total = ref(0);
	const jokes = ref<Joke[]>([]);

	const fetchJokes = async () => {
		jokes.value = await getJokes<Joke[]>({
			page: filterStore.currentPage,
			perPage: JOKES_PER_PAGE,
			orderDirection: filterStore.filterSortDirection,
			type: filterStore.filterType
		});
	};

	const computedBadgeClass = (type: string) => {
		switch (type) {
			case 'general':
				return 'bg-primary';
			case 'programming':
				return 'bg-success';
			case 'knock-knock':
				return 'bg-warning text-dark';
			default:
				return 'bg-secondary';
		}
	};

	onBeforeMount(async () => {
		await fetchJokes()
		total.value = await get<number>(getTotalJokesUrl(filterStore.filterType));
	});

	watch(() => [filterStore.currentPage], async() => {
		await fetchJokes();
	});	

	watch(() => [filterStore.filterSortDirection, filterStore.filterType], async () => {
		filterStore.setCurrentPage(INITIAL_PAGE_NUMBER);
		await fetchJokes();
		total.value = await get<number>(getTotalJokesUrl(filterStore.filterType));
	});	
</script>

<style scoped>

</style>
