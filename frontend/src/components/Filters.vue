<template>
    <div class="w-100 d-flex gap-2">
        <div class="d-flex gap-1 align-items-center">
            <label for="typeOptions">Filter by type:</label>
            <select id="typeOptions" @change="onTypeChange">
                <option v-for="(option, index) in getTypeOptions()" :key="index" :value="option.value" :selected="option.selected">{{ option.label }}</option>
            </select>
        </div>

        <div class="d-flex gap-1 align-items-center">
            <label for="sortedOptions">Sorted by title:</label>
            <select id="sortedOptions" @change="onSortDirectionChange">
                <option :value="DEFAULT_ORDER_DIRECTION" selected>{{ upperFirst(DEFAULT_ORDER_DIRECTION) }}</option>
                <option value="desc">Desc</option>            
            </select>
        </div>
    </div>
</template>
<script setup lang="ts">
    import upperFirst from "lodash/upperFirst";
    import { onBeforeMount, ref } from 'vue';
    import { useFilterStore } from '@/stores';
    import { get } from "@/services"
    import { DEFAULT_ORDER_DIRECTION, DEFAULT_JOKE_TYPE, URL_JOKE_TYPES } from '@/constants';
    import type { JokeType, JokeTypeOption } from '@/types';

    const filterStore = useFilterStore();

    const types = ref<JokeType[]>();
    
    const onTypeChange = (event: Event) => {
        const selectedType = (event.target as HTMLSelectElement).value;
        filterStore.setType(selectedType);
    };

    const onSortDirectionChange = (event: Event) => {
        const selectedDirection = (event.target as HTMLSelectElement).value;
        filterStore.setSortDirection(selectedDirection);
    };

    const getTypeOptions = (): JokeTypeOption[] => {
        if (!types.value) return [];
        
        const output = [{ value: DEFAULT_JOKE_TYPE, label: upperFirst(DEFAULT_JOKE_TYPE), selected: true }];

        return [
            ...output,
            ...types.value.map(type => ({ value: type, label: upperFirst(type) }))
        ];
    };  

    onBeforeMount(async () => {
        types.value = await get<JokeType[]>(URL_JOKE_TYPES);
    });
</script>