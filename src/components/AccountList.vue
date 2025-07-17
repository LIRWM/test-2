<template>
  <div>
    <v-list>
      <v-list-item-group v-if="accounts.length">
        <v-list-item v-for="(account, index) in accounts" :key="index">
          <v-list-item-content>
            <v-list-item-title>{{ account.login }}</v-list-item-title>
            <v-list-item-subtitle>{{ account.type }} | {{ account.label.map(item => item.text).join(', ') }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-btn @click="removeAccount(index)">Удалить</v-btn>
        </v-list-item>
      </v-list-item-group>
      <v-list-item v-else>
        <v-list-item-content>
          <v-list-item-title>Нет учетных записей</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAccountsStore } from '@/store/accounts';

export default defineComponent({
  setup() {
    const store = useAccountsStore();
    const accounts = store.accounts;

    const removeAccount = (index: number) => {
      store.removeAccount(index);
    };

    return { accounts, removeAccount };
  },
});
</script>