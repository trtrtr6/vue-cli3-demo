<template>
  <div ref="monaco" class="monaco"></div>
</template>
<script>
import * as monaco from 'monaco-editor'
export default {
  data () {
    return {
      value: `import * as monaco from 'monaco-editor'
this.monacoEditor = monaco.editor.create(this.$refs.monaco, {
  value: this.value,
  language: 'javascript',
  theme: 'vs-dark'
})`
    }
  },
  mounted () {
    this.monacoEditor = monaco.editor.create(this.$refs.monaco, {
      value: this.value,
      language: 'javascript',
      theme: 'vs-dark'
    })
  }
}
</script>
<style scoped>
.monaco{
  width:100%;
  height:100%;
}
</style>
