import{a as u}from"./chunk-B7FGQXL6.js";import"./chunk-XLSFDR55.js";import"./chunk-6GUQ4PU2.js";import{Ca as n,Da as l,Fa as r,Ga as d,Ja as p,P as a,ba as c}from"./chunk-XUATWZNQ.js";var S=(()=>{let i=class i{constructor(){this.videoService=c(u)}getFiles(t){let e=t.target.files;return e?Array.from(e):[]}loadVideo(t){let e=this.getFiles(t)[0];e&&(this.video=e,console.log(this.video))}uploadVideo(){this.videoService.uploadVideo(this.video).subscribe(t=>{console.log(t)})}};i.\u0275fac=function(e){return new(e||i)},i.\u0275cmp=a({type:i,selectors:[["app-upload"]],standalone:!0,features:[p],decls:3,vars:0,consts:[["type","file","accept",".mp4","multiple","false",3,"change"],[3,"click"]],template:function(e,s){e&1&&(n(0,"input",0),r("change",function(f){return s.loadVideo(f)}),l(),n(1,"button",1),r("click",function(){return s.uploadVideo()}),d(2,"UPLOAD"),l())}});let o=i;return o})();export{S as UploadComponent};