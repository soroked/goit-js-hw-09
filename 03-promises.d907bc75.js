!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},n={},t=e.parcelRequired7c6;null==t&&((t=function(e){if(e in o)return o[e].exports;if(e in n){var t=n[e];delete n[e];var r={id:e,exports:{}};return o[e]=r,t.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,o){n[e]=o},e.parcelRequired7c6=t);var r=t("h6c0i"),i=document.querySelector(".form");function l(e,o){return Math.random()>.3?Promise.resolve({position:e,delay:o}):Promise.reject({position:e,delay:o})}i.addEventListener("submit",(function(e){e.preventDefault();var o=i.delay.value,n=i.step.value,t=i.amount.value,c=1,a=setTimeout((function(){if(c>t)clearTimeout(a);else{var e=Number(o)+Number((c-1)*n);console.log(o),console.log(n),console.log(e),l(c,e).then((function(e){var o=e.position,n=e.delay;return r.Notify.success("✅ Fulfilled promise ".concat(o," in ").concat(n,"ms"))})).catch((function(e){var o=e.position,n=e.delay;return r.Notify.failure("❌ Rejected promise ".concat(o," in ").concat(n,"ms"))})),c+=1;var i=setInterval((function(){if(c>t)clearInterval(i);else{var e=Number(o)+Number((c-1)*n);console.log(o),console.log(n),console.log(e),l(c,e).then((function(e){var o=e.position,n=e.delay;return r.Notify.success("✅ Fulfilled promise ".concat(o," in ").concat(n,"ms"))})).catch((function(e){var o=e.position,n=e.delay;return r.Notify.failure("❌ Rejected promise ".concat(o," in ").concat(n,"ms"))})),c+=1}}),n)}}),o)}))}();
//# sourceMappingURL=03-promises.d907bc75.js.map
