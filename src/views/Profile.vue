<template>
  <span />
</template>

<script>
export default {
  name: 'UserProfile',

  mounted () {
    const userData = JSON.parse(atob(this.$route.query?.user))
    localStorage.setItem('user_id', userData.id)
    localStorage.setItem('user_name', userData.username)
    this.$router.replace({'query': null, path: '/' })
  }
}
</script>
