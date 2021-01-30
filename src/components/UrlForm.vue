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
        type="button"
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
    <button type="button" class="shorten" @click="handleSubmit">
      <span><LinkPlus /></span>
    </button>
  </form>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import LinkPlus from 'icons/LinkPlus.vue'
import { isUrl } from '../../common/util'

@Component({
  components: { LinkPlus },
})
export default class UrlForm extends Vue {
  https = true
  urlInputFocus = false
  url = ''
  urlIsValid?: boolean

  handleSubmit(e: Event) {
    e.preventDefault()
    const { url, https } = this
    this.$store.dispatch('url/createSlug', { url, https })
  }

  toggleHttps() {
    const urlInput = this.$refs.url as HTMLFormElement
    urlInput.focus()
    this.https = !this.https
  }

  @Watch('url', { immediate: true })
  validateUrl(val: string) {
    this.urlIsValid = val ? isUrl(val) : undefined
  }
}
</script>

<style lang="scss" src="./UrlForm.scss" scoped />
