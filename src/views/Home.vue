<template>
  <article class="text-center w-full">
    <CocktailCard :random="true" class="mt-16 m-auto" />
  </article>
</template>

<script>
import CocktailCard from '@/components/CocktailCard.vue'

export default {
  name: 'Home',
  components: {
    CocktailCard,
  },
  metaInfo: {
    title: 'The Cocktail Catalogue',
    titleTemplate: null,
  },
}
</script>
