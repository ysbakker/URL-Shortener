<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
}

.material-design-icon svg {
  transform: translateY(2px);
}
</style>
