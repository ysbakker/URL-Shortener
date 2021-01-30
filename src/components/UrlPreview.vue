<template>
  <div>
    <ClipLoader v-if="fetching" color="#9191da" />
    <h1 v-if="slug && !fetching">{{ `${domain}/${slug}` }}</h1>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

@Component({
  components: { ClipLoader },
})
export default class UrlPreview extends Vue {
  domain = process.env.VUE_APP_DOMAIN

  get fetching() {
    return this.$store.state.url.fetching
  }

  get slug() {
    return this.$store.state.url.slug
  }
}
</script>

<style lang="scss" src="./UrlPreview.scss" scoped />
