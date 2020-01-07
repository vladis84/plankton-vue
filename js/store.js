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
            return (id) => state.offices.find(office => office.id === id);
        }
    },
    mutations: {
        SET_STORE(state, data) {
            state.offices = data.offices;
            state.planktons = data.planktons;
        },
        SAVE_OFFICE(state, office) {
            const oldOffice = state.offices.find(_office => _office.id === office.id);

            if (oldOffice) {
                Object.assign(oldOffice, office);
            }
            else {
                office.id = state.offices.length + 1;
                state.offices.push(office);
            }

        },
    },
    actions: {
        initStore ({commit}) {
            $.get('data.json', function (data) {
                commit('SET_STORE', data);
            });
        },
        saveOffice({commit}, {office}) {
            commit('SAVE_OFFICE', office);
        }
    }
});
