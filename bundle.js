/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Router = __webpack_require__(1);
const Inbox = __webpack_require__(2);
const Sent = __webpack_require__(4);
const Compose = __webpack_require__(5);

document.addEventListener("DOMContentLoaded", function(event) {
  const sidebarNavLi = document.querySelectorAll(".sidebar-nav li");

  sidebarNavLi.forEach((li) => {
    li.addEventListener("click", (e) => {
      window.location.hash = li.innerText.toLowerCase();
    });
  });

  const content = document.querySelector(".content");
  const router = new Router(content, routes);
  router.start();

});

const routes = {
  inbox: Inbox,
  sent: Sent,
  compose: Compose
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class Router {
  constructor(node, routes) {
    this.node = node;
    this.routes = routes;
  }

  start() {
    this.render();

    window.addEventListener('hashchange', () => {
      this.render();
    });
  }

  activeRoute() {
    const currentRoute =  window.location.hash.slice(1);
    return this.routes[currentRoute];
  }

  render() {
    const component = this.activeRoute();
    if (component) {
      this.node.innerHTML = "";
      const newNode = component.render();
      this.node.appendChild(newNode);
    } else {
      this.node.innerHTML = "";
    }
  }
}

module.exports = Router;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const MessageStore = __webpack_require__(3);

const Inbox = {
  render: () => {
    const messages = MessageStore.getInboxMessages();
    const ul = document.createElement('ul');
    ul.className = 'messages';

    messages.forEach((message) => {
      ul.appendChild(Inbox.renderMessage(message));
    });

    return ul;
  },

  renderMessage: (message) => {
    const li = document.createElement('li');
    li.className = 'message';
    li.innerHTML = `<span class="from">${message.from}</span>
      <span class="subject">${message.subject}</span>
      <span class="body">${message.body}</span>`;
    return li;
  }
};

module.exports = Inbox;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

let messages = {
  sent: [
    {to: "friend@mail.com", subject: "Check this out", body: "It's so cool"},
    {to: "person@mail.com", subject: "zzz", body: "so booring"}
  ],
  inbox: [
    {from: "grandma@mail.com", subject: "Fwd: Fwd: Fwd: Check this out",
      body: "Stay at home mom discovers cure for leg cramps. Doctors hate her"}, {from: "person@mail.com", subject: "Questionnaire", body: "Take this free quiz win $1000 dollars"}
    ]
};

const MessageStore = {
  getInboxMessages: () => messages.inbox,
  getSentMessages: () => messages.sent,
  getMessageDraft: () => messageDraft,

  updateDraftField: (field, value) => {
    messageDraft.field = value;
  },
  sendDraft: () => {
    messages.sent.push(messageDraft);
    messageDraft = new Message();
  }
};

class Message {
  constructor(from = "", to = "", subject = "", body = "") {
    this.from = from;
    this.to = to;
    this.subject = subject;
    this.body = body;
  }
}

let messageDraft = new Message();

module.exports = MessageStore;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const MessageStore = __webpack_require__(3);

const Sent = {
  render: () => {
    const messages = MessageStore.getSentMessages();
    const ul = document.createElement('ul');
    ul.className = 'messages';

    messages.forEach((message) => {
      ul.appendChild(Sent.renderMessage(message));
    });

    return ul;
  },

  renderMessage: (message) => {
    const li = document.createElement('li');
    li.className = 'message';
    li.innerHTML = `<span class="to">${message.to}</span>
      <span class="subject">${message.subject}</span>
      <span class="body">${message.body}</span>`;
    return li;
  }
};

module.exports = Sent;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const MessageStore = __webpack_require__(3);

const Compose = {
  render: () => {
    const messages = MessageStore.getInboxMessages();
    const div = document.createElement('div');
    div.className = 'new-messages';

    div.innerHTML = Compose.renderForm();

    return div;
  },

  renderForm: () => {
    const currentDraft = MessageStore.getMessageDraft();
    console.log(currentDraft);

    const htmlString = `
    <p class="new-message-header">New Message</p>
    <form class='compose-form'>
      <input placeholder="Recipient" name="to" type="text"
      value=${currentDraft.to}>
      <input placeholder="Subject" name="subject" type="text"
      value=${currentDraft.subject}>
      <textarea name="body" rows="20">${currentDraft.body}</textarea>
      <button type="submit" class="btn btn-primary
      submit-message">Send</button>
    </form>
      `;

    return htmlString;
  }
};

module.exports = Compose;


/***/ })
/******/ ]);