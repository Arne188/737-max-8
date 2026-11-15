// Module 010: portal with stepped outer shell and transverse ties. Experimental geometry.\n// Still requires BrickLink Studio connection and structural validation.
export const parts=[];
const add=(id,color,x,z,level,section,rot=false)=>parts.push({id,color,x,z,level,section,rot});
for(const x of [-3,-1,1,3])for(const z of [-6,-2,2,6])add('3020',71,x,z,0,'base');
for(const x of [-3,-1,1,3])for(const z of [-4,0,4])add('3020',71,x,z,1,'bond');
for(const z of [-4,0,4])for(const x of [-3,3])for(const level of [2,5,8])add('3004',15,x,z,level,'walls');
for(const z of [-4,0,4])for(const x of [-3,3])add('3023',1,x,z,11,'top');
for(const z of [-4,0,4])for(const x of [-2,2])add('3020',1,x,z,12,'roof',true);
// Outer wall on each side, in 1x2 bricks: separate, regular-stud grid.
// Three height zones create a visible stepped outline.
for(const z of [-6,-4,-2,0,2,4,6]){
 for(const side of [-1,1]){
  for(const [x,y] of [[5,2],[5,5],[4,8]]){
   // Keep center frame uprights clear. Outer skin requires further fastening.
   add('3004',15,side*x,z,y,'shell');
  }
 }
}
// Short bridge plates connect portal and lower skin at selected stations.
for(const z of [-4,0,4])for(const side of [-1,1])add('3020',71,side*4,z,1,'ties');
export function shape(p){const brick=p.id==='3004',short=p.id==='3023';return {w:p.rot?4:brick||short?1:2,d:p.rot?2:brick||short?2:4,h:brick?3:1}}
export function overlap(a,b){const A=shape(a),B=shape(b);return Math.abs(a.x-b.x)<(A.w+B.w)/2-1e-7&&Math.abs(a.z-b.z)<(A.d+B.d)/2-1e-7}
export function audit(){
 const collisions=[],unsupported=[];
 for(let i=0;i<parts.length;i++){
  const p=parts[i],P=shape(p);
  for(let j=0;j<i;j++){const q=parts[j],Q=shape(q);if(overlap(p,q)&&p.level<q.level+Q.h&&q.level<p.level+P.h)collisions.push([i+1,j+1])}
  if(p.level>0&&!parts.some(q=>q!==p&&q.level+shape(q).h===p.level&&overlap(p,q)))unsupported.push(i+1);
 }
 return {collisions,unsupported};
}
export function ldraw(){let out=['0 FILE fuselage_portal_010.ldr','0 737 MAX 8 - stepped fuselage with shell and cross ties','0 Name: fuselage_portal_008.ldr','0 // Nominal footprint audit only; Studio connection and strength check required'];let prev='';
 for(const p of parts){if(p.section!==prev){out.push('0 STEP');prev=p.section}out.push('1 '+p.color+' '+Math.round(p.x*20)+' '+(-p.level*8)+' '+Math.round(p.z*20)+' '+(p.rot?'0 0 1 0 1 0 -1 0 0':'1 0 0 0 1 0 0 0 1')+' '+p.id+'.dat')}
 return out.join('\n')+'\n';
}
