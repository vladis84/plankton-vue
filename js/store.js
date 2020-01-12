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

        INIT_STORE(state, data) {
            state.offices = data.offices;
            state.planktons = data.planktons;
        },

        SAVE_OFFICE(state, office) {
            const oldOffice = state.offices.find(_office => _office.id === office.id);

            if (oldOffice) {
                Object.assign(oldOffice, office);
            } else {
                office.id = state.offices.length + 1;
                state.offices.push(office);
            }

        },

        SAVE_PLANKTON(state, newPlankton) {
            const oldPlankton = state.planktons.find(plankton => plankton.id === newPlankton.id);

            if (oldPlankton) {
                Object.assign(oldPlankton, newPlankton);
            } else {
                newPlankton.id = state.planktons.length + 1;
                state.planktons.push(newPlankton);
            }
        },

        REMOVE_OFFICE(state, office) {
            const key = state.offices.findIndex(_office => _office.id === office.id);

            state.offices.splice(key, 1);
        },

        REMOVE_PLANKTON(state, office) {
            const key = state.planktons.findIndex(_office => _office.id === office.id);

            state.planktons.splice(key, 1);
        },
    },
    actions: {

        INIT_STORE({commit}) {
            $.get('data.json', function (data) {
                commit('INIT_STORE', data);
            });
        },

        SAVE_OFFICE({commit}, {office}) {
            commit('SAVE_OFFICE', office);
        },

        SAVE_PLANKTON({commit}, {plankton}) {
            return new Promise(function (resolve, reject) {
                setTimeout(() => {
                    commit('SAVE_PLANKTON', plankton);
                    resolve();
                }, 1000);
            });
        },

        REMOVE_OFFICE({commit}, {office}) {
            commit('REMOVE_OFFICE', office);
        },

        REMOVE_PLANKTON({commit}, {plankton}) {
            commit('REMOVE_PLANKTON', plankton);
        }
    }
});
