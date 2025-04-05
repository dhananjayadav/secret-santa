import { postAPI } from "./apiMethods"

export const assignSecretSantaAPI = async (employeeFile, lastYearFile) => {
    try {
        const formData = new FormData();
        formData.append("employees", employeeFile);
        formData.append("lastYear", lastYearFile);
        const response = await postAPI("/api/secret-santa/assign", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response;
    } catch (err) {
        return { isError: true, err };
    }
}