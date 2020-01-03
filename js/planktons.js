Vue.component('planktons', {
    template: `<b-table striped hover :items="items" :fields="fields">
      <template v-slot:cell(office)="data">
        {{data.item.office}}
      </template>
      <template v-slot:cell(action)>
        <b-btn variant="outline-primary">Изменить</b-btn>
        <b-btn variant="outline-danger ml-1">Удалить</b-btn>
      </template>
    </b-table>`,
    computed: {
        items() {
            let items = [];
            return this.$store.getters.planktons;
        }
    },
    data: function () {
        return {
            fields: [
                {key: 'id', label: 'ID'},
                {key: 'name', label: 'Имя'},
                {key: 'office', label: 'Офис'},
                {key: 'action', label: 'Управление'},
            ]
        };
    }
});
