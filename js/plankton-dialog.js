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
                @click="save()"
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
            plankton: {},
            resolve: null,
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
            return [
                {id: null, name: '(Не указан)'},
                ...this.$store.getters.offices.map(office => {
                    return {id: office.id, name: office.name}
                })
            ];
        }
    },

    methods: {
        save() {
            this.resolve(this.plankton);
        },
        open(plankton) {
            this.plankton = Object.assign({}, plankton);

            $(this.$el).modal('show');

            return new Promise( (resolve, reject) => {
                this.resolve = resolve
            } );

        }
    }
});
