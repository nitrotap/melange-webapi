'use strict';

var DomRe         = require("../../src/dom/domRe");
var ReasonJs      = require("../../src/reasonJs");
var ElementRe     = require("../../src/dom/elementRe");
var TestHelpers   = require("../testHelpers");
var HtmlElementRe = require("../../src/dom/htmlElementRe");

var el = TestHelpers.unsafelyUnwrapOption(ElementRe.asHtmlElement(document.createElement("strong")));

var el2 = TestHelpers.unsafelyUnwrapOption(ElementRe.asHtmlElement(document.createElement("small")));

var $$event = document.createEvent("my-event");

el.accessKey;

el.accessKey = "";

el.accessKeyLabel;

HtmlElementRe.contentEditable(el);

HtmlElementRe.setContentEditable(el, /* Inherit */2);

HtmlElementRe.isContentEditable(el);

el.contextMenu;

el.contextMenu = el2;

el.dataset;

HtmlElementRe.dir(el);

HtmlElementRe.setDir(el, /* Rtl */1);

HtmlElementRe.draggable(el);

HtmlElementRe.setDraggable(el, /* true */1);

el.dropzone;

HtmlElementRe.hidden(el);

HtmlElementRe.setHidden(el, /* true */1);

HtmlElementRe.itemScope(el);

HtmlElementRe.setItemScope(el, /* true */1);

el.itemType;

el.itemId;

el.itemId = "my-id";

el.itemRef;

el.itemProp;

el.itemValue;

el.itemValue = ({});

el.lang;

el.lang = "en";

el.offsetHeight;

el.offsetLeft;

el.offsetParent;

el.offsetTop;

el.offsetWidth;

HtmlElementRe.spellcheck(el);

HtmlElementRe.setSpellcheck(el, /* true */1);

el.style;

el.tabIndex;

el.tabIndex = 42;

el.title;

el.title = "hovertext!";

HtmlElementRe.translate(el);

HtmlElementRe.setTranslate(el, /* true */1);

el.blur();

el.click();

el.focus();

el.forceSpellCheck();

exports.el      = el;
exports.el2     = el2;
exports.$$event = $$event;
/* el Not a pure module */
