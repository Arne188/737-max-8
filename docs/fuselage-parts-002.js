// Baugruppe 002: connected, orthogonal LEGO floor study.
// All coordinates are in studs (x,z) and plate heights (layer).
// Part 3020 = Plate 2x4, 3004 = Brick 1x2.
export const parts=[];
for(const x of [-3,-1,1,3])for(const z of [-6,-2,2,6])
  parts.push({id:'3020',color:71,x,z,layer:0,section:'lower'});
for(const x of [-3,-1,1,3])for(const z of [-4,0,4])
  parts.push({id:'3020',color:71,x,z,layer:1,section:'upper'});
// Eight 1x2 bricks: positioned on top of upper plate layer.
for(const x of [-3,3])for(const z of [-4,0,4])
  parts.push({id:'3004',color:1,x,z,layer:2,section:'rails'});
export function toLDraw(items=parts){
 const lines=['0 FILE fuselage_floor_002.ldr','0 TUI 737 MAX 8 - connected floor study','0 Name: fuselage_floor_002.ldr','0 Author: ChatGPT','0 // LDraw part placements; Studio verification still required'];
 let last='';
 for(const p of items){
  if(last!==p.section){lines.push('0 STEP');last=p.section}
  lines.push('1 '+p.color+' '+p.x*20+' '+(-p.layer*8)+' '+p.z*20+' 1 0 0 0 1 0 0 0 1 '+p.id+'.dat');
 }
 return lines.join('\n')+'\n';
}
