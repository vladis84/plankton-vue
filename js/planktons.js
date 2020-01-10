Vue.component('planktons', {
    template: `
<div class="card-columns mt-4">
  <div 
    class="card overflow-hidden"
    v-for="plankton in planktons"
    v-bind:key="plankton.id"
  >
    <div class="row no-gutters">
      <div class="col-md-4">
        <img src="icons8-group-80.png" alt="Планктончик">
      </div>
      <div class="col-md-8" @click="edit(plankton)">
        <div class="card-body" style="cursor: pointer">
          <h4 class="card-title">{{plankton.name}}</h4>
          <p class="card-text" title="Редактировать платктон">
            
            <strong>Должность:</strong>
            {{plankton.post}}
            <br>
            <strong>Офис:</strong>
            {{officeName(plankton.office)}}
            <br>
            <strong>Адресс:</strong>
            {{officeAddress(plankton.office)}}
          </p>
        </div>        
      </div>
    </div>
  </div>
</div>
`,
    props: {
        dialog: {
            type: Object,
            required: true
        }
    },

    computed: {
        planktons() {
            return this.$store.getters.planktons;
        }
    },
    methods: {
        officeName(id) {
            const office = this.$store.getters.office(id);
            let name = '-';

            if (office) {
                name = office.name;
            }

            return name;
        },
        officeAddress(id) {
            const office = this.$store.getters.office(id);
            let address = '-';

            if (office) {
                address = office.address;
            }

            return address;
        },
        edit(plankton) {
            this.dialog.plankton = Object.assign({}, plankton);
            $(this.dialog.$el).modal('show');
        },
    }
});
