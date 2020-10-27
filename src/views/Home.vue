<template>
  <div>
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

div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: $dark_darkblue;
}
</style>
