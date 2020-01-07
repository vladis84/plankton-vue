Vue.component('office-dialog', {
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
                  <label for="office-name">Название</label>
                  <input type="text" class="form-control" id="office-name" v-model="office.name">
                  <small class="form-text text-muted">Укажите название офиса</small>
                </div>
                <div class="form-group">
                  <label for="office-address">Адрес</label>
                  <input type="text" class="form-control" id="office-address" v-model="office.address">
                  <small class="form-text text-muted">Укажите адрес офиса</small>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Отмена</button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" @click="$emit('save', office)">Сохранить</button>
            </div>
          </div>
        </div>
      </div>
    `,
    data() {
        return {
            office: {}
        }
    },
    computed: {
        title() {
            let title = 'Добавить офис';

            if (this.office.id) {
                title = 'Изменить офис';
            }

            return title;
        }
    }
});
Vue.component('offices', {
    template: `
      <div class="card mt-4">
        <div class="card-header">
          Таблица офисов для планктончиков
          <div class="float-right">
            <button 
              type="button" 
              class="btn btn-primary" 
              @click="edit({name:'Новый офис', address: 'Новый адрес'})"
            >
              Добавить
            </button>
          </div>
        </div>
        <table class="table table-striped table-hover">
          <thead>
          <tr>
            <th>#</th>
            <th>Название</th>
            <th>Адрес</th>
            <th>Управление</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in items" v-bind:key="item.id">
            <td>{{item.id}}</td>
            <td>{{item.name}}</td>
            <td>{{item.address}}</td>
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
              >
                Удалить
              </button>
            </td>
          </tr>
          </tbody>
        </table>
        <office-dialog ref="officeDialog" @save="save($event)"/>
      </div>`,

    computed: {
        items() {
            return this.$store.getters.offices;
        },
        officeDialog() {
            return this.$refs.officeDialog;
        }
    },

    methods: {
        edit(office) {
            this.$refs.officeDialog.office = Object.assign({}, office);
            $(this.$refs.officeDialog.$el).modal('show');
        },
        save(office) {
            this.$store.dispatch('saveOffice', {office});
        },
    }
});
