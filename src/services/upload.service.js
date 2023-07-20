import apiInstance from "./apiInstance.js";

class UploadService {
  constructor() {
    this.api = apiInstance;
  }
  uploadImage(imageForm) {
    return this.api.post('/upload/image', imageForm)
  }
}

const uploadService = new UploadService();

export default uploadService;
