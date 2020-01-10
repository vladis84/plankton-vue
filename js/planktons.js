Vue.component('plankton-dialog', {
    template: `
      <div class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{title}}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="plankton-name">Название</label>
                  <input type="text" class="form-control" id="plankton-name" v-model="plankton.name">
                  <small class="form-text text-muted">Укажите имя</small>
                </div>
                <div class="form-group">
                  <label for="plankton-post">Должность</label>
                  <input type="text" class="form-control" id="plankton-post" v-model="plankton.post">
                  <small class="form-text text-muted">Укажите должность</small>
                </div>
                <div class="form-group">
                  <label for="plankton-office">Офис</label>
                  <select
                    id="plankton-office"
                    v-model="plankton.office"
                    class="form-control"
                  >
                    <option
                      v-for="office in offices"
                      v-bind:key="office.id"
                      v-bind:value="office.id"
                    >
                      {{office.name}}
                    </option>

                  </select>
                  <small class="form-text text-muted">Укажите офис</small>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Отмена</button>
              <button
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
                @click="$emit('save', plankton)"
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </div>
    `,
    data() {
        return {
            plankton: {}
        }
    },
    computed: {
        title() {
            let title = 'Добавить планктончика';

            if (this.plankton.id) {
                title = 'Изменить планктончика';
            }

            return title;
        },
        offices() {
            const offices = [
                {id: null, name: '(Не указан)'},
                ...this.$store.getters.offices.map(office => {
                    return {id: office.id, name: office.name}
                })
            ];

            return offices;
        }

    }
});

Vue.component('planktons', {
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
        <plankton-dialog ref="planktonDialog" @save="save($event)"/>
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
            this.$refs.planktonDialog.plankton = Object.assign({}, plankton);
            $(this.$refs.planktonDialog.$el).modal('show');
        },

        save(plankton) {
            this.$store.dispatch('savePlankton', {plankton});
        },

        remove(plankton) {
            this.$store.dispatch('removePlankton', {plankton});
        },
    },
});
