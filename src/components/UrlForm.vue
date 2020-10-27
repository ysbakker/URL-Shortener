<template>
  <form @submit="handleSubmit">
    <div class="input-container">
      <input v-model="url" type="text" />
      <button><LinkPlus :size="38" /></button>
    </div>
  </form>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'
import LinkPlus from 'icons/LinkPlus.vue'

@Component({
  components: { LinkPlus },
})
export default class UrlForm extends Vue {
  url = ''

  handleSubmit(e) {
    e.preventDefault()
  }
}
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
  color: $dark_textlight;
  padding: 0.75rem;
}
input {
  flex-basis: 100%;
  border-radius: 5px 0 0 5px;
  font-size: 2rem;
  border-right: none;
  transition: border-color 0.2s;
  &:focus {
    outline: none;
    border-color: lighten($dark_lightblue, 10);
    & ~ button {
      border-color: lighten($dark_lightblue, 10);
      &:hover {
        background: lighten($dark_lightblue, 10);
      }
    }
  }
}
button {
  cursor: pointer;
  padding-left: calc(0.75rem + 4px);
  flex-basis: 40px;
  border-radius: 0 5px 5px 0;
  border-left: none;
  font-weight: bold;
  transition: background 0.2s, border-color 0.2s;
  &:hover {
    background: $dark_lightblue;
  }
}
</style>
