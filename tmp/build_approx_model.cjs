const {Document,NodeIO,Accessor} = require('/Users/nihitagarwal/Desktop/GLB Optimizer/node_modules/@gltf-transform/core');
const doc=new Document(); doc.createBuffer(); const scene=doc.createScene('Apartment');
const mats={};
function mat(name,color,rough=.7){return mats[name]||(mats[name]=doc.createMaterial(name).setBaseColorFactor([...color,1]).setRoughnessFactor(rough).setMetallicFactor(.03));}
const M={wall:mat('Warm ivory walls',[.82,.73,.59]),floor:mat('Oak flooring',[.38,.20,.09]),wood:mat('Walnut cabinetry',[.22,.08,.025]),cream:mat('Cream upholstery',[.72,.57,.39]),blue:mat('Deep teal accents',[.025,.15,.17]),white:mat('Linen',[.92,.88,.78]),black:mat('Black metal',[.025,.02,.018],.35),green:mat('Plant green',[.08,.28,.08]),rug:mat('Textured rug',[.48,.38,.25])};
function box(name,x,y,z,w,h,d,material){const p=[[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]].map(v=>[v[0]*w/2,v[1]*h/2,v[2]*d/2]);const idx=[0,1,2,0,2,3,1,5,6,1,6,2,5,4,7,5,7,6,4,0,3,4,3,7,3,2,6,3,6,7,4,5,1,4,1,0]; const mesh=doc.createMesh(name).addPrimitive(doc.createPrimitive().setAttribute('POSITION',doc.createAccessor().setType(Accessor.Type.VEC3).setArray(new Float32Array(p.flat()))).setIndices(doc.createAccessor().setType(Accessor.Type.SCALAR).setArray(new Uint16Array(idx))).setMaterial(material)); const n=doc.createNode(name).setMesh(mesh).setTranslation([x,y,z]); scene.addChild(n); return n;}
// 18m x 12m approximate plan, 3m ceiling.
box('Floor',0,-.08,0,18,.16,12,M.floor); box('North wall',0,1.5,6,18,3,.18,M.wall); box('South wall',0,1.5,-6,18,3,.18,M.wall); box('West wall',-9,1.5,0,.18,3,12,M.wall); box('East wall',9,1.5,0,.18,3,12,M.wall);
box('Bedroom partition',2.2,1.5,2.0,.18,3,8,M.wall); box('Guest partition',-3.1,1.5,2.4,5.8,3,.18,M.wall); box('Kitchen partition',3.8,1.5,-2.8,.18,3,5,M.wall);
// bedrooms
box('Master bed',5.6,.45,3.8,3.2,.55,2.1,M.wood); box('Master mattress',5.6,.82,3.8,3.0,.28,1.9,M.white); box('Master headboard',5.6,1.65,4.8,3.2,1.5,.18,M.wood);
box('Guest bed',-6.1,.45,3.6,2.7,.55,2.0,M.wood); box('Guest mattress',-6.1,.82,3.6,2.5,.28,1.8,M.white); box('Guest headboard',-6.1,1.55,4.55,2.7,1.3,.16,M.wood);
// living room seating and feature wall
box('Living sofa',1.3,.6,-1.0,4.2,1.1,1.0,M.cream); box('Accent chair',-1.8,.55,-2.0,1.1,1.0,1.0,M.cream); box('Coffee rug',0,.025,-1.6,5.4,.04,3.0,M.rug); box('Coffee table',0,.5,-1.6,2.3,.7,1.1,M.black); box('TV wall',-1.8,1.8,-5.82,4.5,2.5,.12,M.wood); box('TV',-1.8,2.6,-5.68,2.7,1.4,.08,M.black);
// kitchen and dining
box('Kitchen counter',5.8,.9,-3.8,4.8,1.8,.75,M.wood); box('Island',3.4,.8,-3.1,2.5,1.5,1.0,M.white); box('Dining table',-1.0,.85,-4.1,2.5,.15,1.2,M.wood); for(let i=0;i<4;i++) box('Dining chair '+i,-2.0+i*0.7,.55,-4.1,.42,1,.42,M.cream);
// lighting accents / plants
box('Teal vase',-1.0,1.0,-1.6,.35,.8,.35,M.blue); box('Plant pot',7.0,.55,-1.0,.55,1,.55,M.wood); box('Plant canopy',7.0,1.7,-1.0,1.4,1.4,1.4,M.green);
const io=new NodeIO(); io.write('assets/apartment-approximation.glb',doc); console.log('wrote');
