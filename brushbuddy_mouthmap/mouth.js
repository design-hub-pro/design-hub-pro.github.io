/* BrushBuddy mouth map: 12 zones (6 upper, 6 lower), 2 teeth per zone.
   States: c cleaned, m missed, o over-scrubbed, n not yet, a active now. */
(function(){
  var COL={c:['#DCFCE7','#22C55E'],m:['#FFF1D6','#FFB020'],o:['#FFE1E5','#FF5B6E'],n:['#EEF2F6','#CBD5E1'],a:['#CCFBF1','#0FB5A6'],l:['#CCFBF1','#0FB5A6']};
  var DARK={n:['#16283A','#2B4257']};
  function arch(g,cx,cy,rx,ry,dir,states,dark){
    var N=12,out='';
    for(var i=0;i<N;i++){
      var t=Math.PI*(1-(i+0.5)/N)*0.86+Math.PI*0.07;
      var x=cx+rx*Math.cos(t), y=cy-dir*ry*Math.sin(t);
      var edge=Math.abs(Math.cos(t));
      var w=13+edge*9, h=18+edge*6;
      var ang=Math.atan2(dir*ry*Math.cos(t), rx*Math.sin(t))*180/Math.PI;
      var s=states[Math.floor(i/2)]||'n';
      var c=(dark&&DARK[s])?DARK[s]:COL[s];
      out+='<g transform="translate('+x.toFixed(1)+' '+y.toFixed(1)+') rotate('+(-ang).toFixed(1)+')"'+(s==='a'?' class="pulse"':'')+'>'+
        (s==='a'?'<rect x="'+(-w/2-6)+'" y="'+(-h/2-6)+'" width="'+(w+12)+'" height="'+(h+12)+'" rx="'+(h/2+6)+'" fill="#2DD4BF" opacity=".28"/>':'')+
        '<rect x="'+(-w/2)+'" y="'+(-h/2)+'" width="'+w+'" height="'+h+'" rx="'+(Math.min(w,h)/2.3)+'" fill="'+c[0]+'" stroke="'+c[1]+'" stroke-width="2.6"/></g>';
    }
    g.insertAdjacentHTML('beforeend',out);
  }
  window.drawMouth=function(id,upper,lower,dark){
    var svg=document.getElementById(id);
    svg.setAttribute('viewBox','0 0 300 300');
    arch(svg,150,138,112,108,1,upper,dark);
    arch(svg,150,162,104,100,-1,lower,dark);
  };
})();
