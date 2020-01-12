Vue.component('plankton-table', {
    template: `
      <div class="card mt-4">
        <div class="card-header">
          Таблица планктончиков
          <div class="float-right">
            <button
              type="button"
              class="btn btn-primary"
              @click="edit({name:'Новый планктончик', post: 'Новая должность', office: null })"
            >
              Добавить
            </button>
          </div>
        </div>
        <table class="table table-striped table-hover">
          <thead>
          <tr>
            <th>#</th>
            <th>Имя</th>
            <th>Должность</th>
            <th>Офис</th>
            <th>Управление</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in items" v-bind:key="item.id">
            <td>{{item.id}}</td>
            <td>{{item.name}}</td>
            <td>{{item.post}}</td>
            <td>{{office(item.office)}}</td>
            <td>
              <button
                type="button"
                class="btn btn-outline-primary"
                @click="edit(item)"
              >
                Изменить
              </button>
              <button
                type="button"
                class="btn btn-outline-danger ml-1"
                @click="remove(item)"
              >
                Удалить
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    `,

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

            return officeName;
        },

        edit(plankton) {
            this.$root.$refs.planktonDialog.open(plankton).then((plankton) => {
                this.$store.dispatch('SAVE_PLANKTON', {plankton}).then(
                    () => this.$root.$refs.toastr('Планктон успешно обновлён')
                );
            });
        },

        remove(plankton) {
            const text = `Вы действительно хотите удалить "${plankton.name}" планктон?`;

            this.$root.$refs.confirmDialog.open(text).then(() => {
                this.$store.dispatch('REMOVE_PLANKTON', {plankton});
                this.$root.$refs.toastr('Планктон успешно удалён');
            });
        },
    },
});
