import { serialize } from "@wordpress/blocks";

/**
 * Function to serialize an array of Gutenberg blocks to HTML.
 *
 * @param {Array} blocks - Array of Gutenberg blocks.
 * @returns {string} - The serialized HTML string.
 */
export const serializeData = (blocks = []) => {
    return serialize(blocks) || "";
};

export default serializeData;
