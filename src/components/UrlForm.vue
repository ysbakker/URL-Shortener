<template>
  <form @submit="handleSubmit">
    <div class="url-input-container" :class="{ focused: urlInputFocus }">
      <input
        @focus="urlInputFocus = true"
        @blur="urlInputFocus = false"
        name="url"
        v-model="url"
        type="text"
        autofocus
      />
    </div>
    <button @click="handleSubmit">
      <span><LinkPlus /></span>
    </button>
  </form>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'
import LinkPlus from 'icons/LinkPlus.vue'

@Component({
  components: { LinkPlus },
})
export default class UrlForm extends Vue {
  urlInputFocus = false
  url = ''

  handleSubmit(e) {
    e.preventDefault()
    console.log('hello there')
  }
}
</script>

<style lang="scss" scoped>
@import '../style/_colors.scss';
@import '../style/_breakpoints.scss';

form {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 90%;
  & > *:not(:last-child) {
    margin-bottom: 1em;
  }
  @media screen and (min-width: $sm) {
    flex-direction: row;
    width: 80%;
    & > *:not(:last-child) {
      margin-bottom: 0;
    }
  }
}
input,
button {
  -webkit-appearance: none;
  background: none;
  border: 3px solid $dark_lightblue;
  color: $dark_textlight;
  padding: 0.5em;
  font-size: 1.13rem;
  @media screen and (min-width: $md) {
    border-width: 4px;
    font-size: 1.5rem;
  }
  @media screen and (min-width: $xl) {
    font-size: 2rem;
  }
}
.url-input-container {
  flex-basis: 100%;
  input {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    font-style: italic;
    transition: border-color 0.2s;
    &:focus {
      outline: none;
    }
    @media screen and (min-width: $sm) {
      border-radius: 5px 0 0 5px;
      border-right: none;
    }
  }
  &.focused {
    input {
      border-color: lighten($dark_lightblue, 10);
    }
    @media screen and (min-width: $sm) {
      & ~ button {
        border-color: lighten($dark_lightblue, 10);
        background: lighten($dark_lightblue, 10);
      }
    }
  }
}
button {
  cursor: pointer;
  flex-basis: 100%;
  border-radius: 5px;
  font-weight: bold;
  background: $dark_lightblue;
  transition: border-color 0.2s, background 0.2s;
  & > span::after {
    margin-left: 0.25em;
    content: 'Shorten';
  }
  svg {
    font-size: 0px;
    width: 20px;
    height: 20px;
  }
  @media screen and (min-width: $sm) {
    flex-basis: 40px;
    border-radius: 0 5px 5px 0;
    padding-left: calc(0.5em + 4px);
    border-left: none;
    & > span::after {
      content: none;
    }
  }
  @media screen and (min-width: $md) {
    svg {
      width: 31px;
      height: 31px;
    }
  }
  @media screen and (min-width: $xl) {
    svg {
      width: 38px;
      height: 38px;
    }
  }
}
</style>
