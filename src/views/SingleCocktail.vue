<template>
  <CocktailCard :cocktailId="$route.params.id" class="m-auto" />
</template>

<script>
import CocktailCard from '@/components/CocktailCard.vue'

export default {
  name: 'SingleCocktail',
  components: {
    CocktailCard,
  },
}
</script>
