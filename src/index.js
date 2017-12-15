const Vue = require('vue/dist/vue')

class qs {
    static stringify(data = {}, addQueryPrefix = false) {
        const ret = Object.entries(data).reduce((prev, [k, v]) => {
            prev.push(`${k}=${v}`)
            return prev
        }, []).join('&')
        if(addQueryPrefix) {
            return ret ? `?${ret}` : ''
        }else {
            return ret
        }
    }
    static parse(queryString = '', ignoreQueryPrefix = false) {
        if(queryString === '') {
            return Object.create(null)
        }
        if(ignoreQueryPrefix) {
            queryString = queryString.replace('?', '')
        }
        const ret = queryString.split('&').reduce((prev, cur) => {
            const [k, v] = cur.split('=')
            prev[k] = v
            return prev
        }, {})
        return ret
    }
}

const mixin = Vue => {
    Vue.mixin({
        data () {
            return {

            }
        },
        methods: {
            $get(url = '', data = {}) {
                return fetch(`${url}${qs.stringify(data, true)}`).then(rs => rs.json())
            },
            $post(url = '', data = {}) {
                return fetch(url, {method: 'POST', body: qs.stringify(data)}).then(rs => rs.json())
            }
        }
    })
}

Vue.use(mixin)

var vm = new Vue({
    el: '#app',
    data: {
        categoryList: []
    },
    methods: {
        fetchData() {
            this.$get('https://raw.githubusercontent.com/shuoshubao/blog/master/data/db.json')
            .then(rs => {
                console.log(rs)
                this.categoryList = Object.keys(rs)
            })
        },
        removeItem(index) {
            console.log(index)
            this.categoryList.splice(index, 1)
        }
    }
})
