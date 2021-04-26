/* global client */

"use strict";

function DiscourseClient(baseUrl) {
  this.baseUrl = baseUrl;
}

/**
 * Helper to set baseUrl after instantiating
 *
 * @param {string} baseUrl - Base URL to the Discourse instance
 */
DiscourseClient.prototype.setBaseUrl = function (baseUrl) {
  this.baseUrl = baseUrl;
};

/**
 * Perform a search on the Discourse instance matching topics that
 * @param {string} val - The search text
 * @returns {Promise}
 */
DiscourseClient.prototype.search = async function search(val) {
  try {
    const res = await client.request.get(
      `<%= iparam.discourse_url %>/search.json?q=${val}`
    );
    const { topics } = JSON.parse(res.response);
    return topics;
  } catch (err) {
    this.handleErr(err);
  }
};

/**
 * Generate a URL to a Discourse topic
 *
 * @param {string} slug - Slug of the topic
 * @param {string} id - Optional ID of the topic
 * @returns {string} - URL to the topic
 */
DiscourseClient.prototype.topicUrl = function topicUrl(slug, id) {
  return `${this.baseUrl}/t/${slug}/${id}`;
};

/**
 * Generic error handler
 *
 * @param {error} err - Any generated error
 */
DiscourseClient.prototype.handleErr = function handleErr(err) {
  console.error(`Error occured. Details:`, err);
};

// Make it global
if (window) window.DiscourseClient = DiscourseClient;
