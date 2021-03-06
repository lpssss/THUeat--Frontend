function buildTimeString(timeArray) {
  const finalArray = [];
  for (let i = 0; i < timeArray.length; i++) {
    const temp = [];
    for (let key in timeArray[i]) {
      temp.push(timeArray[i][key]);
    }
    finalArray.push(temp.join("-"));
  }
  return finalArray.join("/");
}

export default function (
  nDetails,
  dImage,
  nImage,
  imageType,
  isDishForm = false
) {
  let formData = new FormData();
  for (let key in nDetails) {
    if (key === "stallOperationtime") {
      //如果是从档口信息表格那里post
      if (imageType === "stallImages")
        formData.append(key, buildTimeString(nDetails[key]));
    } else formData.append(key, nDetails[key]);
  }
  if (!isDishForm) {
    if (dImage !== null && dImage.length !== 0) {
      dImage.forEach((item) => formData.append("deleteImages", item));
    } else {
      formData.append("deleteImages", "");
    }
  }
  if (nImage !== null && nImage.length !== 0) {
    nImage.forEach((item) => formData.append(imageType, item));
  } else {
    formData.append(imageType, "");
  }
  return formData;
}
