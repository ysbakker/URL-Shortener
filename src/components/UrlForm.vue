<template>
  <form @submit="handleSubmit">
    <div class="url-input-container" :class="{ focused: urlInputFocus }">
      <button
        class="secure-toggle"
        :class="{ https: https, http: !https }"
        @click="toggleHttps"
      >
        {{ https ? 'https://' : 'http://' }}
      </button>
      <input
        @focus="urlInputFocus = true"
        @blur="urlInputFocus = false"
        size="1"
        ref="url"
        name="url"
        v-model="url"
        type="text"
        autofocus
      />
    </div>
    <button class="shorten" @click="handleSubmit">
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
  https = true
  urlInputFocus = false
  url = ''

  handleSubmit(e) {
    e.preventDefault()
  }

  toggleHttps() {
    this.$refs.url.focus()
    this.https = !this.https
  }
}
</script>

<style lang="scss" scoped>
@import '../style/_colors.scss';
@import '../style/_breakpoints.scss';

$bradius-sm: 4px;
$bradius-md: 5px;
$bradius-xl: 7px;

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
    max-width: 1400px;
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
    font-size: 1.8rem;
  }
}
button {
  cursor: pointer;
}
.url-input-container {
  display: flex;
  flex-basis: 100%;
  input {
    flex-basis: 100%;
    height: 100%;
    border-radius: 0 $bradius-sm $bradius-sm 0;
    border-left: none;
    transition: border-color 0.2s;
    &:focus {
      outline: none;
    }
    @media screen and (min-width: $sm) {
      border-radius: 0;
      border-right: none;
    }
  }
  &.focused {
    input,
    button {
      border-color: lighten($dark_lightblue, 10);
    }
    @media screen and (min-width: $sm) {
      & ~ button.shorten {
        border-color: lighten($dark_lightblue, 10);
        background: lighten($dark_lightblue, 10);
      }
    }
  }
}
button.shorten {
  flex-basis: 100%;
  border-radius: $bradius-sm;
  font-weight: bold;
  background: $dark_lightblue;
  transition: border-color 0.2s, background 0.2s;
  & > span::after {
    margin-left: 0.25em;
    content: 'Shorten';
  }
  &:hover {
    border-color: lighten($dark_lightblue, 10);
    background: lighten($dark_lightblue, 10);
  }
  svg {
    font-size: 0px;
    width: 20px;
    height: 20px;
  }
  @media screen and (min-width: $sm) {
    flex-basis: unset;
    flex: 0 0 auto;
    border-radius: 0 $bradius-sm $bradius-sm 0;
    padding-left: calc(0.5em + 4px);
    border-left: none;
    & > span::after {
      content: none;
    }
    &:hover {
      border-color: $dark_lightblue;
      background: $dark_lightblue;
    }
  }
  @media screen and (min-width: $md) {
    border-radius: 0 $bradius-md $bradius-md 0;
    svg {
      width: 28px;
      height: 28px;
    }
  }
  @media screen and (min-width: $xl) {
    border-radius: 0 $bradius-xl $bradius-xl 0;
    svg {
      width: 32px;
      height: 32px;
    }
  }
}
button.secure-toggle {
  border-right: none;
  border-radius: $bradius-sm 0 0 $bradius-sm;
  transition: border-color 0.2s;
  background: $dark_lightblue;
  &.https {
    background: $dark_green;
  }
  &.http {
    background: $dark_red;
  }
  @media screen and (min-width: $md) {
    border-radius: $bradius-md 0 0 $bradius-md;
  }
  @media screen and (min-width: $xl) {
    border-radius: $bradius-xl 0 0 $bradius-xl;
  }
}
</style>
