import constructFormData from "src/store/utils/constructFormData";
import { staffapi } from "boot/axios";
import { Notify } from "quasar";
import { STAFF_API_LINKS } from "app/api-links";
const API_LINK = STAFF_API_LINKS.dishes;

//pending createDish
const dishesDetails = {
  namespaced: true,
  state: {
    dishesDetailsData: [],
    dishesImagesData: [],
  },
  mutations: {
    initialize(state, { details, images }) {
      state.dishesDetailsData = [...details];
      state.dishesImagesData = [...images];
    },
    updateDishDetails(state, { details, dishidx }) {
      state.dishesDetailsData[dishidx] = details;
    },
    hideImage(state, { targetImg, dishidx }) {
      const idx = state.dishesImagesData[dishidx].dishImages.indexOf(targetImg); //在目标dish中的images找寻目标Image
      state.dishesImagesData[dishidx].dishImages.splice(idx, 1);
    },
    addImages(state, { images, dishidx }) {
      images.forEach((item) =>
        state.dishesImagesData[dishidx].dishImages.push(item)
      );
    },
    createDish(state, { dishImgs, dishDetails }) {
      state.dishesDetailsData.push(dishDetails);
      state.dishesImagesData.push(dishImgs);
    },
  },
  actions: {
    saveDetailsChanges({ state, dispatch }, { newDetails, dishidx }) {
      const message = {
        success: "修改菜品信息成功",
        error: "修改菜品信息失败，请刷新页面重试",
      };
      dispatch("postUpdatedData", {
        nDetails: newDetails,
        dImage: [],
        nImage: [],
        message: message,
        dishidx: dishidx,
        dishID: newDetails.dishID,
        type: "edit-details",
      });
    },
    saveImagesChanges(
      { state, dispatch },
      { deleteImages, newImages, dishidx }
    ) {
      console.log(deleteImages);
      console.log(newImages);
      const message = {
        success: "编辑图片成功",
        error: "编辑图片失败，请刷新页面重试",
      };
      dispatch("postUpdatedData", {
        nDetails: state.dishesDetailsData[dishidx],
        dImage: deleteImages,
        nImage: newImages,
        message: message,
        dishidx: dishidx,
        dishID: state.dishesDetailsData[dishidx].dishID,
        type: "edit-images",
      });
    },
    //输入1个数据：需要POST去后端的档口信息（不包括上传和删除的图片），Object
    //输出1个数据：后端的回应，Object
    //功能：POST 数据去后端
    async postUpdatedData(
      { commit },
      { nDetails, dImage, nImage, message, dishidx, dishID, type }
    ) {
      const formData = constructFormData(
        nDetails,
        dImage,
        nImage,
        "dishImages"
      );
      try {
        const response = await staffapi.post(API_LINK + "/" + dishID, formData);
        if (response.data.code === 200) {
          Notify.create({
            type: "success",
            message: message.success,
          });
          if (type === "edit-details") {
            commit("updateDishDetails", { details: nDetails, dishidx });
          } else if (type === "edit-images") {
            if (response.data.data.dishImages.length !== 0) {
              commit("addImages", {
                images: response.data.data.dishImages,
                dishidx,
              });
            }
          }
        } else {
          Notify.create({
            type: "error",
            message: message.error,
          });
        }
      } catch (err) {
        Notify.create({
          type: "error",
          message: message.error,
        });
      }
    },
    async postCreatedData({ commit }, { nDetails, nImage }) {
      const formData = constructFormData(
        nDetails,
        null,
        nImage,
        "dishImages",
        true
      );
      try {
        const response = await staffapi.post(API_LINK, formData);
        if (response.data.code === 200) {
          Notify.create({
            type: "success",
            message: "创建菜品成功",
          });
          const { dishImages, ...dishDetails } = response.data.data;
          commit("createDish", {
            dishImgs: { dishImages, dishID: dishDetails.dishID },
            dishDetails: { ...dishDetails, ...nDetails },
          });
        } else {
          Notify.create({
            type: "error",
            message: "创建菜品失败，请刷新重试",
          });
        }
        return response.data.code;
      } catch (err) {
        Notify.create({
          type: "error",
          message: message.error,
        });
      }
    },
  },
};

export { dishesDetails };
