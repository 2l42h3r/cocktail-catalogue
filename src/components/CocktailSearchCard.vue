<template functional>
  <div
    v-on="listeners"
    class="cursor-pointer card p-8 border-2 border-solid border-black mt-4 rounded-3xl"
  >
    <img
      class="rounded-2xl"
      :src="props.cocktail.strDrinkThumb"
      :alt="`${props.cocktail.strDrink} Thumbnail`"
    />
    <div class="flex align-middle justify-center items-center">
      <p class="text-4xl">{{ props.cocktail.strDrink }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CocktailSearchCard',
  props: {
    cocktail: {
      required: true,
      type: Object,
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  display: grid;
  grid-template-columns: 30% 70%;
}
</style>
