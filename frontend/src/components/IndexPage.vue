<template>
  <div>
        <table class="from-table">
          <tr>
            <td>
              <input v-model="sql">
              <button @click="test()">Go Test</button>
            </td>
          </tr>
            <tr>
                <td>
                    티몬 <input id="A" type="file" name="A" @change="changeFileA($event)" /> <br />
                    <input type="hidden" name="Afile" v-model="value.Afile" />
                    통판 <input id="B" type="file" name="B" @change="changeFileB($event)" /> <br />
                    <input type="hidden" name="Bfile" v-model="value.Bfile" />
                    앤비스타 <input id="C" type="file" name="C" @change="changeFileB($event)" /> <br />
                    <input type="hidden" name="Cfile" v-model="value.Cfile" />
                </td>
            </tr>
            <tr>
                <td>
                중복 검사 항목<br />
                <input type="checkbox" name="checked_1" id="checked_1" v-model="value.checked_1">
                <label for="checked_1">상호명</label> &ensp;
                <input type="checkbox" name="checked_2" id="checked_2" v-model="value.checked_2">
                <label for="checked_2">사업자 등록번호</label> &ensp;
                <input type="checkbox" name="checked_3" id="checked_3" v-model="value.checked_3">
                <label for="checked_3">전화번호</label>
                </td>
            </tr>
            <tr>
                <td>
                    기준파일<br />
                    <input type="radio" name="checked_work" id="over" value="2" v-model="value.checked_work">
                    <label for="over">중복된 업체 추출</label> <br />
                    <input type="radio" name="checked_work" id="dif" value="3" v-model="value.checked_work">
                    <label for="dif">중복되지 않은 업체만 추출</label> <br />
                </td>
            </tr>
            <tr>
                <td v-if="value.Afile && value.Bfile">
                    파일명: <input type="text" size="10" name="fileName" v-model="value.fileName">
                    <input class="btn" type="submit" value="실행" @click="sendData()"/>
                </td>
                <td v-else>1번, 2번파일을 업로드 해주세요!</td>
            </tr>
            <tr v-if="file">
                <td>
                  <button @click="result()"> 다운로드 </button>
                </td>
            </tr>
            <tr>
              <td>
                <pre>
                  {{ $data }}
                </pre>
              </td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
  created () {
    this.$http.get('/api/movies')
    .then((response) => {
      this.value = response.data
    })
  },
  name: 'hello',
  data () {
    return {
      sql: '',
      value: {},
      file: [],
      file_data: ''
    }
  },
  methods: {
    sendData: function () {
      this.value.file = null
      this.$http.post('/api/movies', {
        data: this.value
      })
      .then((response) => {
        this.file = response.data
      })
    },
    test: function () {
      this.$http.post('/api/movies/test', {
        sql: this.sql,
        hi: 'hihi'
      }
      )
    },
    changeFileA: function (event) {
      this.value.Afile = event.target.files[0].name
      console.log(event)
      var formData = new FormData()
      formData.append('tempfile', event.target.files[0])
      this.$http.post('/api/movies/up', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    },
    changeFileB: function (event) {
      this.value.Bfile = event.target.files[0].name
      var formData = new FormData()
      formData.append('tempfile', event.target.files[0])
      this.$http.post('/api/movies/up', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    },
    changeFileC: function (event) {
      this.value.Cfile = event.target.files[0].name
      var formData = new FormData()
      formData.append('tempfile', event.target.files[0])
      this.$http.post('/api/movies/up', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    },
    result: function () {
      let url = `http://121.78.217.22/uploadFile/out.xlsx`
      window.open(url, '_blank')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.form-group {
        padding: 5px;
    }

    div.form-group > * {
        padding: 5px;
    }

    div.form-group input {
        display: inline-block;
    }

    table {
    border-top: 1px solid #444444;
    border-left: 1px solid #444444;
    border-right: 1px solid #444444;
    border-collapse: collapse;
    }

    th, td {
        border-bottom: 1px solid #444444;
        padding: 10px;
        text-align: center;
    }
</style>
