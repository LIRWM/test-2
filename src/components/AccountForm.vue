<template>
  <div>
    <el-alert
      title="Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;"
      type="info"
      show-icon
      class="mb-4"
    />
    <el-button type="primary" icon="Plus" @click="addAccount" class="mb-3">
      Добавить запись
    </el-button>

    <el-card v-for="(account, index) in accounts" :key="account.id" class="mb-4">
      <el-form :model="account" label-width="100px" :rules="rules" ref="formRefs[index]">
        <el-form-item label="Метки">
          <el-input v-model="account.label" placeholder="через ;" @blur="parseLabel(index)" />
        </el-form-item>

        <el-form-item label="Тип записи">
          <el-select v-model="account.type" placeholder="Тип">
            <el-option label="LDAP" value="LDAP" />
            <el-option label="Локальная" value="Локальная" />
          </el-select>
        </el-form-item>

        <el-form-item label="Логин" prop="login" :rules="rules.login">
          <el-input v-model="account.login" />
        </el-form-item>

        <el-form-item
          v-if="account.type === 'Локальная'"
          label="Пароль"
          prop="password"
          :rules="rules.password"
        >
          <el-input v-model="account.password" type="password" show-password />
        </el-form-item>

        <el-button type="danger" icon="Delete" @click="removeAccount(index)">Удалить</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAccountsStore } from '@/store/accounts'

const store = useAccountsStore()
const accounts = ref(store.accounts)
const formRefs = ref([])

watch(accounts.value, () => {
  store.setAccounts(accounts.value)
}, { deep: true })

function addAccount() {
  accounts.value.push({
    id: Date.now(),
    label: '',
    tags: [],
    type: 'Локальная',
    login: '',
    password: ''
  })
}

function removeAccount(index: number) {
  accounts.value.splice(index, 1)
}

function parseLabel(index: number) {
  const raw = accounts.value[index].label
  const tags = raw
    .split(';')
    .map(el => el.trim())
    .filter(Boolean)
    .map(text => ({ text }))
  accounts.value[index].tags = tags
}

const rules = {
  login: [{ required: true, message: 'Обязательное поле', trigger: 'blur' }],
  password: [{ required: true, message: 'Обязательное поле', trigger: 'blur' }]
}
</script>

<style scoped>
.mb-4 {
  margin-bottom: 1rem;
}
.mb-3 {
  margin-bottom: 1.5rem;
}
</style>
