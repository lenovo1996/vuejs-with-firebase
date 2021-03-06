// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import firebase from './firebase';
import Vuefire from 'vuefire';
import Vuebar from 'vuebar';

Vue.use(Vuebar);

Vue.config.productionTip = false;

Vue.use(Vuefire);

let app;

firebase.auth().onAuthStateChanged((user) => {
    /* eslint-disable no-new */
    if (!app) {
        app = new Vue({
            el: '#app',
            router,
            components: {App},
            template: '<App/>',
            filters: {
                dateFilter(value) {
                    if (value) {
                        return moment.unix(value).format(' h:mm a')
                    }
                }
            },
        });
    }
});