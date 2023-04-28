<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-show="StartNumAndEndNum.start > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>

    <button v-show="StartNumAndEndNum.start > 2">···</button>
    <button
      v-for="(page, index) in StartNumAndEndNum.end"
      :key="index"
      v-show="page >= StartNumAndEndNum.start"
      @click="$emit('getPageNo', page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>

    <button v-show="StartNumAndEndNum.end < totalPage - 1">···</button>
    <button
      v-show="StartNumAndEndNum.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="totalPage == pageNo"
      @click="$emit('getPageNo', pageNo1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }}条</button>
  </div>
</template>

<script>
export default {
  props: ["pageNo", "pageSize", "total", "continues"],
  name: "Pagination",
  computed: {
    //页数
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    //计算出连续的页码
    StartNumAndEndNum() {
      //解构赋值 拿出来 不用 this.方便些
      const { continues, pageNo, totalPage } = this;
      let end = 0,
        start = 0;
      // 连续的页码数是continues=5 如果totalPage不够5页需要特殊处理
      if (totalPage < continues) {
        start = 1;
        end = totalPage;
      } else {
        //正常现象 totalPage>continues 因为要写通用分页器 所以不能写死了
        start = pageNo - Math.floor(continues / 2);
        end = pageNo + Math.floor(continues / 2);
        //纠正不正常现象 比如start =0 或负数
        if (start < 1) {
          start = 1;
          end = continues;
        }
        if (end > totalPage) {
          end = totalPage;
          start = totalPage - continues + 1;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  .active {
    background-color: skyblue;
  }
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
