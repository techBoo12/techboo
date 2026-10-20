/* AuxHR company logo marks for job cards (Oct 20 2026, her words "anywhere there's job posting, put the logo of the jobs there").
   All companies in the mocks are made up, so each gets its own small mark in the AuxHR palette. Inline SVG, no files. */
(function(){
'use strict';
var D={
 'Brightline':['#4266ff','#7b74ff','<path d="M11 24a9 9 0 0118 0z" fill="#fff"/><path d="M9.5 28.6h21" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/><path d="M20 10.2v2.4M12.4 13.4l1.6 1.6M27.6 13.4L26 15" stroke="#fff" stroke-width="2.2" stroke-linecap="round" opacity=".75"/>'],
 'Lumen Pay':['#0f1652','#24307e','<circle cx="18.5" cy="21.5" r="8" fill="none" stroke="#63eafd" stroke-width="3.2"/><circle cx="27" cy="13" r="3.4" fill="#91b6ff"/>'],
 'Savanna Tech':['#86e3ad','#63eafd','<rect x="11" y="21" width="4.6" height="8.5" rx="2.3" fill="#0f1652"/><rect x="17.7" y="15.5" width="4.6" height="14" rx="2.3" fill="#0f1652"/><rect x="24.4" y="10.5" width="4.6" height="19" rx="2.3" fill="#0f1652" opacity=".55"/>'],
 'Kora Health':['#7b74ff','#c48bff','<rect x="17" y="10" width="6" height="20" rx="3" fill="#fff"/><rect x="10" y="17" width="20" height="6" rx="3" fill="#fff"/><circle cx="20" cy="20" r="1.6" fill="#7b74ff"/>'],
 'Kosana Tech':['#213aff','#4266ff','<rect x="11" y="10" width="5" height="20" rx="2.5" fill="#fff"/><path d="M27 10.5L19.5 20l7.5 9.5" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="30" cy="20" r="2.2" fill="#63eafd"/>'],
 'Halo Logistics':['#91b6ff','#63eafd','<ellipse cx="20" cy="12.6" rx="8.5" ry="3" fill="none" stroke="#0f1652" stroke-width="2.4"/><path d="M13 19.5l7-3 7 3v7.6l-7 3.4-7-3.4z" fill="#0f1652"/><path d="M13 19.5l7 3.2 7-3.2M20 22.7v7.8" fill="none" stroke="#91b6ff" stroke-width="1.6" stroke-linejoin="round"/>']
};
var n=0;
function svg(name){
 var d=D[name]; if(!d) return '';
 var id='axlg'+(n++);
 return '<svg class="axlogo" viewBox="0 0 40 40" role="img" aria-label="'+name+' logo"><defs><linearGradient id="'+id+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="'+d[0]+'"/><stop offset="1" stop-color="'+d[1]+'"/></linearGradient></defs><rect width="40" height="40" rx="11" fill="url(#'+id+')"/><rect x=".5" y=".5" width="39" height="39" rx="10.5" fill="none" stroke="#fff" stroke-opacity=".18"/>'+d[2]+'</svg>';
}
window.AXLOGO=svg;
var st=document.createElement('style');
st.textContent='.axlogo{display:block;width:100%;height:100%}'+
 '.axd-lg.lg,.dsc-logo.lg,.ps-ic.lg{background:none!important;padding:0;overflow:hidden;box-shadow:0 4px 12px rgba(15,22,82,.16)}'+
 '.ap-co{display:flex;align-items:center;gap:8px}.ap-co>div{min-width:0}.ap-co .ap-lg{width:28px;height:28px;flex:none;border-radius:9px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,.25)}.ap-co b{display:block;font-size:14px;white-space:nowrap}.ap-co small{display:block;font-size:12px;margin-top:1px;white-space:nowrap}'+
 '.tr-job.co{align-items:center}.tr-job .tr-lg{width:26px;height:26px;flex:none;border-radius:8px;overflow:hidden;align-self:center;box-shadow:0 4px 12px rgba(0,0,0,.25)}';
document.head.appendChild(st);
})();
