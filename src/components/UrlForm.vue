<template>
  <form>
    <div class="input-container">
      <input v-model="url" type="text" />
      <button>Shorten</button>
    </div>
  </form>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class UrlForm extends Vue {}
</script>

<style lang="scss" scoped>
@import '../style/_colors.scss';

form {
  display: flex;
  justify-content: center;
  width: 100%;
}
.input-container {
  display: flex;
  width: 80%;
}
input,
button {
  -webkit-appearance: none;
  background: none;
  border: 4px solid $dark_lightblue;
}
input {
  flex-basis: 100%;
}
button {
  flex-basis: 40px;
}
</style>
