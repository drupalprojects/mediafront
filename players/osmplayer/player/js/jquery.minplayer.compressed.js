/**
 *  Copyright (c) 2010 Alethia Inc,
 *  http://www.alethia-inc.com
 *  Developed by Travis Tidwell | travist at alethia-inc.com 
 *
 *  License:  GPL version 3.
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *  
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.

 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */
(function(a){jQuery.media=jQuery.media?jQuery.media:{};jQuery.media.defaults=jQuery.extend(jQuery.media.defaults,{logo:"logo.png",logoWidth:49,logoHeight:15,logopos:"sw",logox:5,logoy:5,link:"http://www.mediafront.org",file:"",image:"",timeout:8,autoLoad:true});jQuery.media.ids=jQuery.extend(jQuery.media.ids,{busy:"#mediabusy",preview:"#mediapreview",play:"#mediaplay",media:"#mediadisplay"});jQuery.fn.minplayer=function(b){if(this.length===0){return null;}return new (function(c,d){d=jQuery.media.utils.getSettings(d);this.display=c;var e=this;this.autoLoad=d.autoLoad;this.busy=c.find(d.ids.busy);this.busyImg=this.busy.find("img");this.busyWidth=this.busyImg.width();this.busyHeight=this.busyImg.height();this.play=c.find(d.ids.play);this.play.unbind("click").bind("click",function(){e.togglePlayPause();});this.playImg=this.play.find("img");this.playWidth=this.playImg.width();this.playHeight=this.playImg.height();this.preview=c.find(d.ids.preview).mediaimage();if(this.preview){this.preview.display.unbind("click").bind("click",function(){e.onMediaClick();});this.preview.display.unbind("imageLoaded").bind("imageLoaded",function(){e.onPreviewLoaded();});}this.usePlayerControls=false;this.busyFlags=0;this.busyVisible=false;this.playVisible=false;this.previewVisible=false;this.playing=false;this.hasMedia=false;this.timeoutId=0;this.width=this.display.width();this.height=this.display.height();this.showElement=function(h,f,g){if(h&&!this.usePlayerControls){if(f){h.show(g);}else{h.hide(g);}}};this.showPlay=function(f,g){f&=this.hasMedia;this.playVisible=f;this.showElement(this.play,f,g);};this.showBusy=function(h,f,g){f&=this.hasMedia;if(f){this.busyFlags|=(1<<h);}else{this.busyFlags&=~(1<<h);}this.busyVisible=(this.busyFlags>0);this.showElement(this.busy,this.busyVisible,g);};this.showPreview=function(f,g){this.previewVisible=f;if(this.preview){this.showElement(this.preview.display,f,g);}};this.onControlUpdate=function(f){if(this.media){if(this.media.playerReady){switch(f.type){case"play":this.media.player.playMedia();break;case"pause":this.media.player.pauseMedia();break;case"seek":this.media.player.seekMedia(f.value);break;case"volume":this.media.player.setVolume(f.value);break;case"mute":this.media.mute(f.value);break;}}else{if((this.media.playQueue.length>0)&&!this.media.mediaFile){this.autoLoad=true;this.playNext();}}if(d.template&&d.template.onControlUpdate){d.template.onControlUpdate(f);}}};this.fullScreen=function(f){if(d.template.onFullScreen){d.template.onFullScreen(f);}this.preview.refresh();};this.onPreviewLoaded=function(){this.previewVisible=true;};this.onMediaUpdate=function(f){switch(f.type){case"paused":this.playing=false;this.showPlay(true);if(!this.media.loaded){this.showPreview(true);}break;case"update":case"playing":this.playing=true;this.showPlay(false);this.showPreview((this.media.mediaFile.type=="audio"));break;case"initialize":this.playing=false;this.showPlay(true);this.showBusy(1,this.autoLoad);this.showPreview(true);break;case"buffering":this.showPlay(true);this.showPreview((this.media.mediaFile.type=="audio"));break;default:break;}if(f.busy){this.showBusy(1,(f.busy=="show"));}};this.onMediaClick=function(){if(this.media.player&&!this.media.hasControls()){if(this.playing){this.media.player.pauseMedia();}else{this.media.player.playMedia();}}};this.media=this.display.find(d.ids.media).mediadisplay(d);if(this.media){this.media.display.unbind("click").bind("click",function(){e.onMediaClick();});}if(!d.controllerOnly){this.display.prepend('<div class="'+d.prefix+'medialogo"></div>');this.logo=this.display.find("."+d.prefix+"medialogo").mediaimage(d.link);if(this.logo){this.logo.display.css({width:d.logoWidth,height:d.logoHeight});this.logo.loadImage(d.logo);}}this.reset=function(){this.hasMedia=false;this.playing=false;this.showBusy(1,false);this.showPlay(true);this.showPreview(true);clearTimeout(this.timeoutId);if(this.media){this.media.reset();}};this.togglePlayPause=function(){if(this.media){if(this.media.playerReady){if(this.playing){this.showPlay(true);this.media.player.pauseMedia();}else{this.showPlay(false);this.media.player.playMedia();}}else{if((this.media.playQueue.length>0)&&!this.media.mediaFile){this.autoLoad=true;this.playNext();}}}};this.loadImage=function(f){if(this.preview){this.preview.loadImage(f);if(this.media){this.media.preview=f;}}};this.onResize=function(){if(this.preview){this.preview.refresh();}};this.clearImage=function(){if(this.preview){this.preview.clear();}};this.loadFiles=function(f){this.reset();this.hasMedia=this.media&&this.media.loadFiles(f);if(this.hasMedia&&this.autoLoad){this.media.playNext();}else{if(!this.hasMedia){this.showBusy(1,false);this.showPlay(false);this.timeoutId=setTimeout(function(){e.media.display.trigger("mediaupdate",{type:"complete"});},(d.timeout*1000));}}return this.hasMedia;};this.playNext=function(){if(this.media){this.media.playNext();}};this.hasControls=function(){if(this.media){return this.media.hasControls();}return true;};this.showControls=function(f){if(this.media){this.media.showControls(f);}};this.loadMedia=function(f){this.reset();if(this.media){this.media.loadMedia(f);}};if(d.file){this.loadMedia(d.file);}if(d.image){this.loadImage(d.image);}})(this,b);};window.onVimeoReady=function(b){b=b.replace("_media","");jQuery.media.players[b].node.player.media.player.onReady();};window.onVimeoFinish=function(b){b=b.replace("_media","");jQuery.media.players[b].node.player.media.player.onFinished();};window.onVimeoLoading=function(c,b){b=b.replace("_media","");jQuery.media.players[b].node.player.media.player.onLoading(c);};window.onVimeoPlay=function(b){b=b.replace("_media","");jQuery.media.players[b].node.player.media.player.onPlaying();};window.onVimeoPause=function(b){b=b.replace("_media","");jQuery.media.players[b].node.player.media.player.onPaused();};window.onVimeoProgress=function(c,b){b=b.replace("_media","");jQuery.media.players[b].node.player.media.player.onProgress(c);};jQuery.media.playerTypes=jQuery.extend(jQuery.media.playerTypes,{vimeo:function(b){return(b.search(/^http(s)?\:\/\/(www\.)?vimeo\.com/i)===0);}});jQuery.fn.mediavimeo=function(c,b){return new (function(f,e,d){this.display=f;var g=this;this.player=null;this.videoFile=null;this.ready=false;this.bytesLoaded=0;this.bytesTotal=0;this.currentVolume=1;this.createMedia=function(j,l){this.videoFile=j;this.ready=false;var i=(e.id+"_media");var h={clip_id:this.getId(j.path),width:"100%",height:"100%",js_api:"1",js_onLoad:"onVimeoReady",js_swf_id:i};var k=Math.floor(Math.random()*1000000);var m="http://vimeo.com/moogaloop.swf?rand="+k;jQuery.media.utils.insertFlash(this.display,m,i,"100%","100%",h,e.wmode,function(n){g.player=n;g.loadPlayer();});};this.getId=function(i){var h=/^http[s]?\:\/\/(www\.)?vimeo\.com\/([0-9]+)/i;return(i.search(h)==0)?i.replace(h,"$2"):i;};this.loadMedia=function(h){this.bytesLoaded=0;this.bytesTotal=0;this.createMedia(h);};this.onReady=function(){this.ready=true;this.loadPlayer();};this.loadPlayer=function(){if(this.ready&&this.player){this.player.api_addEventListener("onProgress","onVimeoProgress");this.player.api_addEventListener("onFinish","onVimeoFinish");this.player.api_addEventListener("onLoading","onVimeoLoading");this.player.api_addEventListener("onPlay","onVimeoPlay");this.player.api_addEventListener("onPause","onVimeoPause");d({type:"playerready"});this.playMedia();}};this.onFinished=function(){d({type:"complete"});};this.onLoading=function(h){this.bytesLoaded=h.bytesLoaded;this.bytesTotal=h.bytesTotal;};this.onPlaying=function(){d({type:"playing",busy:"hide"});};this.onPaused=function(){d({type:"paused",busy:"hide"});};this.playMedia=function(){d({type:"playing",busy:"hide"});this.player.api_play();};this.onProgress=function(h){d({type:"progress"});};this.pauseMedia=function(){d({type:"paused",busy:"hide"});this.player.api_pause();};this.stopMedia=function(){this.pauseMedia();this.player.api_unload();};this.seekMedia=function(h){this.player.api_seekTo(h);};this.setVolume=function(h){this.currentVolume=h;this.player.api_setVolume((h*100));};this.getVolume=function(){return this.currentVolume;};this.getDuration=function(){return this.player.api_getDuration();};this.getCurrentTime=function(){return this.player.api_getCurrentTime();};this.getBytesLoaded=function(){return this.bytesLoaded;};this.getBytesTotal=function(){return this.bytesTotal;};this.setQuality=function(h){};this.getQuality=function(){return"";};this.hasControls=function(){return true;};this.showControls=function(h){};this.getEmbedCode=function(){return"This video cannot be embedded.";};this.getMediaLink=function(){return"This video currently does not have a link.";};})(this,c,b);};window.onDailymotionPlayerReady=function(b){b=b.replace("_media","");jQuery.media.players[b].node.player.media.player.onReady();};jQuery.media.playerTypes=jQuery.extend(jQuery.media.playerTypes,{dailymotion:function(b){return(b.search(/^http(s)?\:\/\/(www\.)?dailymotion\.com/i)===0);}});jQuery.fn.mediadailymotion=function(c,b){return new (function(f,e,d){this.display=f;var g=this;this.player=null;this.videoFile=null;this.meta=false;this.loaded=false;this.ready=false;this.createMedia=function(i,k){this.videoFile=i;this.ready=false;var h=(e.id+"_media");var j=Math.floor(Math.random()*1000000);var l="http://www.dailymotion.com/swf/"+i.path+"?rand="+j+"&amp;enablejsapi=1&amp;playerapiid="+h;jQuery.media.utils.insertFlash(this.display,l,h,"100%","100%",{},e.wmode,function(m){g.player=m;g.loadPlayer();});};this.loadMedia=function(h){if(this.player){this.loaded=false;this.meta=false;this.videoFile=h;d({type:"playerready"});this.player.loadVideoById(this.videoFile.path,0);}};this.onReady=function(){this.ready=true;this.loadPlayer();};this.loadPlayer=function(){if(this.ready&&this.player){window[e.id+"StateChange"]=function(h){g.onStateChange(h);};window[e.id+"PlayerError"]=function(h){g.onError(h);};this.player.addEventListener("onStateChange",e.id+"StateChange");this.player.addEventListener("onError",e.id+"PlayerError");d({type:"playerready"});this.player.loadVideoById(this.videoFile.path,0);}};this.onStateChange=function(i){var h=this.getPlayerState(i);if(!(!this.meta&&h.state=="stopped")){d({type:h.state,busy:h.busy});}if(!this.loaded&&h.state=="buffering"){this.loaded=true;d({type:"paused",busy:"hide"});if(e.autostart){this.playMedia();}}if(!this.meta&&h.state=="playing"){this.meta=true;d({type:"meta"});}};this.onError=function(i){var h="An unknown error has occured: "+i;if(i==100){h="The requested video was not found.  ";h+="This occurs when a video has been removed (for any reason), ";h+="or it has been marked as private.";}else{if((i==101)||(i==150)){h="The video requested does not allow playback in an embedded player.";}}d({type:"error",data:h});};this.getPlayerState=function(h){switch(h){case 5:return{state:"ready",busy:false};case 3:return{state:"buffering",busy:"show"};case 2:return{state:"paused",busy:"hide"};case 1:return{state:"playing",busy:"hide"};case 0:return{state:"complete",busy:false};case -1:return{state:"stopped",busy:false};default:return{state:"unknown",busy:false};}return"unknown";};this.playMedia=function(){d({type:"buffering",busy:"show"});this.player.playVideo();};this.pauseMedia=function(){this.player.pauseVideo();};this.stopMedia=function(){this.player.stopVideo();};this.seekMedia=function(h){d({type:"buffering",busy:"show"});this.player.seekTo(h,true);};this.setVolume=function(h){this.player.setVolume(h*100);};this.getVolume=function(){return(this.player.getVolume()/100);};this.getDuration=function(){return this.player.getDuration();};this.getCurrentTime=function(){return this.player.getCurrentTime();};this.getBytesLoaded=function(){return this.player.getVideoBytesLoaded();};this.getBytesTotal=function(){return this.player.getVideoBytesTotal();};this.getEmbedCode=function(){return this.player.getVideoEmbedCode();};this.getMediaLink=function(){return this.player.getVideoUrl();};this.hasControls=function(){return true;};this.showControls=function(h){};this.setQuality=function(h){};this.getQuality=function(){return"";};})(this,c,b);};jQuery.fn.mediahtml5=function(c,b){return new (function(f,e,d){this.display=f;var g=this;this.player=null;this.bytesLoaded=0;this.bytesTotal=0;this.mediaType="";this.loaded=false;this.mediaFile=null;this.getPlayer=function(h,m){this.mediaFile=h;var j=e.id+"_"+this.mediaType;var l="<"+this.mediaType+' style="position:absolute" id="'+j+'"';l+=(this.mediaType=="video")?' width="100%" height="100%"':"";l+=m?' poster="'+m+'"':"";if(typeof h==="array"){l+=">";var k=h.length;while(k--){l+='<source src="'+h[k].path+'" type="'+h[k].mimetype+'">';}}else{l+=' src="'+h.path+'">Unable to display media.';}l+="</"+this.mediaType+">";this.display.append(l);this.bytesTotal=h.bytesTotal;return this.display.find("#"+j).eq(0)[0];};this.createMedia=function(h,i){jQuery.media.utils.removeFlash(this.display,e.id+"_media");this.display.children().remove();this.mediaType=this.getMediaType(h);this.player=this.getPlayer(h,i);this.loaded=false;var j=false;if(this.player){this.player.addEventListener("abort",function(){d({type:"stopped"});},true);this.player.addEventListener("loadstart",function(){d({type:"ready",busy:"show"});g.onReady();},true);this.player.addEventListener("loadeddata",function(){d({type:"loaded",busy:"hide"});},true);this.player.addEventListener("loadedmetadata",function(){d({type:"meta"});},true);this.player.addEventListener("canplaythrough",function(){d({type:"canplay",busy:"hide"});},true);this.player.addEventListener("ended",function(){d({type:"complete"});},true);this.player.addEventListener("pause",function(){d({type:"paused"});},true);this.player.addEventListener("play",function(){d({type:"playing"});},true);this.player.addEventListener("playing",function(){d({type:"playing",busy:"hide"});},true);this.player.addEventListener("error",function(){d({type:"error"});},true);this.player.addEventListener("waiting",function(){d({type:"waiting",busy:"show"});},true);this.player.addEventListener("timeupdate",function(){if(j){d({type:"timeupdate",busy:"hide"});}else{j=true;}},true);this.player.addEventListener("progress",function(k){g.bytesLoaded=k.loaded;g.bytesTotal=k.total;},true);this.player.autoplay=true;if(typeof this.player.hasAttribute=="function"&&this.player.hasAttribute("preload")&&this.player.preload!="none"){this.player.autobuffer=true;}else{this.player.autobuffer=false;this.player.preload="none";}d({type:"playerready"});}};this.onReady=function(){if(!this.loaded){this.loaded=true;this.playMedia();}};this.loadMedia=function(h){this.mediaFile=h;this.createMedia(h);};this.getMediaType=function(h){var i=(typeof h==="array")?h[0].extension:h.extension;switch(i){case"ogg":case"ogv":case"mp4":case"m4v":return"video";case"oga":case"mp3":return"audio";}return"video";};this.playMedia=function(){if(this.player){this.player.play();}};this.pauseMedia=function(){if(this.player){this.player.pause();}};this.stopMedia=function(){this.pauseMedia();if(this.player){this.player.src="";}};this.seekMedia=function(h){if(this.player){this.player.currentTime=h;}};this.setVolume=function(h){if(this.player){this.player.volume=h;}};this.getVolume=function(){return this.player?this.player.volume:0;};this.getDuration=function(){return this.player?this.player.duration:0;};this.getCurrentTime=function(){return this.player?this.player.currentTime:0;};this.getPercentLoaded=function(){if(this.player&&this.player.buffered&&this.player.duration){return(this.player.buffered.end()/this.player.duration);}else{if(this.bytesTotal){return(this.bytesLoaded/this.bytesTotal);}else{return 0;}}};this.setQuality=function(h){};this.getQuality=function(){return"";};this.hasControls=function(){return false;};this.showControls=function(h){};this.getEmbedCode=function(){var h={config:"config",id:"mediafront_player",file:this.mediaFile.path,image:this.preview,skin:e.skin};if(this.mediaFile.stream){h.stream=this.mediaFile.stream;}return jQuery.media.utils.getFlash(e.flashPlayer,"mediafront_player",e.embedWidth,e.embedHeight,h,e.wmode);};this.getMediaLink=function(){return"This media currently does not have a link.";};})(this,c,b);};jQuery.media.defaults=jQuery.extend(jQuery.media.defaults,{volume:80,autostart:false,streamer:"",embedWidth:450,embedHeight:337,wmode:"transparent",forceOverflow:false,quality:"default",repeat:false});jQuery.fn.mediadisplay=function(b){if(this.length===0){return null;}return new (function(d,c){this.settings=jQuery.media.utils.getSettings(c);this.display=d;var e=this;this.volume=0;this.player=null;this.preview="";this.updateInterval=null;this.progressInterval=null;this.playQueue=[];this.playIndex=0;this.playerReady=false;this.loaded=false;this.mediaFile=null;this.hasPlaylist=false;if(this.settings.forceOverflow){this.display.parents().css("overflow","visible");}this.reset=function(){this.loaded=false;this.stopMedia();clearInterval(this.progressInterval);clearInterval(this.updateInterval);this.playQueue.length=0;this.playQueue=[];this.playIndex=0;this.playerReady=false;this.mediaFile=null;this.display.empty().trigger("mediaupdate",{type:"reset"});};this.getPlayableMedia=function(j){var h=null;var f=j.length;while(f--){var g=new jQuery.media.file(j[f],this.settings);if(!h||(g.weight<h.weight)){h=g;}}return h;};this.getMediaFile=function(f){if(f){var g=typeof f;if(((g==="object")||(g==="array"))&&f[0]){f=this.getPlayableMedia(f);}}return f;};this.addToQueue=function(f){if(f){this.playQueue.push(this.getMediaFile(f));}};this.loadFiles=function(g){if(g){this.playQueue.length=0;this.playQueue=[];this.playIndex=0;this.addToQueue(g.intro);this.addToQueue(g.commercial);this.addToQueue(g.prereel);this.addToQueue(g.media);this.addToQueue(g.postreel);}var f=(this.playQueue.length>0);if(!f){this.display.trigger("mediaupdate",{type:"nomedia"});}return f;};this.playNext=function(){if(this.playQueue.length>this.playIndex){this.loadMedia(this.playQueue[this.playIndex]);this.playIndex++;}else{if(this.settings.repeat){this.playIndex=0;this.playNext();}else{if(this.hasPlaylist){this.reset();}else{this.loaded=false;this.settings.autostart=false;this.playIndex=0;this.playNext();}}}};this.loadMedia=function(f){if(f){f=new jQuery.media.file(this.getMediaFile(f),this.settings);this.stopMedia();if(!this.mediaFile||(this.mediaFile.player!=f.player)){this.player=null;this.playerReady=false;if(f.player){this.player=this.display["media"+f.player](this.settings,function(g){e.onMediaUpdate(g);});}if(this.player){this.player.createMedia(f,this.preview);}}else{if(this.player){this.player.loadMedia(f);}}this.mediaFile=f;this.onMediaUpdate({type:"initialize"});}};this.onMediaUpdate=function(g){switch(g.type){case"playerready":this.playerReady=true;this.player.setVolume(0);this.player.setQuality(this.settings.quality);this.startProgress();break;case"buffering":this.startProgress();break;case"stopped":clearInterval(this.progressInterval);clearInterval(this.updateInterval);break;case"paused":clearInterval(this.updateInterval);break;case"playing":this.startUpdate();break;case"progress":var f=this.getPercentLoaded();jQuery.extend(g,{percentLoaded:f});if(f>=1){clearInterval(this.progressInterval);}break;case"meta":jQuery.extend(g,{currentTime:this.player.getCurrentTime(),totalTime:this.getDuration(),volume:this.player.getVolume(),quality:this.getQuality()});break;case"complete":this.playNext();break;default:break;}if(g.type=="playing"&&!this.loaded){if(this.settings.autoLoad&&!this.settings.autostart){setTimeout(function(){e.player.setVolume((e.settings.volume/100));e.player.pauseMedia();e.settings.autostart=true;e.loaded=true;},100);}else{this.loaded=true;this.player.setVolume((this.settings.volume/100));this.display.trigger("mediaupdate",g);}}else{this.display.trigger("mediaupdate",g);}};this.startProgress=function(){if(this.playerReady){clearInterval(this.progressInterval);this.progressInterval=setInterval(function(){e.onMediaUpdate({type:"progress"});},500);}};this.startUpdate=function(){if(this.playerReady){clearInterval(this.updateInterval);this.updateInterval=setInterval(function(){if(e.playerReady){e.onMediaUpdate({type:"update",currentTime:e.player.getCurrentTime(),totalTime:e.getDuration(),volume:e.player.getVolume(),quality:e.getQuality()});}},1000);}};this.stopMedia=function(){this.loaded=false;clearInterval(this.progressInterval);clearInterval(this.updateInterval);if(this.playerReady){this.player.stopMedia();}};this.mute=function(f){if(f){this.volume=this.player.getVolume();this.player.setVolume(0);}else{this.player.setVolume(this.volume);}};this.getPercentLoaded=function(){if(this.player.getPercentLoaded){return this.player.getPercentLoaded();}else{var g=this.player.getBytesLoaded();var f=this.mediaFile.bytesTotal?this.mediaFile.bytesTotal:this.player.getBytesTotal();return f?(g/f):0;}};this.showControls=function(f){if(this.playerReady){this.player.showControls(f);}};this.hasControls=function(){if(this.player){return this.player.hasControls();}return false;};this.getDuration=function(){if(this.mediaFile){if(!this.mediaFile.duration){this.mediaFile.duration=this.player.getDuration();}return this.mediaFile.duration;}else{return 0;}};this.getQuality=function(){if(!this.mediaFile.quality){this.mediaFile.quality=this.player.getQuality();}return this.mediaFile.quality;};})(this,b);};window.onFlashPlayerReady=function(b){jQuery.media.players[b].node.player.media.player.onReady();};window.onFlashPlayerUpdate=function(c,b){jQuery.media.players[c].node.player.media.player.onMediaUpdate(b);};window.onFlashPlayerDebug=function(b){if(window.console&&console.log){console.log(b);}};jQuery.media.defaults=jQuery.extend(jQuery.media.defaults,{flashPlayer:"./flash/mediafront.swf",skin:"default",config:"nocontrols"});jQuery.fn.mediaflash=function(c,b){return new (function(f,e,d){e=jQuery.media.utils.getSettings(e);this.display=f;var g=this;this.player=null;this.mediaFile=null;this.preview="";this.ready=false;this.translate={mediaConnected:"connected",mediaBuffering:"buffering",mediaPaused:"paused",mediaPlaying:"playing",mediaStopped:"stopped",mediaComplete:"complete",mediaMeta:"meta"};this.busy={mediaConnected:false,mediaBuffering:"show",mediaPaused:"hide",mediaPlaying:"hide",mediaStopped:false,mediaComplete:false,mediaMeta:false};this.createMedia=function(h,l){this.mediaFile=h;this.preview=l;this.ready=false;var j=(e.id+"_media");var k=Math.floor(Math.random()*1000000);var m=e.flashPlayer+"?rand="+k;var i={config:e.config,id:e.id,file:h.path,skin:e.skin,autostart:(e.autostart||!e.autoLoad)};if(h.stream){i.stream=h.stream;}if(e.debug){i.debug="1";}jQuery.media.utils.insertFlash(this.display,m,j,"100%","100%",i,e.wmode,function(n){g.player=n;g.loadPlayer();});};this.loadMedia=function(h){if(this.player){this.mediaFile=h;this.player.loadMedia(h.path,h.stream);d({type:"playerready"});}};this.onReady=function(){this.ready=true;this.loadPlayer();};this.loadPlayer=function(){if(this.ready&&this.player){d({type:"playerready"});}};this.onMediaUpdate=function(h){d({type:this.translate[h],busy:this.busy[h]});};this.playMedia=function(){this.player.playMedia();};this.pauseMedia=function(){this.player.pauseMedia();};this.stopMedia=function(){this.player.stopMedia();};this.seekMedia=function(h){this.player.seekMedia(h);};this.setVolume=function(h){this.player.setVolume(h);};this.getVolume=function(){return this.player.getVolume();};this.getDuration=function(){return this.player.getDuration();};this.getCurrentTime=function(){return this.player.getCurrentTime();};this.getBytesLoaded=function(){return this.player.getMediaBytesLoaded();};this.getBytesTotal=function(){return this.player.getMediaBytesTotal();};this.hasControls=function(){return true;};this.showControls=function(h){this.player.showPlugin("controlBar",h);this.player.showPlugin("playLoader",h);};this.getEmbedCode=function(){var h={config:"config",id:"mediafront_player",file:this.mediaFile.path,image:this.preview,skin:e.skin};if(this.mediaFile.stream){h.stream=this.mediaFile.stream;}return jQuery.media.utils.getFlash(e.flashPlayer,"mediafront_player",e.embedWidth,e.embedHeight,h,e.wmode);};this.setQuality=function(h){};this.getQuality=function(){return"";};this.getMediaLink=function(){return"This video currently does not have a link.";};})(this,c,b);};jQuery.media.defaults=jQuery.extend(jQuery.media.defaults,{volumeVertical:false});jQuery.media.ids=jQuery.extend(jQuery.media.ids,{currentTime:"#mediacurrenttime",totalTime:"#mediatotaltime",playPause:"#mediaplaypause",seekUpdate:"#mediaseekupdate",seekProgress:"#mediaseekprogress",seekBar:"#mediaseekbar",seekHandle:"#mediaseekhandle",volumeUpdate:"#mediavolumeupdate",volumeBar:"#mediavolumebar",volumeHandle:"#mediavolumehandle",mute:"#mediamute"});jQuery.fn.mediacontrol=function(b){if(this.length===0){return null;}return new (function(e,c){c=jQuery.media.utils.getSettings(c);this.display=e;var f=this;this.formatTime=(c.template&&c.template.formatTime)?c.template.formatTime:function(j){j=j?j:0;var k=0;var h=0;var g=0;g=Math.floor(j/3600);j-=(g*3600);h=Math.floor(j/60);j-=(h*60);k=Math.floor(j%60);var i="";if(g){i+=String(g);i+=":";}i+=(h>=10)?String(h):("0"+String(h));i+=":";i+=(k>=10)?String(k):("0"+String(k));return{time:i,units:""};};this.setToggle=function(h,i){var g=i?".on":".off";var j=i?".off":".on";if(h){h.find(g).show();h.find(j).hide();}};var d=this.formatTime(0);this.duration=0;this.volume=-1;this.prevVolume=0;this.percentLoaded=0;this.playState=false;this.muteState=false;this.currentTime=e.find(c.ids.currentTime).text(d.time);this.totalTime=e.find(c.ids.totalTime).text(d.time);this.display.find("a.mediaplayerlink").each(function(){var g=a(this).attr("href");a(this).medialink(c,function(h){h.preventDefault();f.display.trigger(h.data.id);},{id:g.substr(1),obj:a(this)});});this.playPauseButton=e.find(c.ids.playPause).medialink(c,function(g,h){f.playState=!f.playState;f.setToggle(h,f.playState);f.display.trigger("controlupdate",{type:(f.playState?"pause":"play")});});this.seekUpdate=e.find(c.ids.seekUpdate).css("width",0);this.seekProgress=e.find(c.ids.seekProgress).css("width",0);this.seekBar=e.find(c.ids.seekBar).mediaslider(c.ids.seekHandle,false);if(this.seekBar){this.seekBar.display.unbind("setvalue").bind("setvalue",function(g,h){f.seekUpdate.css("width",(h*f.seekBar.trackSize)+"px");f.display.trigger("controlupdate",{type:"seek",value:(h*f.duration)});});this.seekBar.display.unbind("updatevalue").bind("updatevalue",function(g,h){f.seekUpdate.css("width",(h*f.seekBar.trackSize)+"px");});}this.setVolume=function(g){if(this.volumeBar){if(c.volumeVertical){this.volumeUpdate.css({marginTop:(this.volumeBar.handlePos+this.volumeBar.handleMid+this.volumeBar.handleOffset),height:(this.volumeBar.trackSize-this.volumeBar.handlePos)});}else{this.volumeUpdate.css("width",(g*this.volumeBar.trackSize));}}};this.volumeUpdate=e.find(c.ids.volumeUpdate);this.volumeBar=e.find(c.ids.volumeBar).mediaslider(c.ids.volumeHandle,c.volumeVertical,c.volumeVertical);if(this.volumeBar){this.volumeBar.display.unbind("setvalue").bind("setvalue",function(g,h){f.setVolume(h);f.display.trigger("controlupdate",{type:"volume",value:h});});this.volumeBar.display.unbind("updatevalue").bind("updatevalue",function(g,h){f.setVolume(h);f.volume=h;});}this.mute=e.find(c.ids.mute).medialink(c,function(g,h){f.muteState=!f.muteState;f.setToggle(h,f.muteState);f.setMute(f.muteState);});this.setMute=function(g){this.prevVolume=(this.volumeBar.value>0)?this.volumeBar.value:this.prevVolume;this.volumeBar.updateValue(g?0:this.prevVolume);this.display.trigger("controlupdate",{type:"mute",value:g});};this.setProgress=function(g){if(this.seekProgress&&this.seekBar){this.seekProgress.css("width",(g*(this.seekBar.trackSize+this.seekBar.handleSize)));}};this.onResize=function(){if(this.seekBar){this.seekBar.onResize();}this.setProgress(this.percentLoaded);};this.onMediaUpdate=function(g){switch(g.type){case"reset":this.reset();break;case"paused":this.playState=true;this.setToggle(this.playPauseButton.display,this.playState);break;case"playing":this.playState=false;this.setToggle(this.playPauseButton.display,this.playState);break;case"stopped":this.playState=true;this.setToggle(this.playPauseButton.display,this.playState);break;case"progress":this.percentLoaded=g.percentLoaded;this.setProgress(this.percentLoaded);break;case"meta":case"update":this.timeUpdate(g.currentTime,g.totalTime);if(this.volumeBar){this.volumeBar.updateValue(g.volume);}break;default:break;}};this.reset=function(){this.totalTime.text(this.formatTime(0).time);this.currentTime.text(this.formatTime(0).time);if(this.seekBar){this.seekBar.updateValue(0);}this.seekUpdate.css("width","0px");this.seekProgress.css("width","0px");};this.timeUpdate=function(g,h){this.duration=h;this.totalTime.text(this.formatTime(h).time);this.currentTime.text(this.formatTime(g).time);if(h&&this.seekBar&&!this.seekBar.dragging){this.seekBar.updateValue(g/h);}};this.timeUpdate(0,0);})(this,b);};window.onYouTubePlayerReady=function(b){b=b.replace("_media","");jQuery.media.players[b].node.player.media.player.onReady();};jQuery.media.playerTypes=jQuery.extend(jQuery.media.playerTypes,{youtube:function(b){return(b.search(/^http(s)?\:\/\/(www\.)?youtube\.com/i)===0);}});jQuery.fn.mediayoutube=function(c,b){return new (function(f,e,d){this.display=f;var g=this;this.player=null;this.videoFile=null;this.loaded=false;this.ready=false;this.qualities=[];this.createMedia=function(i,k){this.videoFile=i;this.ready=false;var h=(e.id+"_media");var j=Math.floor(Math.random()*1000000);var l="http://www.youtube.com/apiplayer?rand="+j+"&amp;version=3&amp;enablejsapi=1&amp;playerapiid="+h;jQuery.media.utils.insertFlash(this.display,l,h,"100%","100%",{},e.wmode,function(m){g.player=m;g.loadPlayer();});};this.getId=function(i){var h=/^http[s]?\:\/\/(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9]+)/i;return(i.search(h)==0)?i.replace(h,"$2"):i;};this.loadMedia=function(h){if(this.player){this.loaded=false;this.videoFile=h;d({type:"playerready"});this.player.loadVideoById(this.getId(this.videoFile.path),0,e.quality);}};this.onReady=function(){this.ready=true;this.loadPlayer();};this.loadPlayer=function(){if(this.ready&&this.player){window[e.id+"StateChange"]=function(h){g.onStateChange(h);};window[e.id+"PlayerError"]=function(h){g.onError(h);};window[e.id+"QualityChange"]=function(h){g.quality=h;};this.player.addEventListener("onStateChange",e.id+"StateChange");this.player.addEventListener("onError",e.id+"PlayerError");this.player.addEventListener("onPlaybackQualityChange",e.id+"QualityChange");this.qualities=this.player.getAvailableQualityLevels();d({type:"playerready"});this.player.loadVideoById(this.getId(this.videoFile.path),0);}};this.onStateChange=function(i){var h=this.getPlayerState(i);d({type:h.state,busy:h.busy});if(!this.loaded&&h=="playing"){this.loaded=true;d({type:"meta"});}};this.onError=function(i){var h="An unknown error has occured: "+i;if(i==100){h="The requested video was not found.  ";h+="This occurs when a video has been removed (for any reason), ";h+="or it has been marked as private.";}else{if((i==101)||(i==150)){h="The video requested does not allow playback in an embedded player.";}}if(window.console&&console.log){console.log(h);}d({type:"error",data:h});};this.getPlayerState=function(h){switch(h){case 5:return{state:"ready",busy:false};case 3:return{state:"buffering",busy:"show"};case 2:return{state:"paused",busy:"hide"};case 1:return{state:"playing",busy:"hide"};case 0:return{state:"complete",busy:false};case -1:return{state:"stopped",busy:false};default:return{state:"unknown",busy:false};}return"unknown";};this.playMedia=function(){d({type:"buffering",busy:"show"});this.player.playVideo();};this.pauseMedia=function(){this.player.pauseVideo();};this.stopMedia=function(){this.player.stopVideo();};this.seekMedia=function(h){d({type:"buffering",busy:"show"});this.player.seekTo(h,true);};this.setVolume=function(h){this.player.setVolume(h*100);};this.setQuality=function(h){this.player.setPlaybackQuality(h);};this.getVolume=function(){return(this.player.getVolume()/100);};this.getDuration=function(){return this.player.getDuration();};this.getCurrentTime=function(){return this.player.getCurrentTime();};this.getQuality=function(){return this.player.getPlaybackQuality();};this.getEmbedCode=function(){return this.player.getVideoEmbedCode();};this.getMediaLink=function(){return this.player.getVideoUrl();};this.getBytesLoaded=function(){return this.player.getVideoBytesLoaded();};this.getBytesTotal=function(){return this.player.getVideoBytesTotal();};this.hasControls=function(){return false;};this.showControls=function(h){};})(this,c,b);};})(jQuery);