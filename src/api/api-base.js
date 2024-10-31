/**
 * WordPress dependencies
 */
import apiFetch from "@wordpress/api-fetch";

import hooks from "../helper/wpHooks";

/**
 * Function to handle notifications based on API response.
 * @param {Object} res - API response object.
 * @param {string} method - HTTP method used in the request.
 */
const notify = ({ res, method }) => {
    const { doAction } = hooks;
    if (method !== "GET") {
        const type = res?.success ? "success" : "error";
        doAction("notification", {
            type,
            message: res?.message,
        });
    } else if (method === "GET" && !res?.success) {
        doAction("notification", {
            type: "error",
            message: res?.message,
        });
    }
};

export default class ApiBase {
    constructor() {
        this.apiFetch = apiFetch;
        this.remoteURL = "";
    }

    /**
     * Add prefix to the path.
     * @param {string} path - The endpoint path.
     * @returns {string} - The full path with the prefix.
     */
    #addPrefix(path) {
        return `${this.prefix}/${path}`;
    }

    /**
     * Build query parameters string from an object.
     * @param {Object} params - The query parameters.
     * @returns {string} - The query string.
     */
    #buildQueryParams(params = {}) {
        const { enableSearch, ...restParams } = params;
        const queryString = new URLSearchParams(restParams).toString();
        return queryString
            ? `${enableSearch ? "search" : ""}?${queryString}`
            : "";
    }

    /**
     * Send API request.
     * @param {Object} options - The request options.
     * @param {string} options.path - The endpoint path.
     * @param {string} options.method - The HTTP method (e.g., GET, POST).
     * @param {Object} [options.data={}] - The request payload, used for methods other than GET.
     * @param {boolean} [options.isRemote=false] - Flag indicating whether the request should be sent to a remote server.
     * @returns {Promise<Object>} - The API response in JSON format.
     */
    async sendRequest({ path, method, data = {}, isRemote = false }) {
        // Adjust the path if the method is not GET
        const adjustedPath = method === "GET" ? path : this.#addPrefix(path);

        // Define parameters for fetch or local API call
        const fetchParams = {
            method,
            ...(method !== "GET" && { body: JSON.stringify(data) }), // Include body only if method is not GET
            ...(isRemote
                ? {
                      headers: {
                          "Content-Type": "application/json", // Set headers for remote requests
                      },
                  }
                : {
                      path: adjustedPath, // Include path for local API calls
                  }),
        };

        let res;

        if (isRemote) {
            // Build the full URL for remote requests
            const url = `${this.remoteURL}${adjustedPath}`;
            const response = await fetch(url, fetchParams);
            res = await response.json(); // Parse the response as JSON
        } else {
            // Make a local API call
            res = await this.apiFetch(fetchParams);
        }

        notify({ res, method }); // Notify with the response and method
        return res; // Return the API response
    }

    /**
     * Send a GET request.
     * @param {string} path - The endpoint path.
     * @param {Object} params - The query parameters.
     * @param {boolean} isRemote - Flag to indicate if the request is remote.
     * @returns {Promise<Object>} - The API response.
     */
    async get(path, params, isRemote) {
        const method = "GET";
        const queryString = this.#buildQueryParams(params);
        path = `${this.#addPrefix(path)}${queryString}`;
        const res = await this.sendRequest({ path, method, isRemote });
        return res;
    }

    /**
     * Send a POST request.
     * @param {string} path - The endpoint path.
     * @param {Object} data - The request data.
     * @param {boolean} isRemote - Flag to indicate if the request is remote.
     * @returns {Promise<Object>} - The API response.
     */
    async post(path, data = {}, isRemote) {
        const method = "POST";
        const res = await this.sendRequest({ path, method, data, isRemote });
        return res;
    }

    /**
     * Send a PUT request.
     * @param {string} path - The endpoint path.
     * @param {Object} data - The request data.
     * @param {boolean} isRemote - Flag to indicate if the request is remote.
     * @returns {Promise<Object>} - The API response.
     */
    async put(path, data = {}, isRemote) {
        const method = "PUT";
        const res = await this.sendRequest({ path, method, data, isRemote });
        return res;
    }

    /**
     * Send a DELETE request.
     * @param {string} path - The endpoint path.
     * @param {Object} data - The request data.
     * @param {boolean} isRemote - Flag to indicate if the request is remote.
     * @returns {Promise<Object>} - The API response.
     */
    async delete(path, data, isRemote) {
        const method = "DELETE";
        const res = await this.sendRequest({ path, method, data, isRemote });
        return res;
    }
}
