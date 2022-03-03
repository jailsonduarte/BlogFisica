/*
 *  /MathJax/extensions/TeX/color.js
 *
 *  Copyright (c) 2009-2018 The MathJax Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

MathJax.Extension["TeX/color"]={version:"2.7.6",config:MathJax.Hub.CombineConfig("TeX.color",{padding:"5px",border:"2px"}),colors:{Apricot:"#FBB982",Aquamarine:"#00B5BE",Bittersweet:"#C04F17",Black:"#221E1F",Blue:"#2D2F92",BlueGreen:"#00B3B8",BlueViolet:"#473992",BrickRed:"#B6321C",Brown:"#792500",BurntOrange:"#F7921D",CadetBlue:"#74729A",CarnationPink:"#F282B4",Cerulean:"#00A2E3",CornflowerBlue:"#41B0E4",Cyan:"#00AEEF",Dandelion:"#FDBC42",DarkOrchid:"#A4538A",Emerald:"#00A99D",ForestGreen:"#009B55",Fuchsia:"#8C368C",Goldenrod:"#FFDF42",Gray:"#949698",Green:"#00A64F",GreenYellow:"#DFE674",JungleGreen:"#00A99A",Lavender:"#F49EC4",LimeGreen:"#8DC73E",Magenta:"#EC008C",Mahogany:"#A9341F",Maroon:"#AF3235",Melon:"#F89E7B",MidnightBlue:"#006795",Mulberry:"#A93C93",NavyBlue:"#006EB8",OliveGreen:"#3C8031",Orange:"#F58137",OrangeRed:"#ED135A",Orchid:"#AF72B0",Peach:"#F7965A",Periwinkle:"#7977B8",PineGreen:"#008B72",Plum:"#92268F",ProcessBlue:"#00B0F0",Purple:"#99479B",RawSienna:"#974006",Red:"#ED1B23",RedOrange:"#F26035",RedViolet:"#A1246B",Rhodamine:"#EF559F",RoyalBlue:"#0071BC",RoyalPurple:"#613F99",RubineRed:"#ED017D",Salmon:"#F69289",SeaGreen:"#3FBC9D",Sepia:"#671800",SkyBlue:"#46C5DD",SpringGreen:"#C6DC67",Tan:"#DA9D76",TealBlue:"#00AEB3",Thistle:"#D883B7",Turquoise:"#00B4CE",Violet:"#58429B",VioletRed:"#EF58A0",White:"#FFFFFF",WildStrawberry:"#EE2967",Yellow:"#FFF200",YellowGreen:"#98CC70",YellowOrange:"#FAA21A"},getColor:function(a,c){if(!a){a="named"}var b=this["get_"+a];if(!b){this.TEX.Error(["UndefinedColorModel","Color model '%1' not defined",a])}return b.call(this,c)},get_rgb:function(b){b=b.replace(/^\s+/,"").replace(/\s+$/,"").split(/\s*,\s*/);var a="#";if(b.length!==3){this.TEX.Error(["ModelArg1","Color values for the %1 model require 3 numbers","rgb"])}for(var c=0;c<3;c++){if(!b[c].match(/^(\d+(\.\d*)?|\.\d+)$/)){this.TEX.Error(["InvalidDecimalNumber","Invalid decimal number"])}var d=parseFloat(b[c]);if(d<0||d>1){this.TEX.Error(["ModelArg2","Color values for the %1 model must be between %2 and %3","rgb",0,1])}d=Math.floor(d*255).toString(16);if(d.length<2){d="0"+d}a+=d}return a},get_RGB:function(b){b=b.replace(/^\s+/,"").replace(/\s+$/,"").split(/\s*,\s*/);var a="#";if(b.length!==3){this.TEX.Error(["ModelArg1","Color values for the %1 model require 3 numbers","RGB"])}for(var c=0;c<3;c++){if(!b[c].match(/^\d+$/)){this.TEX.Error(["InvalidNumber","Invalid number"])}var d=parseInt(b[c]);if(d>255){this.TEX.Error(["ModelArg2","Color values for the %1 model must be between %2 and %3","RGB",0,255])}d=d.toString(16);if(d.length<2){d="0"+d}a+=d}return a},get_gray:function(a){if(!a.match(/^\s*(\d+(\.\d*)?|\.\d+)\s*$/)){this.TEX.Error(["InvalidDecimalNumber","Invalid decimal number"])}var b=parseFloat(a);if(b<0||b>1){this.TEX.Error(["ModelArg2","Color values for the %1 model must be between %2 and %3","gray",0,1])}b=Math.floor(b*255).toString(16);if(b.length<2){b="0"+b}return"#"+b+b+b},get_named:function(a){if(this.colors.hasOwnProperty(a)){return this.colors[a]}return a},padding:function(){var c="+"+this.config.padding;var a=this.config.padding.replace(/^.*?([a-z]*)$/,"$1");var b="+"+(2*parseFloat(c))+a;return{width:b,height:c,depth:c,lspace:this.config.padding}}};MathJax.Hub.Register.StartupHook("TeX Jax Ready",function(){var d=MathJax.InputJax.TeX,a=MathJax.ElementJax.mml;var c=d.Stack.Item;var b=MathJax.Extension["TeX/color"];b.TEX=d;d.Definitions.Add({macros:{color:"Color",textcolor:"TextColor",definecolor:"DefineColor",colorbox:"ColorBox",fcolorbox:"fColorBox"}},null,true);d.Parse.Augment({Color:function(h){var g=this.GetBrackets(h),e=this.GetArgument(h);e=b.getColor(g,e);var f=c.style().With({styles:{mathcolor:e}});this.stack.env.color=e;this.Push(f)},TextColor:function(h){var g=this.GetBrackets(h),f=this.GetArgument(h);f=b.getColor(g,f);var e=this.stack.env.color;this.stack.env.color=f;var i=this.ParseArg(h);if(e){this.stack.env.color}else{delete this.stack.env.color}this.Push(a.mstyle(i).With({mathcolor:f}))},DefineColor:function(g){var f=this.GetArgument(g),e=this.GetArgument(g),h=this.GetArgument(g);b.colors[f]=b.getColor(e,h)},ColorBox:function(g){var f=this.GetArgument(g),e=this.InternalMath(this.GetArgument(g));this.Push(a.mpadded.apply(a,e).With({mathbackground:b.getColor("named",f)}).With(b.padding()))},fColorBox:function(g){var h=this.GetArgument(g),f=this.GetArgument(g),e=this.InternalMath(this.GetArgument(g));this.Push(a.mpadded.apply(a,e).With({mathbackground:b.getColor("named",f),style:"border: "+b.config.border+" solid "+b.getColor("named",h)}).With(b.padding()))}});MathJax.Hub.Startup.signal.Post("TeX color Ready")});MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/color.js");
