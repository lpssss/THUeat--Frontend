<template>
  <div>
    <div>
      <StallPictureSection v-bind="stallpicture.picture"/>
    </div>
    <div>
      <StallIntroSection v-bind="stallintro.intro"/>
    </div>
    <div class="q-pa-md">
    <div class="q-gutter-y-md" style="width:100%">
        <q-tabs
          v-model="tab"
          dense
          class="text-purple-3"
          active-color="purple-5"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="dish" label="菜品" />
          <q-tab name="comments" label="评价" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="dish">
            <div class="text-h6">推荐菜品</div>
            <div class="q-pa-md row items-start q-gutter-md justify-center col-md-4">
              <DishCardSection
                v-for="dish in dishes"
                v-bind="dish"
                :key="dish.dishName"
              />
            </div>
            <Pagination/>
          </q-tab-panel>

          <q-tab-panel name="comments">
            <div class="text-h6">用餐者评价</div>
            <div class="q-pa-md row items-start q-gutter-md justify-center col-md-4">
              <JudgeCardSection
                v-for="judgement in judgements"
                v-bind="judgement"
                :key="judgement.title"
              />
            </div>
            <Pagination/>
          </q-tab-panel>
        </q-tab-panels>
    </div>
    </div>
  </div>
  
</template>

<script>
import{ref, defineComponent } from 'vue';
import StallPictureSection from  "components/StallPage/StallPictureSection";
import StallIntroSection from "components/StallPage/StallIntroSection";
import DishCardSection from "components/HomePage/DishCardSection";
import JudgeCardSection from "components/StallPage/JudgeCardSection";
import Pagination from '../components/StallPage/Pagination.vue';

const Stallpicture = {
  picture:{
    stallName: "广东风味",
    imgSrc: "https://cdn.quasar.dev/img/parallax2.jpg"
  }
};

const Stallintro = {
  intro: {
    content:"广东风味特点是食用方便，蒸熟、切片均可，是下酒佳肴；如果炒着吃，味道更好。广东的美食大多不是辣味的。而广东人最喜欢吃饭前和一碗汤，才吃饭。其中白切鸡是必不可缺的在饭桌上。",
    score: 4,
    scoreAmount: 30,
  }
}
const judgements = [
  {
    content: "很好吃，就是每次中午下课后排队要排很久，有时候刚到食堂就发现这道菜已经卖完了。这种受欢迎的菜品可以多做一些。",
    title: "小明",
    subhead: "subhead1",
    imgSrc: "https://cdn.quasar.dev/img/avatar.png",
    imgSrc2: "https://cdn.quasar.dev/img/parallax2.jpg",
  },
  {
    content: "菜品味道不错，分量很足，如果能再淡一些就更好了。",
    title: "小红",
    subhead: "subhead2",
    imgSrc: "https://cdn.quasar.dev/img/avatar.png",
    imgSrc2: "https://cdn.quasar.dev/img/parallax2.jpg",
  },
  {
    content: "味道不错，就是有点凉了，冬天希望能吃到热乎乎的饭菜。",
    title: "小亮",
    subhead: "subhead3",
    imgSrc: "https://cdn.quasar.dev/img/avatar.png",
    imgSrc2: "https://cdn.quasar.dev/img/parallax2.jpg",
  }
]
const dishes = [
  {
    dishName: "宫保鸡丁",
    canteenName: "清芬园",
    thumb: 321,
    comment: "宫保鸡丁（Kung Pao Chicken），是一道闻名中外的特色传统名菜。鲁菜、川菜、贵州菜中都有收录，原料、做法有差别。 宫保鸡丁选用鸡肉为主料，佐以花生米、辣椒等辅料烹制而成。 红而不辣、辣而不猛、香辣味浓、肉质滑脆。由于其入口鲜辣，鸡肉的鲜嫩配合花生的香脆。",
    imgSrc: "https://cdn.quasar.dev/img/avatar.png",
  },
  {
    dishName: "芝士辣白菜汤泡饭",
    canteenName: "桃李园地下",
    thumb: 323,
    comment: "太好吃了太好吃了太好吃了太好吃了太好吃了太好吃了！",
    imgSrc: "https://cdn.quasar.dev/img/avatar.png",
  },
  {
    dishName: "四喜丸子",
    canteenName: "澜园",
    thumb: 31,
    comment: "四喜丸子，属于鲁菜。四喜丸子是旧时人们为庆贺和祈求人生的四大喜事：久旱逢甘雨；他乡遇故知；洞房花烛夜；金榜题名时而制作的菜肴，之所以做成圆形状是取吉庆团圆美满之意。由四个色和味形俱佳的肉丸组成，寓人生福、禄、寿、喜四大喜事。以取其吉祥之意。寓意：福、禄、寿、喜 Pao Chicken），是一道闻名中外的特色传统名菜。鲁菜、川菜、贵州菜中都有收录，原料、做法有差别。 宫保鸡丁选用鸡肉为主料，佐以花生米、辣椒等辅料烹制而成。 红而不辣、辣而不猛、香辣味浓、肉质滑脆。由于其入口鲜辣，鸡肉的鲜嫩配合花生的香脆。",
    imgSrc: "https://cdn.quasar.dev/img/avatar.png",
  },
]

export default defineComponent({
  name: "Stall",
  components: { 
    StallPictureSection,
    StallIntroSection,
    DishCardSection,
    JudgeCardSection,
    Pagination
  },
  data(){
    return {
      tab: 'dish',
    }
  },
  setup (){
    return {
      stallpicture: Stallpicture,
      stallintro: Stallintro,
      dishes:dishes,
      judgements:judgements,

    }
  }
})
</script>

<style scoped>

</style>
