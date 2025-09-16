<template>
    <nav v-if="totalPages>INITIAL_PAGE_NUMBER" aria-label="Page navigation">
        <ul class="pagination justify-content-center">
            <li class="page-item" :class="getPageBackNavigatorClass()">
                <a class="page-link" href="#" aria-label="Previous" @click="goToPage(computedCurrentPage - 1)">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li v-for="n in totalPages" :key="n" class="page-item" :class="getPageNumberClass(n)"><a class="page-link" href="#" @click="goToPage(n)">{{ n }}</a></li>
            <li class="page-item" :class="getPageNextNavigatorClass()">
                <a class="page-link" href="#" aria-label="Next" @click="goToPage(computedCurrentPage + 1)">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
    import { computed, ref, watch } from 'vue';
    import { useFilterStore } from '@/stores';
    import { INITIAL_PAGE_NUMBER, JOKES_PER_PAGE } from '@/constants';

    const props = defineProps({
        total: { type: Number, default: 0 },
    });

    const filterStore = useFilterStore();

    const totalPages = ref(0);

    const computedCurrentPage = computed(() => filterStore.currentPage);

    const getPageNumberClass = (page: number) => ({
        "active": page === computedCurrentPage.value,
    });

    const getPageBackNavigatorClass = () => ({
        "disabled": computedCurrentPage.value === INITIAL_PAGE_NUMBER,
    });

    const getPageNextNavigatorClass = () => ({
        "disabled": computedCurrentPage.value === totalPages.value,
    });

    const goToPage = (page: number) => {
        filterStore.setCurrentPage(page);
    };

    watch(() => props.total, (newTotal) =>  {
        totalPages.value = Math.ceil(newTotal / JOKES_PER_PAGE);
        console.log('Total pages:', totalPages.value);
    }, { immediate: true });
   
</script>