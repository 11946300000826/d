import axios, { AxiosResponse } from "axios";
import { LOCAL_STORAGE_KEY, ROUTERS } from "../constants/common";
import { TypeCommon } from "../types/common";

const axiosInstance = axios.create({
	baseURL: "http://128.199.148.23:8080",
	withCredentials: false,
});

axiosInstance.interceptors.request.use(
	(config: TypeCommon) => {
		const token = localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN);
		const headers = token
			? {
					Authorization: `Bearer ${token}`,
					is_web: true,
			  }
			: {};
		config.headers = {
			Accept: "application/json",
			"Content-Type": "application/json",
			...config.headers,
			...headers,
		};
		config.counter = config.counter || 0;
		return config;
	},
	(error: Error) => {
		return Promise.reject(error);
	}
);

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const originalRequest = error.config;
		if (
			(error.response.status === 401 || error.response.status === 403) &&
			!originalRequest._retry &&
			window.location.pathname !== ROUTERS.LOGIN.PATH
		) {
			localStorage.clear();
			window.location.assign(ROUTERS.LOGIN.PATH);
		} else if (error.response.status !== 200) {
			return Promise.reject(new Error(error.response.data.message || "Unknown error occurred"));
		}
		return Promise.reject(error);
	}
);

export const get = <T>({ url, params, headers }: { url: string; params?: TypeCommon; headers?: TypeCommon }): Promise<AxiosResponse<T>> => {
	return axiosInstance.get<T>(url, {
		headers,
		params,
	});
};

export const post = <T>({
	url,
	body,
	type,
	params,
	headers,
}: {
	url: string;
	body?: TypeCommon;
	type?: TypeCommon;
	params?: TypeCommon;
	headers?: TypeCommon;
}): Promise<AxiosResponse<T>> => {
	return axiosInstance.post<T>(url, body, {
		headers,
		params,
	});
};

export const put = ({
	url,
	body,
	params,
	headers,
}: {
	url: string;
	body?: TypeCommon;
	params: TypeCommon;
	headers?: TypeCommon;
}): Promise<AxiosResponse> => {
	return axiosInstance.put(url, body, {
		headers,
		params,
	});
};

export const patch = <T>({
	url,
	body,
	params,
	headers,
}: {
	url: string;
	body?: TypeCommon;
	params?: TypeCommon;
	headers?: TypeCommon;
}): Promise<AxiosResponse<T>> => {
	return axiosInstance.patch<T>(url, body, {
		headers,
		params,
	});
};

export const deleteMethod = ({ url, params, headers }: { url: string; params: TypeCommon; headers?: TypeCommon }): Promise<AxiosResponse> => {
	return axiosInstance.delete(url, {
		headers,
		params,
	});
};

const RequestClient = class {
	constructor() {
		//
	}

	async get(endpoint: string, params = {}, configs = {}) {
		try {
			const response = await axiosInstance.get(endpoint, {
				params,
				...configs,
			});

			return response;
		} catch (error) {
			throw error;
		}
	}

	async post(endpoint: string, body: {}, configs = {}) {
		try {
			const response = await axiosInstance.post(endpoint, body, configs);

			return response;
		} catch (error) {
			throw error;
		}
	}

	async put(endpoint: string, body: {}, configs = {}) {
		try {
			const response = await axiosInstance.put(endpoint, body, configs);
			return response;
		} catch (error) {
			throw error;
		}
	}

	async patch(endpoint: string, body: {}, configs = {}) {
		try {
			const response = await axiosInstance.patch(endpoint, body, configs);
			return response;
		} catch (error) {
			throw error;
		}
	}

	async delete(endpoint: string, data?: {}) {
		try {
			const response = await axiosInstance.delete(endpoint, { data });
			return response;
		} catch (error) {
			throw error;
		}
	}
};

const client = new RequestClient();

export { client };
