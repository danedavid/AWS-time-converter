chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
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

  chrome.tabs.onUpdated.addListener((_, changeInfo) => {
    if (changeInfo.status == 'complete') {

      chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
          conditions: [
            new chrome.declarativeContent.PageStateMatcher({
              pageUrl: { hostEquals: 'console.aws.amazon.com' },
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

    }

  })
});