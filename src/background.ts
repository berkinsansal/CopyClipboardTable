// https://medium.com/angular-in-depth/chrome-extension-with-angular-why-and-how-778200b87575
// https://developer.chrome.com/apps/first_app

// chrome.runtime.onInstalled.addListener(() => {
//   chrome.webNavigation.onCompleted.addListener(() => {
//     chrome.tabs.query({ active: true, currentWindow: true }, ([{ id }]) => {
//       chrome.pageAction.show(id);
//     });
//   }, { url: [{ urlMatches: 'google.com' }] });
// });