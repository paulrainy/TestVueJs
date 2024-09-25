<template>
    <div class="container">
      <h2>Добавить пользователя</h2>
      <form @submit.prevent="addClient">
        <input type="text" v-model="fullName" placeholder="ФИО" required />
        <button type="submit">Добавить пользователя</button>
      </form>
      <div class="result" v-if="result">{{ result }}</div>
    </div>
  </template>

<script>
export default {
  data () {
    return {
      fullName: '',
      result: ''
    }
  },
  methods: {
    async addClient () {
      const formData = new FormData()
      formData.append('fullName', this.fullName)

      try {
        const response = await fetch('http://localhost:8080/add_client', {
          method: 'POST',
          body: formData
        })
        this.result = await response.text()
      } catch (error) {
        console.error('Ошибка:', error)
      }
    }
  }
}
</script>
