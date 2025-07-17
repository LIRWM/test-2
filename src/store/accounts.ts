import { defineStore } from 'pinia';

export const useAccountsStore = defineStore('accounts', {
    state: () => ({
        accounts: [] as Array<{
            label: string[];
            type: 'LDAP' | 'Local';
            login: string;
            password: string | null;
        }>,
    }),
    actions: {
        addAccount() {
            this.accounts.push({
                label: [],
                type: 'LDAP',
                login: '',
                password: null,
            });
        },
        removeAccount(index: number) {
            this.accounts.splice(index, 1);
        },
        saveAccount(index: number, account: any) {
            this.accounts[index] = account;
        },
    },
});