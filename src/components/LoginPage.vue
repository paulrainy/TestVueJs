<template>
    <div class="container">
      <h2>Авторизация</h2>
      <form @submit.prevent="loginFunc">
        <input v-model="loginData.login" type="text" placeholder="Логин" required>
        <input v-model="loginData.password" type="password" placeholder="Пароль" required>
        <select v-model="loginData.server" required>
          <option value="" disabled selected>Выберите сервер</option>
          <option value="test01">test01</option>
          <option value="test02">test02</option>
          <option value="test03">test03</option>
          <option value="test01/hotfix">test01/hotfix</option>
          <option value="test02/hotfix">test02/hotfix</option>
          <option value="test03/hotfix">test03/hotfix</option>
        </select>
        <button type="submit">Войти</button>
      </form>
    </div>
  </template>

<script>
export default {
  data () {
    return {
      loginData: {
        login: '',
        password: '',
        server: ''
      }
    }
  },
  methods: {
    async loginFunc () {
      const formData = new FormData()
      formData.append('login', this.loginData.login)
      formData.append('password', this.loginData.password)
      formData.append('server', this.loginData.server)

      try {
        const response = await fetch('http://localhost:8080/auth', {
          method: 'POST',
          body: formData
        })

        if (response.ok) {
          this.$router.push({ name: 'main' })
        } else {
          alert('Ошибка авторизации. Проверьте логин и пароль.')
        }
      } catch (error) {
        console.error('Ошибка:', error)
      }
    }
  }
}
</script>
