<template>
  <div class="fdcFunction">
    <h3>1. ID/KTP</h3>
    <Row class="row-padd">
      <Col span="5">
        <Input v-model="idOrKtp" placeholder="15-16 digit" :maxlength="16" minlength="15"></Input>
      </Col>
    </Row>
    <h3>&nbsp;&nbsp;&nbsp;&nbsp;Reason</h3>
    <Row class="row-padd">
      <Col span="5">
        <Select v-model="selectedReason" style="width:300px">
          <Option v-for="item in reasonList" :value="item.key" :key="item.key">{{ item.value }}</Option>
        </Select>
      </Col>
    </Row>
    <Row class="row-padd">
      <Col span="5">
        <Button type="primary" @click="handleGetInfo">Submit</Button>
      </Col>
    </Row>
    <div class="result">
      <div class="commonResult">
        <div class="commontResultItem" v-for="(value, key) in commonReusltData" :key="key">
          <span class="commontResultItemLab">{{key}}:</span> &nbsp;
          <span class="commontResultItemVal">{{value}}</span>
        </div>
      </div>
      <div class="tabResult">
        <Table height="300" :columns="columns" :data="tableResultData"></Table>
      </div>
    </div>
    <h3>2. ZIP passWord</h3>
    <Row class="row-padd">
      <Col span="5">
        <Button type="primary" @click="handleZIPPassword">Submit</Button>
      </Col>
    </Row>
    <Row class="row-padd">
      <Col span="5">
        <span class="passwordResult">{{passwordResult}}</span>
      </Col>
    </Row>
  </div>
</template>

<script>
import store from "../../store/index";
import { mapState } from "vuex";
import moment from "moment";
import localStorage from "../../services/localStorage.service";
import fdcFunctionApi from "../../services/api/fdcFunction.service";
export default {
  data() {
    return {
      idOrKtp: "",
      selectedReason: 1,
      reasonList: [
        {
          key: 1,
          value: "1：new loan reason"
        },
        {
          key: 2,
          value: "2：inquiring your existing customer."
        }
      ],
      commonReusltData: [],
      tableResultData: [],
      columns: [
        {
          title: "Id Penyelenggara",
          key: "id_penyelenggara",
          width: 150
        },
        {
          title: "Nama Borrower",
          key: "nama_borrower",
          width: 150
        },
        {
          title: "No Identitas",
          key: "no_identitas",
          width: 150
        },
        {
          title: "No NPWP",
          key: "no_npwp",
          width: 150
        },
        {
          title: "Tgl Perjanjian Borrower",
          key: "tgl_perjanjian_borrower",
          width: 150
        },
        {
          title: "Tgl Penyaluran Dana",
          key: "tgl_penyaluran_dana",
          width: 150
        },
        {
          title: "Nilai Pendanaan",
          key: "nilai_pendanaan",
          width: 150
        },
        {
          title: "Tgl Pelaporan Data",
          key: "tgl_pelaporan_data",
          width: 150
        },
        {
          title: "Sisa Pinjaman Berjalan",
          key: "sisa_pinjaman_berjalan",
          width: 150
        },
        {
          title: "Tgl Jatuh Tempo Pinjaman",
          key: "tgl_jatuh_tempo_pinjaman",
          width: 150
        },
        {
          title: "DPD Terakhir",
          key: "dpd_terakhir",
          width: 150
        },
        {
          title: "DPD Max",
          key: "dpd_max",
          width: 150
        },
        {
          title: "Jenis Pengguna(ket)",
          key: "jenis_pengguna_ket",
          width: 150
        },
        {
          title: "Kualitas Pinjaman(ket)",
          key: "kualitas_pinjaman_ket",
          width: 150
        },
        {
          title: "Status Pinjaman",
          key: "status_pinjaman_ket",
          width: 150
        }
      ],
      passwordResult: '',
      uiDisplaySource: {
        dataText: {}
      }
    };
  },
  methods: {
    changeLanguage() {
      this.$i18n.locale = this.language;
      this.uiDisplaySource = this.$i18n.messages[
        this.$i18n.locale
      ].message.functions;
      setTimeout(() => {
        this.columns.forEach((item, j) => {
          item.title = this.uiDisplaySource.columnsTitle[j]; //表头翻译
        });
      }, 100);
    },
    //时间格式化
    timeFormat(time) {
      return moment(time).format("YYYY-MM-DD HH:mm:ss");
    },
    handleGetInfo() {
      if (!/(^\d{15,16}$)/.test(Number(this.idOrKtp))) {
        this.$Notice.error({ desc: "Silakan isi 15-16 digit" });
        return;
      }
      fdcFunctionApi
        .getInfo({ id: this.idOrKtp, reason: this.selectedReason })
        .then(res => {
          let _data = JSON.parse(JSON.stringify(res));
          delete _data.pinjaman;
          this.commonReusltData = _data;

          this.tableResultData = res.pinjaman || [];

          this.$Notice.success({ desc: "Successed!" });
        });
    },
    handleZIPPassword(){
        fdcFunctionApi.zipPassword().then(res => {
            this.passwordResult = res
        })
    }
  },
  computed: {
    ...mapState({
      language: state => state.module.language
    })
  },
  watch: {
    // language() {
    //   this.changeLanguage();
    // }
  },
  mounted() {},
  created() {
    //this.changeLanguage()
  }
};
</script>
<style lang="less" scoped>
.fdcFunction {
  padding: 20px;
  h3 {
    margin-top: 20px;
  }
  .row-padd {
    padding: 10px;
    .repaycodelist {
      margin-bottom: 10px !important;
    }
  }
  .input-w {
    width: 300px;
    display: inline-block;
  }
  .result-area {
    width: 300px;
    height: 30px;
    line-height: 30px;
    display: inline-block;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding-left: 10px;
    margin-left: 15px;
  }
  .result {
    .commonResult {
      margin: 20px 0 0 15px;
      .commontResultItem {
        margin-bottom: 5px;
        .commontResultItemLab {
          display: inline-block;
          width: 120px;
          font-size: 14px;
          font-weight: 600;
          text-align: left;
        }
        .commontResultItemVal {
        }
      }
    }
    .tabResult {
      margin-top: 20px;
    }
  }
}
</style>
<style lang='less'>
.fdcFunction {
  .ivu-input {
    width: 300px;
  }
}
</style>