module.exports = Vue => {
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
