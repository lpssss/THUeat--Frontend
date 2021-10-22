<template>
  <q-page >
    <div class="q-pa-md">
    <q-carousel
      arrows
      animated
      v-model="slide"
      height="400px"
    >
      <q-carousel-slide name="first" img-src="../../public/yangrouchuan.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h4">新品广告</div>
          <div class="text-subtitle1">烤羊肉串是新疆人喜爱的风味小吃，肉质鲜嫩，味咸辣，广受人们欢迎。</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="second" img-src="../../public/xiaohuoguo.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h4">特色推荐</div>
          <div class="text-subtitle1">
            清青小火锅自开业以来便受到广大师生的青睐，并被学校评为“2015年度后勤优质服务项目”
          </div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="third" img-src="../../public/tinghuo.webp">
        <div class="absolute-bottom custom-caption">
          <div class="text-h4">食堂营业变更</div>
          <div class="text-subtitle1">2021年寒假食堂停伙安排</div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>

    <div class="q-pa-md q-gutter-sm">
      <q-banner inline-actions class="text-black bg-grey-3">
          高分档口推荐  
          <template v-slot:action>
          <q-btn flat color="black" label="换一批" />
        </template>
      </q-banner>
    </div>

    <div class="q-pa-md row items-start q-gutter-md">

      <q-card class="my-card">
        <q-img src="../../public/qingfen.jpg" alt="东北风味" class="q-card-img"/>

        <q-card-section class="q-pb-none">
          <div class="text-h6">东北风味</div>
          <div class="text-subtitle2">清芬园</div>
        </q-card-section>

        <q-card-section>
          <div class="ellipsis-2-lines" >
            这是一条精选的很长的评价这是一条精选的很长的评价这是一条精选的很长的评价这是一条精选的很长的评价这是一条精选的很长的评价
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="q-px-none">
            <div class="q-gutter-y-md row">
              <q-rating
                v-model="ratingModel1"
                size="1.5em"
                color="primary"
                icon="star_border"
                icon-selected="star"
              />
              <span class="text-caption text-grey q-ml-sm"> 4.2 (328)</span>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <q-card class="my-card">
        <q-img src="../../public/guanchou.jpg" alt="川渝风味" class="q-card-img"/>

        <q-card-section class="q-pb-none">
          <div class="text-h6">川渝风味</div>
          <div class="text-subtitle2">观畴园</div>
        </q-card-section>

        <q-card-section>
          <div class="ellipsis-2-lines" >
            如果暂无用户评价，这是一条默认的档口描述。如果暂无用户评价，这是一条默认的档口描述
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="q-px-none">
            <div class="q-gutter-y-md row">
              <q-rating
                v-model="ratingModel2"
                size="1.5em"
                color="primary"
                icon="star_border"
                icon-selected="star"
              />
              <span class="text-caption text-grey q-ml-sm"> 4.8 (420)</span>
            </div>
          </div>
        </q-card-section>
      </q-card>
    
    </div>

    <div class="q-pa-md q-gutter-sm">
      <q-banner inline-actions class="text-black bg-grey-3">
          高点赞菜品     
          <template v-slot:action>
          <q-btn flat color="black" label="换一批" />
        </template>
      </q-banner>
    </div>

    <div class="q-pa-md row items-start q-gutter-md">

      <q-card class="my-card">
        <q-img src="../../public/gongbaojiding.jpg" alt="宫保鸡丁" class="q-card-img"/>

        <q-card-section class="q-pb-none">
          <div class="text-h6">宫保鸡丁</div>
          <div class="text-subtitle2">清芬园</div>
        </q-card-section>

        <q-card-section>
          <div class="ellipsis-2-lines" >
            宫保鸡丁（Kung Pao Chicken），是一道闻名中外的特色传统名菜。鲁菜、川菜、贵州菜中都有收录，原料、做法有差别。 宫保鸡丁选用鸡肉为主料，佐以花生米、辣椒等辅料烹制而成。 红而不辣、辣而不猛、香辣味浓、肉质滑脆。由于其入口鲜辣，鸡肉的鲜嫩配合花生的香脆。
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-btn size="sm" falt round color="primary" icon="thumb_up" />
          <span class="text-caption text-grey"> 321</span>
        </q-card-section>
      </q-card>

      <q-card class="my-card">
        <q-img src="../../public/zhishi.jpg" alt="芝士辣白菜汤泡饭" class="q-card-img"/>

        <q-card-section class="q-pb-none">
          <div class="text-h6">芝士辣白菜汤泡饭</div>
          <div class="text-subtitle2">桃李园地下</div>
        </q-card-section>

        <q-card-section>
          <div class="ellipsis-2-lines" >
            太好吃了太好吃了太好吃了太好吃了太好吃了太好吃了！
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-btn size="sm" falt round color="primary" icon="thumb_up" />
          <span class="text-caption text-grey"> 123</span>
        </q-card-section>
      </q-card>
    
      <q-card class="my-card">
        <q-img src="../../public/sixiwanzi.jpg" alt="四喜丸子" class="q-card-img"/>

        <q-card-section class="q-pb-none">
          <div class="text-h6">四喜丸子</div>
          <div class="text-subtitle2">澜园</div>
        </q-card-section>

        <q-card-section>
          <div class="ellipsis-2-lines" >
            四喜丸子，属于鲁菜。四喜丸子是旧时人们为庆贺和祈求人生的四大喜事：久旱逢甘雨；他乡遇故知；洞房花烛夜；金榜题名时而制作的菜肴，之所以做成圆形状是取吉庆团圆美满之意。由四个色和味形俱佳的肉丸组成，寓人生福、禄、寿、喜四大喜事。以取其吉祥之意。
寓意：福、禄、寿、喜
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-btn size="sm" falt round color="primary" icon="thumb_up" />
          <span class="text-caption text-grey"> 200</span>
        </q-card-section>
      </q-card>    
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
export default { 
  setup () {
    return {
      slide: ref('first'),
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      ratingModel1: ref(4),
      ratingModel2: ref(5)
    }
  }
}
</script>

<style lang="scss" scoped>


</style>