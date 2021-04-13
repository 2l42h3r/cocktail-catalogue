<template>
  <section
    v-show="isFetched"
    class="rounded-lg w-3/5 border-2 border-black border-solid p-8"
  >
    <div class="w-full text-center text-4xl">{{ cocktail.strDrink }}</div>
    <div class="w-full grid grid-cols-2 img-size pt-8">
      <img
        :src="cocktail.strDrinkThumb"
        :alt="`${cocktail.strDrink} Thumbnail`"
      />
      <div class="text-2xl flex justify-center items-center content-center">
        <div>
          <p>{{ cocktail.strInstructions }}</p>
          <div class="mt-4">
            Ingredients:
            <ul class="text-xl list-disc">
              <li v-for="ingredient of ingredients" :key="ingredient.name">
                {{ `${ingredient.measure} ${ingredient.name}` }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getCocktailById, randomCocktail } from '@/services/APIService'

export default {
  name: 'CocktailCard',
  props: {
    cocktailId: {
      type: String,
      required: false,
    },
    random: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      cocktail: {},
      isFetched: false,
    }
  },
  computed: {
    ingredients() {
      const ingredients = []
      for (let i = 1; i <= 15; i++) {
        if (this.cocktail[`strIngredient${i}`]) {
          ingredients.push({
            name: this.cocktail[`strIngredient${i}`],
            measure: this.cocktail[`strMeasure${i}`],
          })
        }
      }
      return ingredients
    },
  },
  async created() {
    await this.fetchData()
  },
  watch: {
    '$route.params.id': async function (id) {
      await this.fetchData(id)
    },
  },
  methods: {
    async fetchData(id = '') {
      let data
      if (this.random) {
        data = await randomCocktail()
      } else {
        if (id === '') {
          data = await getCocktailById(this.cocktailId)
        } else {
          data = await getCocktailById(id)
        }
      }
      this.cocktail = data.drinks[0]
      this.isFetched = true
      if (this.$route.path !== '/') {
        document.title = `The Cocktail Catalogue - ${this.cocktail.strDrink}`
        this.$store.dispatch('recentlyVisited/addToLast', {
          id: id === '' ? this.cocktailId : id,
          name: this.cocktail.strDrink,
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.img-size img {
  margin: auto;
  width: 30rem;
  border-radius: 2rem;
}
</style>
