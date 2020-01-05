Vue.component('offices', {
    template: `
      <div class="card mt-4">
        <div class="card-header">
          Таблица офисов для планктончиков
          <div class="float-right">
            <b-btn variant="primary" @click="formShow=true">Добавить</b-btn>
          </div>
        </div>
        <b-table striped hover :items="items" :fields="fields">
          <template v-slot:cell(action)>
            <b-btn variant="outline-primary">Изменить</b-btn>
            <b-btn variant="outline-danger ml-1">Удалить</b-btn>
          </template>
        </b-table>
        <my-dialog
          :show="formShow"
          title="Добавить офис"
          :fields="formFields()"
          @form-close="formShow=false"
        >
        </my-dialog>
      </div>`,

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
            ],
            formShow: false,
        };
    },

    methods: {
        save() {
        },
        reset() {
            this.showForm = false;
        },
        formFields(values = []) {
            if (values.length === 0) {
                values.push('Новый офис', 'Новый адрес');
            }

            return [
                {
                    title: 'Название',
                    name: 'name',
                    description: 'Укажите название офиса',
                    value: values[0]
                },
                {
                    title: 'Адрес',
                    name: 'address',
                    description: 'Укажите адрес офиса',
                    value: values[1]
                }
            ]
        }
    }
});
