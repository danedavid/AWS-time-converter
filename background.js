const injectScriptBasedOnURL = () => {
  chrome.declarativeContent.onPageChanged.removeRules([], () => {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {
            hostEquals: 'console.aws.amazon.com'
          },
        })
      ],
      actions: [new chrome.declarativeContent.RequestContentScript({
        js: [
          'moment.min.js',
          'inject.js'
        ]
      })]
    }]);
  });
};

chrome.runtime.onInstalled.addListener(function () {
  injectScriptBasedOnURL();

  chrome.tabs.onUpdated.addListener((_, changeInfo) => {
    if (changeInfo.status == 'complete') {
      injectScriptBasedOnURL();
    }
  })
});