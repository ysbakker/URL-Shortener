<template>
  <div class="url-preview">
    <div>
      <ClipLoader v-if="fetching" color="#9191da" />
      <a
        class="shortlink"
        :href="`https://${domain}/${slug}`"
        target="_blank"
        v-if="slug && !fetching"
      >
        <span id="slug">{{ `${domain}/${slug}` }}</span>
        <OpenInNew />
      </a>
    </div>
    <button
      type="button"
      @click="handleCopy"
      id="copy-btn"
      data-clipboard-target="#slug"
      v-if="slug && !fetching"
    >
      <span v-if="copySuccess === true"><CheckCircle /> Copied</span>
      <span v-else><ContentCopy /> Copy</span>
    </button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
import OpenInNew from 'icons/OpenInNew.vue'
import ContentCopy from 'icons/ContentCopy.vue'
import CheckCircle from 'icons/CheckCircle.vue'
import ClipboardJS from 'clipboard'

@Component({
  components: { ClipLoader, OpenInNew, ContentCopy, CheckCircle },
})
export default class UrlPreview extends Vue {
  domain = process.env.VUE_APP_DOMAIN
  copySuccess = false

  handleCopy(e: Event) {
    e.preventDefault()
    this.copySuccess = false
    const cb = new ClipboardJS('#copy-btn')

    cb.on('success', (e: ClipboardJS.Event) => {
      e.clearSelection()
      this.copySuccess = true
    })
  }

  get fetching() {
    return this.$store.state.url.fetching
  }

  get slug() {
    return this.$store.state.url.slug
  }
}
</script>

<style lang="scss" src="./UrlPreview.scss" scoped />
