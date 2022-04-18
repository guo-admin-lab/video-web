<template>
    <div>
        <header-component></header-component>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import headerComponent from '../../components/headerComponent.vue'
export default {
    name: 'Layout',
    components: {headerComponent},
    mounted () {
        console.log('layout-router-params: ', this.$route.query.msg)
    }
}
</script>
