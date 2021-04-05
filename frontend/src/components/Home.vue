<template>
  <div>
    <v-card class="mx-auto">
      <v-container fluid>
        <v-row dense>
          <v-col cols="12" sm="10" md="10">
            <v-file-input
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .csv"
              v-model="files"
              color="deep-purple accent-4"
              counter
              label="File input"
              placeholder="Select your files"
              prepend-icon="mdi-paperclip"
              outlined
              :show-size="1000"
            >
            </v-file-input>
          </v-col>
          <v-col>
            <v-btn class="ma-2" :disabled="disabled" color="primary" v-on:click="submitFile()" > Upload </v-btn>
          </v-col>
          <v-col>
            <v-btn class="ma-2" color="error"  v-on:click="clear()" > clear </v-btn>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12" sm="12" md="12">
            <v-data-table
            style="min-height: 250px;" 
              :headers="headers"
              :items="rows"
              :items-per-page="10"
              class="elevation-1"
            ></v-data-table>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-snackbar
      v-model="snackbar"
      timeout="1000"
      :color="color"
      outlined
    >
      {{ response_message }}

      <template v-slot:action="{ attrs }">
        <v-btn
          :color="color"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  data () {
    return {
      files: [],
      headers: [
      ],
      rows: [
      ],
      disabled : false,
      snackbar : false,
      response_message: '',
      color : 'success'
    }
  },
   methods: {
      async submitFile() {
        this.disabled = true;
        const formData = new FormData();
        formData.append("file", this.files);
        const rawResponse = await fetch(
          process.env.VUE_APP_BASE_URL + "excelReader",
          {
            method: "POST",
            body: formData
          }
        );
        const response = await rawResponse.json();
        this.snackbar = true;
        if (response.status == true) {
          this.headers = [];
          for (var key in response.data[0]) {
            this.headers.push({ text: key.toUpperCase(), value: key })
          }
          if(this.headers.length !== 0){
            this.rows = response.data;
            this.response_message = response.message;
            this.color = 'success';
          }else{
            this.response_message = 'Excel is not table format';
            this.color = 'red';
            this.headers = [];
            this.rows = [];
          }
        }else{
          this.response_message = response.message;
          this.color = 'red';
          this.headers = [];
          this.rows = [];
        }
        this.disabled = false;
      },
      clear(){
        this.files = [];
        this.headers = [];
        this.rows = [];
      }
   }
}
</script>
