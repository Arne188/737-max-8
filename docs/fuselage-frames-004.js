// Baugruppe 004: orthogonal frame prototype, separate from reference curves.
// Coordinate unit: studs; y is plate units (3 plates = 1 brick).
// Parts: 3020 plate 2x4, 3004 brick 1x2, 3023 plate 1x2.
// Layout is a conceptual rigid portal frame; Studio connectivity check outstanding.
export const frameParts=[];
function put(id,color,x,y,z,section){frameParts.push({id,color,x,y,z,section})}
// Two longitudinal lower rails made of 2x4 plates, alternating courses.
for(const x of [-3,3])for(const z of [-6,-2,2,6])put('3020',71,x,0,z,'base');
for(const x of [-3,3])for(const z of [-4,0,4])put('3020',71,x,1,z,'base');
// Transverse floor ties, each placed above the lower rail at three stations.
for(const z of [-4,0,4])for(const x of [-2,0,2])put('3020',71,x,2,z,'floor');
// Sidewalls, two stations, 1x2 bricks stacked in orthogonal layers.
for(const z of [-4,4])for(const x of [-3.5,3.5])for(const y of [3,6,9,12,15])put('3004',15,x,y,z,'uprights');
// Top side ties on upright studs
for(const z of [-4,4])for(const x of [-3.5,3.5])put('3023',1,x,18,z,'top');
// Ceiling across width: 2x4 plates spanning laterally with rotated placement flag.
for(const z of [-4,4])for(const x of [-2,2])put('3020',15,x,19,z,'roof');
export function ldraw(parts=frameParts){
 const out=['0 FILE fuselage_frames_004.ldr','0 737 MAX 8 - Orthogonal LEGO portal frame PROTOTYPE','0 Name: fuselage_frames_004.ldr','0 // Real part numbers; not Studio collision/connectivity validated'];
 let sec='';
 for(const p of parts){if(sec!==p.section){out.push('0 STEP');sec=p.section}
 const rotate=p.section==='roof';const matrix=rotate?'0 0 1 0 1 0 -1 0 0':'1 0 0 0 1 0 0 0 1';
 out.push('1 '+p.color+' '+Math.round(p.x*20)+' '+(-p.y*8)+' '+Math.round(p.z*20)+' '+matrix+' '+p.id+'.dat')}
 return out.join('\n')+'\n'
}
