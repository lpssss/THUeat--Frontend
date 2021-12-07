export default function (nDetails, dImage, nImage) {
  let formData = new FormData();
  for (let key in nDetails) {
    formData.append(key, nDetails[key]);
  }
  if (dImage !== null && dImage.length !== 0) {
    dImage.forEach((item) => formData.append("deleteImages", item));
  } else {
    formData.append("deleteImages", "");
  }
  if (nImage !== null && nImage.length !== 0) {
    nImage.forEach((item) => formData.append("stallImages", item));
  } else {
    formData.append("stallImages", "");
  }
  return formData;
}
