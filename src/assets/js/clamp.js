export function clamps(elements, options) {
  options = options || {};
  if (elements.length === 0) {
    return
  }
  if (!!elements.length) {
    for (let i in elements) {
      clamp(elements[i])
    }
  } else {
    clamp(elements)
  }

  function clamp(element) {
    var self = this,
        win = window,
        opt = {
          clamp: options.clamp || 2,
          useNativeClamp: typeof(options.useNativeClamp) != 'undefined' ? options.useNativeClamp : true,
          splitOnChars: options.splitOnChars || ['.', '-', '–', '—', ' '],
          animate: options.animate || false,
          truncationChar: options.truncationChar || '…',
          truncationHTML: options.truncationHTML
        },

        sty = element.style,
        originalText = element.innerHTML,

        supportsNativeClamp = typeof(element.style.webkitLineClamp) != 'undefined',
        clampValue = opt.clamp,
        isCSSValue = clampValue.indexOf && (clampValue.indexOf('px') > -1 || clampValue.indexOf('em') > -1),
        truncationHTMLContainer;

    if (opt.truncationHTML) {
      truncationHTMLContainer = document.createElement('span');
      truncationHTMLContainer.innerHTML = opt.truncationHTML;
    }

    function computeStyle(elem, prop) {
      if (!win.getComputedStyle) {
        win.getComputedStyle = function (el, pseudo) {
          this.el = el;
          this.getPropertyValue = function (prop) {
            var re = /(\-([a-z]){1})/g;
            if (prop == 'float') prop = 'styleFloat';
            if (re.test(prop)) {
              prop = prop.replace(re, function () {
                return arguments[2].toUpperCase();
              });
            }
            return el.currentStyle && el.currentStyle[prop] ? el.currentStyle[prop] : null;
          }
          return this;
        }
      }

      return win.getComputedStyle(elem, null).getPropertyValue(prop);
    }

    function getMaxLines(height) {
      var availHeight = height || element.clientHeight,
          lineHeight = getLineHeight(element);

      return Math.max(Math.floor(availHeight / lineHeight), 0);
    }

    function getMaxHeight(clmp) {
      var lineHeight = getLineHeight(element);
      return lineHeight * clmp;
    }

    function getLineHeight(elem) {
      var lh = computeStyle(elem, 'line-height');
      if (lh == 'normal') {
        lh = parseInt(computeStyle(elem, 'font-size')) * 1.2;
      }
      return parseInt(lh);
    }


    var splitOnChars = opt.splitOnChars.slice(0),
        splitChar = splitOnChars[0],
        chunks,
        lastChunk;

    function getLastChild(elem) {
      if (elem.lastChild.children && elem.lastChild.children.length > 0) {
        return getLastChild(Array.prototype.slice.call(elem.children).pop());
      }
      else if (!elem.lastChild || !elem.lastChild.nodeValue || elem.lastChild.nodeValue == '' || elem.lastChild.nodeValue == opt.truncationChar) {
        elem.lastChild.parentNode.removeChild(elem.lastChild);
        return getLastChild(element);
      }
      else {
        return elem.lastChild;
      }
    }

    function truncate(target, maxHeight) {
      if (!maxHeight) {
        return;
      }

      function reset() {
        splitOnChars = opt.splitOnChars.slice(0);
        splitChar = splitOnChars[0];
        chunks = null;
        lastChunk = null;
      }

      var nodeValue = target.nodeValue.replace(opt.truncationChar, '');

      if (!chunks) {
        if (splitOnChars.length > 0) {
          splitChar = splitOnChars.shift();
        }
        else {
          splitChar = '';
        }

        chunks = nodeValue.split(splitChar);
      }

      if (chunks.length > 1) {
        lastChunk = chunks.pop();
        applyEllipsis(target, chunks.join(splitChar));
      }
      else {
        chunks = null;
      }

      if (truncationHTMLContainer) {
        target.nodeValue = target.nodeValue.replace(opt.truncationChar, '');
        element.innerHTML = target.nodeValue + ' ' + truncationHTMLContainer.innerHTML + opt.truncationChar;
      }

      if (chunks) {
        if (element.clientHeight <= maxHeight) {
          if (splitOnChars.length >= 0 && splitChar != '') {
            applyEllipsis(target, chunks.join(splitChar) + splitChar + lastChunk);
            chunks = null;
          }
          else {
            return element.innerHTML;
          }
        }
      }
      else {
        if (splitChar == '') {
          applyEllipsis(target, '');
          target = getLastChild(element);

          reset();
        }
      }

      if (opt.animate) {
        setTimeout(function () {
          truncate(target, maxHeight);
        }, opt.animate === true ? 10 : opt.animate);
      }
      else {
        return truncate(target, maxHeight);
      }
    }

    function applyEllipsis(elem, str) {
      elem.nodeValue = str + opt.truncationChar;
    }

    if (clampValue == 'auto') {
      clampValue = getMaxLines();
    }
    else if (isCSSValue) {
      clampValue = getMaxLines(parseInt(clampValue));
    }

    var clampedText;
    if (supportsNativeClamp && opt.useNativeClamp) {
      sty.overflow = 'hidden';
      sty.textOverflow = 'ellipsis';
      sty.webkitBoxOrient = 'vertical';
      sty.display = '-webkit-box';
      sty.webkitLineClamp = clampValue;

      if (isCSSValue) {
        sty.height = opt.clamp + 'px';
      }
    }
    else {
      var height = getMaxHeight(clampValue);
      if (height <= element.clientHeight) {
        clampedText = truncate(getLastChild(element), height);
      }
    }

    return {
      'original': originalText,
      'clamped': clampedText
    }
  }
}