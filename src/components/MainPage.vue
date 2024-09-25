<template>
    <div class="container">
      <h2>Поиск клиента по ID</h2>
      <input v-model="clientId" type="number" placeholder="Введите ID клиента" required>
      <button @click="searchClient">Найти</button>
      <div class="result" v-html="result"></div>
      <h2>Управление клиентами</h2>
      <button @click="goToAddClient">Добавить пользователя</button>
      <button @click="goToListClients">Список пользователей</button>
      <button @click="goToAddDeposit">Перейти на страницу добавления вклада</button>
    </div>
  </template>

<script>
export default {
  data () {
    return {
      clientId: '',
      result: ''
    }
  },
  methods: {
    async searchClient () {
      try {
        const response = await fetch(`http://localhost:8080/client/${this.clientId}`)
        if (response.ok) {
          const client = await response.json()
          this.result = `<p>ID: ${client.id}, ФИО: ${client.fullName}</p>`
          this.fetchDepositsByClientId(client.id)
          this.checkAndAddDepositButton(client.id)
        } else {
          throw new Error('Клиент не найден')
        }
      } catch (error) {
        this.result = `<p>${error.message}</p>`
      }
    },
    goToAddClient () {
      this.$router.push({ name: 'add-client' })
    },
    goToListClients () {
      this.$router.push({ name: 'list-clients' })
    },
    goToAddDeposit () {
      this.$router.push({ name: 'add-deposit' })
    },
    async fetchDepositsByClientId (clientId) {
      const response = await fetch(`http://localhost:8080/deposit/${clientId}`)
      const deposits = await response.json()
      if (deposits.length > 0) {
        this.result += '<h3>Вклады клиента:</h3>'
        deposits.forEach(deposit => {
          this.result += `<p>Сумма: ${deposit.amount}, Срок: ${deposit.term} месяцев, Тип: ${deposit.type}</p>`
        })
      } else {
        this.result += '<p>У клиента нет вкладов.</p>'
      }
    },
    async checkAndAddDepositButton (clientId) {
      const response = await fetch(`http://localhost:8080/has_deposit/${clientId}`)
      const hasDeposit = await response.json()
      if (!hasDeposit) {
        this.result += '<button @click="goToAddDeposit(clientId)">Создать вклад для клиента</button>'
      }
    }
  }
}
</script>
