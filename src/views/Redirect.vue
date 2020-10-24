<template>
  <div>
    <h1>Redirecting...</h1>
    <h2>/{{ $route.params.slug }}</h2>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class Test extends Vue {}
</script>
