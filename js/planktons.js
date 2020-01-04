Vue.component('planktons', {
    template: `<b-table striped hover :items="items" :fields="fields">
      <template v-slot:cell(office)="data">
        {{office(data.item.office)}}
      </template>
      <template v-slot:cell(action)>
        <b-btn variant="outline-primary">Изменить</b-btn>
        <b-btn variant="outline-danger ml-1">Удалить</b-btn>
      </template>
    </b-table>`,

    computed: {
        items() {
            return this.$store.getters.planktons;
        },
    },

    methods: {
        office(officeId) {
            const office = this.$store.getters.office(officeId);
            let officeName = officeId;

            if (office) {
                officeName = office.name;
            }

            return  officeName;
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
