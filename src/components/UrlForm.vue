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

<style lang="scss" src="./UrlForm.scss" scoped />
