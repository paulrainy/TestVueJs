<template>
    <div class="container">
      <h2>Список пользователей</h2>
      <div id="clientsList">
        <div v-for="client in clients" :key="client.id" class="client">
          <span>{{ client.fullName }} <button @click="deleteClient(client.id)">Удалить</button></span>
          <div class="deposits" v-if="client.deposits.length > 0">
            <p v-for="deposit in client.deposits" :key="deposit.id">
              Сумма: {{ deposit.amount }}, Срок: {{ deposit.term }} месяцев, Тип: {{ deposit.type }}
            </p>
          </div>
          <div v-else><p>Нет вкладов у клиента.</p></div>
        </div>
      </div>
    </div>
  </template>

<script>
export default {
  data () {
    return {
      clients: []
    }
  },
  mounted () {
    this.fetchClients()
  },
  methods: {
    async fetchClients () {
      try {
        const response = await fetch('http://localhost:8080/clients')
        const clients = await response.json()
        this.clients = await Promise.all(clients.map(async client => {
          client.deposits = await this.fetchDeposits(client.id)
          return client
        }))
      } catch (error) {
        console.error('Ошибка:', error)
      }
    },
    async fetchDeposits (clientId) {
      const response = await fetch(`http://localhost:8080/deposit/${clientId}`)
      return response.json()
    },
    async deleteClient (clientId) {
      try {
        const response = await fetch(`http://localhost:8080/delete_client/${clientId}`, {
          method: 'DELETE'
        })
        if (response.ok) {
          alert('Клиент удален')
          this.fetchClients() // Обновляем список клиентов
        }
      } catch (error) {
        console.error('Ошибка:', error)
      }
    }
  }
}
</script>
