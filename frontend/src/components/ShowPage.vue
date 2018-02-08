<template>
  <vue-good-table
  :columns='columns'
  :paginate='true'
  :rows='rows'>
</vue-good-table>

</template>


 
<script>
export default {
  created () {
    this.$http.get('/api/movies/view')
    .then((response) => {
      this.rows = response.data
    })
  },
  /*
    created: function () {
    var id =  this.$route.params.id
     this.$http.get(`/api/test`)
    .then((response) => {
      this.movie = response.data
    })
  },
  */
  data: function () {
    return {
      columns: [
        {
          label: '입력',
          field: 'class',
          filterable: true
        },
        {
          label: '상호',
          field: 'name',
          filterable: true
        },
        {
          label: '사업자번호',
          field: 'number'
        },
        {
          label: '옵션1',
          field: 'op1',
          filterable: true
        },
        {
          label: '옵션2',
          field: 'op2'
        },
        {
          label: '옵션3',
          field: 'op3'
        },
        {
          label: '전화번호',
          field: 'tel'
        },
        {
          label: '이메일',
          field: 'mail',
          filterable: true
        },
        {
          label: '전화여부',
          field: 'cal',
          filterable: true
        },
        {
          label: '옵션4',
          field: 'op4'
        },
        {
          label: '옵션5',
          field: 'op5'
        },
        {
          label: '옵션6',
          field: 'op6'
        },
        {
          label: '색',
          field: 'color'
        }
      ],
      rows: [
      ]
    }
  }
}
</script>

<style lang='css'>

</style>
