import axios from 'axios'

class ApiMET {
    constructor() {
        this.api = axios.create({
            baseURL: `https://collectionapi.metmuseum.org`
        })
    }

    getDepartments() {
        return this.api.get("/public/collection/v1/departments");
    }

    getAllDepartmentPieces(departmentIds) {
        const departmentIdString = departmentIds.join("|");
        return this.api.get(`/public/collection/v1/objects?departmentIds=${departmentIdString}`);
    }
    getObject(id){
        return this.api.get(`/public/collection/v1/objects/${id}`);
    }


}

const apiMET = new ApiMET()

export default apiMET;