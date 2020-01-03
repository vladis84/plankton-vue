new Vue({
    el: "#app",
    store,
    created() {
        this.$store.dispatch('initStore');
    },
    computed: {
        offices() {
            return this.$store.getters.offices;
        },
        json() {
            return this.$store.state;
        }
    }
});
