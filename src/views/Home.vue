<template>
  <div class="home-container">
    <div class="mast-text">
      <h1>vect.it</h1>
      <h2>a URL shortener</h2>
    </div>
    <UrlForm />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UrlForm from '../components/UrlForm.vue'

@Component({
  components: {
    UrlForm,
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
@import '../style/_colors.scss';
@import '../style/_breakpoints.scss';

div.home-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  background: $dark_darkblue;
  & > * {
    margin-top: 10vh;
  }
}

div.mast-text {
  text-transform: uppercase;
  h1 {
    color: $dark_textlight;
    font-size: 3.5rem;
    @media screen and (min-width: $md) {
      font-size: 4rem;
    }
    @media screen and (min-width: $xl) {
      font-size: 4.5rem;
    }
  }
  h2 {
    color: $dark_text;
    font-size: 1rem;
    @media screen and (min-width: $md) {
      font-size: 1.2rem;
    }
  }
}
</style>
