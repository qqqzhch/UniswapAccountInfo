<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Table :columns="columns1" :data="data1"></Table>
  </div>
</template>

<script>
// @ is an alias to /src
import { getlist } from './tokenList'

export default {
  name: 'Home',
  components: {

  },
  data () {
    return {
      columns1: [
        {
          title: 'Token',
          key: 'name'
        },
        {
          title: 'balance',
          key: 'age'
        },
        {
          title: 'Address',
          key: 'address'
        }
      ],
      data1: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        }
      ]
    }
  },
  async mounted () {
    var data = await getlist()
    console.log(data)
  }
}
</script>
