/* global DiscourseClient */

"use strict";

const discourse = new DiscourseClient();

document.onreadystatechange = function () {
  if (document.readyState === "interactive") renderApp();

  function renderApp() {
    var onInit = app.initialized();

    onInit.then(getClient).catch(discourse.handleErr);

    function getClient(_client) {
      window.client = _client;
      client.events.on("app.activated", onAppActivate);
      client.iparams.get("discourse_url").then((val) => {
        discourse.setBaseUrl(val.discourse_url);
      }, discourse.handleErr);
    }
  }
};

function onAppActivate() {
  document
    .querySelector("#search-input")
    .addEventListener("fwChange", onSearchWithTimeout(500));
  document
    .querySelector("#result-wrapper")
    .addEventListener("fwSelected", onSelect);
}

function onSearchWithTimeout(timeout) {
  var currentTimer = null;

  return function onSearchEvent(evt) {
    var inputValue = evt.target.value;
    if (!inputValue || inputValue.length < 4) return;
    if (currentTimer != null) clearTimeout(currentTimer);
    currentTimer = setTimeout(function () {
      discourse.search(inputValue).then(populateSearchResult);
    }, timeout);
  };
}

function populateSearchResult(topics) {
  topics = topics || [];
  var selectResult = document.getElementById("result-wrapper");
  var resultDOM = [
    `<fw-label value="Search Results (${topics.length})"></fw-label>`,
  ];
  for (var t of topics) {
    var title = t.title.replace(/</g, "&lt;");
    resultDOM.push(`
      <fw-select-option
        class="result-option"
        value="${t.id}"
        data-url="${discourse.topicUrl(t.slug, t.id)}"
        data-title="${title}"
      >${title}</fw-select-option>
    `);
  }
  selectResult.innerHTML = resultDOM.join("");
}

function onSelect(evt) {
  var text = `<ul><li><a href="${evt.target.dataset.url}" target="_blank">${evt.target.dataset.title}</a></li></ul>`;
  client.interface.trigger("setValue", { id: "editor", text, replace: false });
}


