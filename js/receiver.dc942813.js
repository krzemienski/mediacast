(function(e){function t(t){for(var a,o,i=t[0],c=t[1],l=t[2],d=0,g=[];d<i.length;d++)o=i[d],s[o]&&g.push(s[o][0]),s[o]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);u&&u(t);while(g.length)g.shift()();return r.push.apply(r,l||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],a=!0,i=1;i<n.length;i++){var c=n[i];0!==s[c]&&(a=!1)}a&&(r.splice(t--,1),e=o(o.s=n[0]))}return e}var a={},s={receiver:0},r=[];function o(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=a,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)o.d(n,a,function(t){return e[t]}.bind(null,a));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/mediacast/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=t,i=i.slice();for(var l=0;l<i.length;l++)t(i[l]);var u=c;r.push([1,"chunk-vendors"]),n()})({1:function(e,t,n){e.exports=n("cf25")},"535e":function(e,t,n){"use strict";var a=n("cd51"),s=n.n(a);s.a},"608b":function(e,t,n){"use strict";var a=n("ccb8"),s=n.n(a);s.a},ccb8:function(e,t,n){},cd51:function(e,t,n){},cf25:function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var a=n("2b0e"),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"receiver-app"},[n("Receiver")],1)},r=[],o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"receiver"},[e.debugEnabled?n("div",{staticClass:"debug-panel"},[n("div",{staticClass:"debug-stats"},[e._v("\n      bandwidth: "+e._s(e.stats.bitrate)+"\n    ")]),n("div",{ref:"debugLog",staticClass:"debug-log"},e._l(e.debugLog,function(t){return n("div",{key:t.id},[e._v(e._s(t))])}),0)]):e._e(),n("cast-media-player")],1)},i=[],c=(n("6762"),n("2fdb"),n("f499")),l=n.n(c),u=n("db49"),d=u["a"].namespace,g={name:"receiver",components:{},data:function(){return{drms:{},debugEnabled:!0,debugLog:[],stats:{bitrate:0}}},mounted:function(){this.init()},methods:{init:function(){this.log("[mediacast:init] - Initializing.");var e=cast.framework.CastReceiverContext.getInstance(),t=e.getPlayerManager();cast.framework.CastReceiverContext.getInstance().setLoggerLevel(cast.framework.LoggerLevel.DEBUG),this.setDrms(),this.setPlayerEvents(t),this.setDebugLog(),e.addCustomMessageListener(d,this.onCustomMessage),this.log("[mediacast:init] - Application is ready, starting system."),e.start()},setPlayerEvents:function(e){var t=this;e.setMessageInterceptor(cast.framework.messages.MessageType.LOAD,function(n){t.log("[mediacast:setPlayerEvents] - player.setMessageInterceptor:LOAD"),t.log(l()(n.media));var a=n.media.contentId,s=n.media.customData.licenseUrl,r=n.media.customData.drm,o=a.substring(a.lastIndexOf("."),a.length);return n.media.contentType="video/mp4",o.includes(".mpd")?n.media.contentType="application/dash+xml":o.includes(".ism")?n.media.contentType="application/vnd.ms-sstr+xml":o.includes(".m3u8")&&(n.media.contentType="application/vnd.apple.mpegurl"),e.setMediaPlaybackInfoHandler(function(e,n){return n.licenseUrl=s,n.protectionSystem=t.drms[r],t.log("[mediacast:playbackConfig - "+l()(n)),n}),n}),e.addEventListener(cast.framework.events.EventType.PLAYER_LOAD_COMPLETE,function(){t.log("[mediacast:events:PLAYER_LOAD_COMPLETE"),console.log(e.getStats()),console.log(e.getMediaInformation())}),e.addEventListener(cast.framework.events.EventType.BITRATE_CHANGED,function(n){t.log("[mediacast:events:BITRATE_CHANGED - "+n.totalBitrate),t.stats.bitrate=n.totalBitrate,console.log(e.getStats())})},setDrms:function(){this.drms={widevine:cast.framework.ContentProtection.WIDEVINE,playready:cast.framework.ContentProtection.PLAYREADY}},setDebugLog:function(){var e=this.$refs.debugLog;setInterval(function(){var t=e.scrollHeight-e.clientHeight<=e.scrollTop+1;t||(e.scrollTop=e.scrollHeight-e.clientHeight)},1e3)},onCustomMessage:function(e){if(console.log("Message ["+e.senderId+"]: "+l()(e.data)),this.log("[mediacast:onCustomMessage] - "+l()(e.data)),e.data.action)switch(e.data.action){case"setDebugPanel":this.debugEnabled=e.data.message;break;default:break}},log:function(e){console.log(e),this.debugLog=this.debugLog.concat(e)}}},f=g,p=(n("535e"),n("2877")),m=Object(p["a"])(f,o,i,!1,null,"3352bbca",null),v=m.exports,b={name:"receiver-app",components:{Receiver:v}},h=b,y=(n("608b"),Object(p["a"])(h,s,r,!1,null,null,null)),E=y.exports;a["a"].config.productionTip=!1,new a["a"]({render:function(e){return e(E)}}).$mount("#app")},db49:function(e,t,n){"use strict";var a={namespace:"urn:x-cast:com.google.cast.mediacast",applicationId:"A55EBA47"};t["a"]=a}});
//# sourceMappingURL=receiver.dc942813.js.map