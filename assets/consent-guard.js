(function () {
  var W = window, POLL = 50, MAX = 4000, SENT = false, STARTED = false;
  var LS = 'cpapi.pendingConsent', SS_AWIN = 'awin.params';

  try {
    var q = new URLSearchParams(location.search), aw = {};
    ['clickref','awc','awinaffid','utm_source','utm_medium','utm_campaign'].forEach(function(k){
      if(q.has(k)) aw[k] = q.get(k);
    });
    if(Object.keys(aw).length) sessionStorage.setItem(SS_AWIN, JSON.stringify({v:aw,t:Date.now()}));
  } catch(e){}

  function setWhenReady(consent){
    var t0 = Date.now();
    (function tick(){
      if(SENT) return;
      var cp = W.Shopify && W.Shopify.customerPrivacy;
      if(cp && typeof cp.setTrackingConsent==='function'){
        SENT = true;
        try { cp.setTrackingConsent(consent, function(){}); } catch(e){}
        return;
      }
      if(Date.now()-t0<MAX) setTimeout(tick,POLL);
    })();
  }

  function startTracking(state){
    if(STARTED) return;
    if(!state || !(state.analytics||state.marketing)) return;
    STARTED = true;
    W.dataLayer = W.dataLayer || [];
    W.dataLayer.push({event:'cpapi_consent_ready', cpapi:state});
    try {
      var raw=sessionStorage.getItem(SS_AWIN);
      if(raw) W.dataLayer.push({event:'awin_params_ready', awin:JSON.parse(raw).v});
    }catch(e){}
  }

  (function hook(){
    var cp=W.Shopify && W.Shopify.customerPrivacy;
    if(!cp || typeof cp.onConsentChanged!=='function'){ setTimeout(hook,POLL); return; }
    try{ cp.onConsentChanged(startTracking); }catch(e){}
  })();

  W.__acceptAllTracking__=function(){
    var desired={analytics:true,marketing:true,preferences:true,sale_of_data:false};
    try{ localStorage.setItem(LS, JSON.stringify(desired)); }catch(e){}
    setWhenReady(desired);
  };

  // Auto-replay if user accepted before
  try{
    var saved=localStorage.getItem(LS);
    if(saved) setWhenReady(JSON.parse(saved));
  }catch(e){}
})();
