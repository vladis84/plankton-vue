Vue.component('offices', {
    template: `<b-table striped hover :items="items" :fields="fields">
      <template v-slot:cell(action)>
        <b-btn variant="outline-primary">Изменить</b-btn>
        <b-btn variant="outline-danger ml-1">Удалить</b-btn>
      </template>
    </b-table>`,

    computed: {
        items() {
            return this.$store.getters.offices;
        },
    },

    data: function () {
        return {
            fields: [
                {key: 'id', label: 'ID'},
                {key: 'name', label: 'Название'},
                {key: 'address', label: 'Адрес'},
                {key: 'action', label: 'Управление'},
            ]
        };
    }
});
