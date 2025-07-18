import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useAccountsStore = defineStore('accounts', () => {
  const saved = localStorage.getItem('accounts')
  const accounts = ref(saved ? JSON.parse(saved) : [])

  watch(accounts, () => {
    localStorage.setItem('accounts', JSON.stringify(accounts.value))
  }, { deep: true })

  function setAccounts(newAccounts: any[]) {
    accounts.value = newAccounts
  }

  return { accounts, setAccounts }
})
