import constructFormData from "src/store/utils/constructFormData";
import { staffapi } from "boot/axios";
import { Notify } from "quasar";
import { STAFF_API_LINKS } from "app/api-links";
const API_LINK = STAFF_API_LINKS.dashboard;

const stallDetails = {
  namespaced: true,
  state: {
    stallDetailsData: {},
    stallImagesData: [],
  },
  mutations: {
    initialize(state, { details, images }) {
      Object.assign(state.stallDetailsData, details);
      state.stallImagesData = [...images];
    },
    updateDetails(state, details) {
      Object.assign(state.stallDetailsData, details);
    },
    hideImage(state, { targetImg }) {
      const idx = state.stallImagesData.indexOf(targetImg);
      console.log(idx);
      state.stallImagesData.splice(idx, 1);
    },
    addImages(state, images) {
      images.forEach((item) => state.stallImagesData.push(item));
    },
  },
  actions: {
    saveDetailsChanges({ state, dispatch }, newDetails) {
      const message = {
        success: "修改信息成功",
        error: "修改信息失败，请刷新页面重试",
      };
      dispatch("postData", {
        nDetails: newDetails,
        dImage: [],
        nImage: [],
        message: message,
        type: "details",
      });
    },
    saveImagesChanges({ state, dispatch }, { deleteImages, newImages }) {
      console.log(deleteImages);
      console.log(newImages);
      const message = {
        success: "编辑图片成功",
        error: "编辑图片失败，请刷新页面重试",
      };
      dispatch("postData", {
        nDetails: state.stallDetailsData,
        dImage: deleteImages,
        nImage: newImages,
        message: message,
        type: "images",
      });
    },
    //输入1个数据：需要POST去后端的档口信息（不包括上传和删除的图片），Object
    //输出1个数据：后端的回应，Object
    //功能：POST 数据去后端
    async postData({ commit }, { nDetails, dImage, nImage, message, type }) {
      const formData = constructFormData(
        nDetails,
        dImage,
        nImage,
        "stallImages"
      );
      for (let pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      try {
        const response = await staffapi.post(API_LINK, formData);
        console.log(response);
        if (response.data.code === 200) {
          Notify.create({
            type: "success",
            message: message.success,
          });
          if (type === "details") {
            commit("updateDetails", nDetails);
          } else if (type === "images") {
            if (response.data.data.stallImages.length !== 0) {
              commit("addImages", response.data.data.stallImages);
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
  },
};

export { stallDetails };
