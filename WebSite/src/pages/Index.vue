<template>
  <q-page >
    <div class="q-pa-md">
      <q-carousel
        arrows
        animated
        v-model="slide"
        height="400px"
      >
        <HomePageAnnouncementSection
          v-for="announcement in announcements"
          v-bind="announcement"
          :key="announcement.name"
        />
      </q-carousel>
    </div>

    <div class="q-pa-md q-gutter-sm">
      <BannerSection v-bind="homePageBanner.stall"/>
    </div>

    <div class="q-pa-md row items-start q-gutter-md">
      <StallCardSection
        v-for="stall in stalls"
        v-bind="stall"
        :key="stall.stallName"
      />
    </div>

    <div class="q-pa-md q-gutter-sm">
      <BannerSection v-bind="homePageBanner.dish"/>
    </div>

    <div class="q-pa-md row items-start q-gutter-md">
      <DishCardSection
        v-for="dish in dishs"
        v-bind="dish"
        :key="dish.dishName"
      />   
    </div>
  </q-page>
</template>

<script>
import { ref, defineComponent } from 'vue'
import axios from "axios";
import HomePageAnnouncementSection from "components/HomePage/HomePageAnnouncementSection";
import DishCardSection from "components/HomePage/DishCardSection";
import StallCardSection from "components/HomePage/StallCardSection";
import BannerSection from "components/Layout/BannerSection";

const announcements = [
  {
    name: "first",
    title: "新品广告",
    content: "烤羊肉串是新疆人喜爱的风味小吃，肉质鲜嫩，味咸辣，广受人们欢迎。",
    //imgSrc: "pictures/yangrouchuan.jpg"
    imgSrc: "https://cdn.quasar.dev/img/avatar.png"
  },
  {
    name: "second",
    title: "特色推荐",
    content: "清青小火锅自开业以来便受到广大师生的青睐，并被学校评为“2015年度后勤优质服务项目",
    //imgSrc: "pictures/xiaohuoguo.jpg"
    imgSrc: "https://cdn.quasar.dev/img/avatar.png"
  },
  {
    name: "third",
    title: "食堂营业变更",
    content: "2021年寒假食堂停伙安排",
    //imgSrc: "pictures/tinghuo.webp"
    imgSrc: "https://cdn.quasar.dev/img/avatar.png"
  },
];

const homePageBanner = {
  stall:{
    content: "高分档口推荐",
    change: true
  },
  dish:{
    content: "高点赞菜品",
    change: true
  }
};

const stalls = [
  {
    stallName: "东北风味",
    canteenName: "清芬园",
    score: 4.8,
    scoreAmount: 233,
    comment: "这是一条精选的很长的评价这是一条精选的很长的评价这是一条精选的很长的评价这是一条精选的很长的评价这是一条精选的很长的评价",
    imgSrc: "https://cdn.quasar.dev/img/avatar.png",
  },
  {
    stallName: "川渝风味",
    canteenName: "观畴",
    score: 3.5,
    scoreAmount: 356,
    comment: "如果暂无用户评价，这是一条默认的档口描述。如果暂无用户评价，这是一条默认的档口描述",
    imgSrc: "https://cdn.quasar.dev/img/avatar.png",
  }
];

const dishs = [
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
  name: "Index",
  components: {
    HomePageAnnouncementSection,
    BannerSection,
    DishCardSection,
    StallCardSection,
  },
  setup () {
    return {
      slide: ref('first'),
      announcements: announcements,
      homePageBanner: homePageBanner,
      stalls: stalls,
      dishs: dishs,
    }
  }
})

</script>

<style lang="scss" scoped>


</style>