import {AxiosResponse} from "axios";
import {post} from "../base.service";


export const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    const response = post<{ url: string }>({
        url: "v1/file",
        body: formData,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    try {
        const res = await response;
        return res.data.url;
    } catch (err) {
        throw err;
    }
};