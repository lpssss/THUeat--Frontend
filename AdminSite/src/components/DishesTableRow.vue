<!--种类：Component -->
<!--功能：菜品信息表格”每行“，用户可对部分信息进行修改-->
<!--所需Components：图片库ImageGallery-->
<!--发送Emits：updateRow更新Parent中的总菜品信息-->
<template>
  <tr>
    <td class="text-left">{{ myRowData.dishID }}</td>
    <td>
      {{ myRowData.dishName }}
      <q-popup-edit
        v-model="myRowData.dishName"
        v-slot="scope"
        title="更新菜品名字"
        auto-save
      >
        <q-input
          v-model="scope.value"
          dense
          autofocus
          :rules="[
            (val) => !!val || '* 不能为空',
            (val) => val.length <= 10 || '最多10个字',
          ]"
        />
      </q-popup-edit>
    </td>
    <td>
      {{ myRowData.dishPrice }}
      <q-popup-edit
        v-model="myRowData.dishPrice"
        v-slot="scope"
        title="更新菜品价格"
        auto-save
      >
        <q-input
          v-model="scope.value"
          dense
          autofocus
          fill-mask="0"
          mask="#.##"
          reverse-fill-mask
          :rules="[(val) => val.length <= 7 || '最多6个数字']"
        />
      </q-popup-edit>
    </td>
    <td>
      {{ myRowData.dishLikes }}
    </td>
    <td>
      {{ sortedTime }}
      <q-popup-edit
        v-model="myRowData.dishAvailableTime"
        v-slot="scope"
        title="更新售卖时段"
        auto-save
      >
        <q-select
          v-model="scope.value"
          :options="$store.state.dishesDetails.stallOperationtime"
          label="请选择时段"
          multiple
          :rules="[(val) => val.length >= 1 || '* 不能为空']"
        />
      </q-popup-edit>
    </td>
    <td>
      {{ shortenIntro }}
      <strong v-if="shorten">...查看更多</strong>
      <q-popup-edit
        v-model="myRowData.dishIntro"
        v-slot="scope"
        title="更新菜品简介"
        auto-save
      >
        <q-input
          v-model="scope.value"
          dense
          autofocus
          counter
          autogrow
          type="textarea"
          :rules="[(val) => !!val || '* 不能为空']"
        />
      </q-popup-edit>
    </td>
    <td>
      <q-btn
        color="primary"
        label="查看/编辑图片"
        @click="showImageGallery = true"
      />
    </td>
    <td>
      <q-toggle
        checked-icon="check"
        color="green"
        unchecked-icon="clear"
        :model-value="Boolean(myRowData.dishStatus)"
        @update:model-value="toggleStatus"
      />
    </td>
  </tr>
  <q-dialog v-model="showImageGallery" full-width persistent>
    <q-card>
      <ImageGallery
        :my-images="myImages.dishImages"
        type="dishesDetails"
        :args="{ dishidx }"
      />
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="返回" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { reactive, ref, watch, computed } from "vue";
import { useQuasar } from "quasar";
import ImageGallery from "components/ImageGallery";
import { STAFF_API_LINKS } from "app/api-links";
import { useStore } from "vuex";

const API_LINK = STAFF_API_LINKS.dishes;

//售卖时间选项
export default {
  name: "DishesTableRow",
  components: { ImageGallery },
  props: {
    rowData: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    //showImageGallery: 控制图片库的开关
    //myRowData: 重新复制每行信息，以直接修改
    const $q = useQuasar();
    const store = useStore();
    const showImageGallery = ref(false);
    const myRowData = reactive({ ...props.rowData });
    const dishidx = computed(() => {
      return store.state.dishesDetails.dishesDetailsData.findIndex(
        (item) => item.dishID === myRowData.dishID
      );
    });
    const myImages = computed(
      () => store.state.dishesDetails.dishesImagesData[dishidx.value]
    );
    const sortedTime = computed(() => {
      if (myRowData.dishAvailableTime.length === 0) {
        return "";
      }
      if (myRowData.dishAvailableTime[0] === "自定义") {
        return myRowData.dishAvailableTime[0];
      } else {
        const itemOrder = ["早餐", "午餐", "晚餐", "宵夜"];
        let tempArr = [...myRowData.dishAvailableTime];
        tempArr.sort((a, b) => itemOrder.indexOf(a) - itemOrder.indexOf(b));
        return tempArr.join(", ");
      }
    });

    const shortenIntro = computed(() => myRowData.dishIntro.slice(0, 5));
    const shorten = computed(
      () => shortenIntro.value.length < myRowData.dishIntro.length
    );

    //输入2个数据：value为新state，evt为pointer event(这里没用到所以放"_")
    //功能：用户要调整激活状态时，会弹出确认窗口，确认后才更改激活状态
    function toggleStatus(value, _) {
      $q.dialog({
        title: "确认调整状态",
        message: "您是否确认要调整此菜品状态?",
        ok: { push: true, label: "确认" },
        cancel: { push: true, label: "取消" },
        persistent: true,
      }).onOk(() => {
        myRowData.dishStatus = value;
      });
    }
    //功能：用户一旦进行修改，则自动使用saveChanges函数更新到后端
    watch(
      () => myRowData,
      (newDetails) => {
        store.dispatch("dishesDetails/saveDetailsChanges", {
          newDetails,
          dishidx: dishidx,
        });
      },
      { deep: true }
    );
    return {
      myRowData,
      myImages,
      showImageGallery,
      toggleStatus,
      sortedTime,
      dishidx,
      shortenIntro,
      shorten,
    };
  },
};
</script>

<style scoped></style>
