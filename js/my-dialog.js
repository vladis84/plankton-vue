Vue.component('my-dialog', {
    template: `
<b-modal
  :title="title"
  v-model="show"
  @bv::modal::hide="close"
>
  <b-form>
    <b-form-group v-for="(field, key) in fields"
      :label="field.title"
      :label-for="field.name"
      :description="field.description"
      :key="key"
    >
      <b-form-input
        :id="field.name"
        type="text"
        required
        v-model="field.value"
      >
      </b-form-input>
    </b-form-group>
  </b-form>
  <template v-slot:modal-footer>
    <div class="float-right">
      <b-button
        variant="secondary"
        class="mr-2"
        v-on:click="close"
      >
        Отмена
      </b-button>
      <b-button
        variant="primary"
        v-on:click="save"
      >
        Сохранить
      </b-button>
    </div>
  </template>
</b-modal>
`,
    props: {
        show: {
            type: Boolean,
            required: true
        },
        title: {
            type: String,
            required: true,
        },
        fields: {
            type: Array,
            required: true
        }
    },
    methods: {
        close() {
            this.$emit('form-close');
        },
        save() {
            this.$emit('form-close')
        }
    }
});
