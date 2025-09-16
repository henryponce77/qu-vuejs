import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue";
import { DEFAULT_JOKE_TYPE, DEFAULT_ORDER_DIRECTION, INITIAL_PAGE_NUMBER } from "@/constants";

export const useFilterStore = defineStore("filter", () => {
    //#region -- STATE --

    const filterSortDirection = ref<string>(DEFAULT_ORDER_DIRECTION);
    const filterType = ref<string>(DEFAULT_JOKE_TYPE);
    const currentPage = ref(INITIAL_PAGE_NUMBER);

    //#endregion
    //#region -- ACTIONS --

    const setSortDirection = (direction: string) => filterSortDirection.value = direction;
    const setType = (type: string) => filterType.value = type;
    const setCurrentPage = (page: number) => currentPage.value = page;


    //#endregion

    return {
        currentPage,
        filterSortDirection,
        filterType,
        setCurrentPage,
        setSortDirection,
        setType,
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useFilterStore, import.meta.hot));
}