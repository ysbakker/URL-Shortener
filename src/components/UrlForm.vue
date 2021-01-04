<template>
  <form
    @submit="handleSubmit"
    :class="{
      focused: urlInputFocus,
      valid: urlIsValid,
      invalid: urlIsValid === false,
    }"
  >
    <div class="url-input-container">
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
import { Vue, Component, Watch } from 'vue-property-decorator'
import LinkPlus from 'icons/LinkPlus.vue'

@Component({
  components: { LinkPlus },
})
export default class UrlForm extends Vue {
  https = true
  urlInputFocus = false
  url = ''
  urlIsValid = null
  urlFetchTimeout = null

  handleSubmit(e) {
    e.preventDefault()
  }

  toggleHttps() {
    this.$refs.url.focus()
    this.https = !this.https
  }

  @Watch('url', { immediate: true })
  validateUrl(val) {
    const pattern = new RegExp(
      /(https?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b[-a-zA-Z0-9@:%_+.~#?&//=]*/
    )
    this.urlIsValid = val ? pattern.test(val) : null
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
  input,
  button {
    -webkit-appearance: none;
    background: none;
    border: 3px solid $dark_lightblue;
    border-radius: $bradius-sm;
    color: $dark_textlight;
    padding: 0.5em;
    font-size: 1.13rem;
    transition: border-color 0.3s, background 0.3s;
    &:focus {
      outline: none;
    }
    @media screen and (min-width: $md) {
      border-width: 4px;
      font-size: 1.5rem;
      border-radius: $bradius-md;
    }
    @media screen and (min-width: $xl) {
      font-size: 1.8rem;
      border-radius: $bradius-xl;
    }
  }
  button {
    cursor: pointer;
  }
  button.shorten {
    flex-basis: 100%;
    font-weight: bold;
    background: $dark_lightblue;
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
      padding-left: calc(0.5em + 4px);
      border-left: none;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      & > span::after {
        content: none;
      }
      &:hover {
        border-color: $dark_lightblue;
        background: $dark_lightblue;
      }
    }
    @media screen and (min-width: $md) {
      svg {
        width: 28px;
        height: 28px;
      }
    }
    @media screen and (min-width: $xl) {
      svg {
        width: 32px;
        height: 32px;
      }
    }
  }
  &.focused {
    input,
    button {
      border-color: lighten($dark_lightblue, 10);
    }
    button.shorten {
      background: lighten($dark_lightblue, 10);
    }
    @media screen and (min-width: $sm) {
      button.shorten {
        border-color: lighten($dark_lightblue, 10);
        background: lighten($dark_lightblue, 10);
      }
    }
  }
  &.valid {
    input,
    button {
      border-color: $dark_greenalt;
    }
    &.focused {
      input,
      button {
        border-color: lighten($dark_greenalt, 10);
      }
      button.shorten {
        border-color: $dark_greenalt;
        background: $dark_greenalt;
        @media screen and (min-width: $sm) {
          &,
          &:hover {
            border-color: lighten($dark_greenalt, 10);
            background: lighten($dark_greenalt, 10);
          }
        }
      }
    }
    button.shorten {
      background: $dark_greenalt;
      &:hover {
        border-color: lighten($dark_greenalt, 10);
        background: lighten($dark_greenalt, 10);
        @media screen and (min-width: $sm) {
          border-color: $dark_greenalt;
          background: $dark_greenalt;
        }
      }
    }
  }
  &.invalid {
    input,
    button {
      border-color: $dark_redalt;
    }
    &.focused {
      input,
      button {
        border-color: lighten($dark_redalt, 10);
      }
      button.shorten {
        border-color: $dark_redalt;
        background: $dark_redalt;
        @media screen and (min-width: $sm) {
          &,
          &:hover {
            border-color: lighten($dark_redalt, 10);
            background: lighten($dark_redalt, 10);
          }
        }
      }
    }
    button.shorten {
      background: $dark_redalt;
      &:hover {
        border-color: lighten($dark_redalt, 10);
        background: lighten($dark_redalt, 10);
        @media screen and (min-width: $sm) {
          border-color: $dark_redalt;
          background: $dark_redalt;
        }
      }
    }
  }
}
.url-input-container {
  display: flex;
  flex-basis: 100%;
  input {
    flex-basis: 100%;
    height: 100%;
    border-radius: 0 $bradius-sm $bradius-sm 0;
    border-left: none;
    @media screen and (min-width: $sm) {
      border-radius: 0;
      border-right: none;
    }
  }
}
button.secure-toggle {
  background: $dark_lightblue;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  &.https {
    background: $dark_green;
  }
  &.http {
    background: $dark_red;
  }
}
</style>
