Vue.component('confirm-dialog', {
    template: `
      <div class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Подтвердите удаление</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              {{text}}
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Отмена</button>
              <button
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
                @click="ok()"
              >
                Подтверждаю
              </button>
            </div>
          </div>
        </div>
      </div>
    `,
    data() {
        return {
            text: '',
            resolve: null,
        }
    },
    methods: {

        open(text) {
            $(this.$el).modal('show');

            this.text = text;

            return new Promise((resolve, reject) => {
                this.resolve = resolve;
            });
        },

        ok() {
            this.resolve();
        }
    }
});
