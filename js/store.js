const store = new Vuex.Store({
    state: {
        offices: [],
        planktons: [],
    },
    getters: {
        planktons(state) {
            return state.planktons;
        },
        offices(state) {
            return state.offices;
        },
        office(state) {
            return (id) => state.offices.find(office => office.id == id);
        }
    },
    mutations: {
        SET_STORE(state, data) {
            state.offices = data.offices;
            state.planktons = data.planktons;
        }
    },
    actions: {
        initStore ({commit}) {
            axios.get('data.json')
                .then((response) => {
                    commit('SET_STORE', response.data);
                })
        }
    }
});
