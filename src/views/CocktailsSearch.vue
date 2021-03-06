<template>
  <article class="text-center w-full">
    <section class="m-auto w-3/5 flex gap-4">
      <TInput v-model="searchString" placeholder="Search for a cocktail..." />
      <TSelect
        :options="alcoholic"
        readonly
        v-model="alcoholicOption"
        placeholder="Alcoholic?"
      />
      <TSelect
        :options="glasses"
        readonly
        v-model="glassOption"
        placeholder="Glass?"
      />
      <TSelect
        :options="categories"
        readonly
        v-model="categoryOption"
        placeholder="Category"
      />
      <TButton @click="search()">Search</TButton>
    </section>
    <section v-show="searched" class="m-auto w-2/5 text-center mt-16">
      <div class="text-3xl">Search results</div>
      <div class="searchResults">
        <CocktailSearchCard
          v-for="cocktail of searchResults"
          :key="cocktail.idDrink"
          :cocktail="cocktail"
          @click="routeToCocktail(cocktail.idDrink)"
        />
      </div>
    </section>
  </article>
</template>

<script>
import {
  getCategories,
  getGlasses,
  getAlcoholic,
  search,
} from '@/services/APIService'
import CocktailSearchCard from '@/components/CocktailSearchCard'

export default {
  name: 'CocktailsSearch',
  components: {
    CocktailSearchCard,
  },
  metaInfo: {
    title: 'Search',
  },
  data() {
    return {
      searchString: '',
      alcoholicOption: '',
      glassOption: '',
      categoryOption: '',
      categories: [],
      glasses: [],
      alcoholic: [],
      searchResults: [],
      searched: false,
    }
  },
  async created() {
    Promise.all([getCategories(), getGlasses(), getAlcoholic()]).then(
      (data) => {
        data[0].drinks.forEach((category) => {
          this.categories.push(category.strCategory)
        })
        data[1].drinks.forEach((glass) => {
          this.glasses.push(glass.strGlass)
        })
        data[2].drinks.forEach((alc) => {
          this.alcoholic.push(alc.strAlcoholic)
        })
      }
    )
  },
  methods: {
    search() {
      search(this.searchString).then((searchData) => {
        this.searchResults = this.filter(searchData.drinks)
        this.searched = true
      })
    },
    filter(cocktails) {
      let filtered =
        this.alcoholicOption === ''
          ? cocktails
          : cocktails.filter(this.filterAlcoholic)
      filtered =
        this.glassOption === '' ? filtered : filtered.filter(this.filterGlass)
      filtered =
        this.categoryOption === ''
          ? filtered
          : filtered.filter(this.filterCategory)
      return filtered
    },
    filterAlcoholic(drink) {
      return (
        drink.strAlcoholic.toUpperCase() === this.alcoholicOption.toUpperCase()
      )
    },
    filterGlass(drink) {
      return drink.strGlass.toUpperCase() === this.glassOption.toUpperCase()
    },
    filterCategory(drink) {
      return (
        drink.strCategory.toUpperCase() === this.categoryOption.toUpperCase()
      )
    },
    routeToCocktail(id) {
      this.$router.push({ path: `/cocktails/${id}` })
    },
  },
}
</script>

<style lang="scss" scoped>
.searchResults {
  display: grid;
  grid-auto-rows: 1fr;
}
</style>
