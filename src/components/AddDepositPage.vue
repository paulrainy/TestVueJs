<template>
    <div class="container">
      <h2>Добавить вклад</h2>
      <form @submit.prevent="addDeposit">
        <input type="number" v-model="clientId" placeholder="ID клиента" required />
        <input type="text" v-model="amount" placeholder="Сумма" required />
        <input type="text" v-model="term" placeholder="Срок (в месяцах)" required />
        <input type="text" v-model="type" placeholder="Тип вклада" required />
        <input type="text" v-model="replenishmentMethod" placeholder="Способ пополнения" required />
        <label>
          <input type="checkbox" v-model="openedByThirdParty" />
          Открыт третьим лицом
        </label>
        <label>
          <input type="checkbox" v-model="isPremiumClient" />
          Премиальный клиент
        </label>
        <button type="submit">Добавить вклад</button>
      </form>
      <div class="result" v-if="result">{{ result }}</div>
    </div>
  </template>

<script>
export default {
  data () {
    return {
      clientId: '',
      amount: '',
      term: '',
      type: '',
      replenishmentMethod: '',
      openedByThirdParty: false,
      isPremiumClient: false,
      result: ''
    }
  },
  methods: {
    async addDeposit () {
      const formData = new FormData()
      formData.append('client_id', this.clientId)
      formData.append('amount', this.amount)
      formData.append('term', this.term)
      formData.append('type', this.type)
      formData.append('replenishment_method', this.replenishmentMethod)
      formData.append('opened_by_third_party', this.openedByThirdParty)
      formData.append('is_premium_client', this.isPremiumClient)

      try {
        const response = await fetch('http://localhost:8080/add_deposit', {
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
