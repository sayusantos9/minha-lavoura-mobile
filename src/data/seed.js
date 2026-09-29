export function createSeed(){return {
 plots:[
 {id:'p1',name:'Talhão A',crop:'Soja',area:45,stage:'Floração',progress:70,irrigation:'Ativa',irrigationDate:'2026-09-29',temperature:25,weather:'Céu limpo',weatherDate:'2026-09-29'},
 {id:'p2',name:'Talhão B',crop:'Soja',area:35,stage:'Floração',progress:70,irrigation:'Pendente',irrigationDate:'',temperature:null,weather:'',weatherDate:''},
 {id:'p3',name:'Talhão C',crop:'Milho',area:25,stage:'Desenvolvimento vegetativo',progress:45,irrigation:'Ativa',irrigationDate:'2026-09-29',temperature:null,weather:'',weatherDate:''},
 {id:'p4',name:'Talhão D',crop:'Milho',area:15,stage:'Desenvolvimento vegetativo',progress:45,irrigation:'Pendente',irrigationDate:'',temperature:null,weather:'',weatherDate:''}],
 items:[
 {id:'i1',name:'Semente de Soja',category:'Sementes',quantity:50,unit:'sacas (50 kg)',min:10,photo:2},
 {id:'i2',name:'Adubo NPK 20-05-20',category:'Fertilizantes',quantity:5,unit:'sacas (50 kg)',min:10,photo:3},
 {id:'i3',name:'Ureia',category:'Fertilizantes',quantity:30,unit:'sacas (50 kg)',min:10,photo:4},
 {id:'i4',name:'Herbicida',category:'Defensivos',quantity:12,unit:'litros',min:5,photo:5},
 {id:'i5',name:'Inseticida',category:'Defensivos',quantity:8,unit:'litros',min:10,photo:5}],
 machines:[
 {id:'m1',name:'Trator 6145J',status:'Em uso',hours:1250,maintenanceDate:'',type:'Trator',photo:0},
 {id:'m2',name:'Pulverizador Uniport',status:'Manutenção em breve',hours:980,maintenanceDate:'2026-10-10',type:'Pulverizador',photo:1},
 {id:'m3',name:'Plantadeira',status:'Disponível',hours:620,maintenanceDate:'',type:'Plantadeira',photo:2}],
 notes:[
 {id:'n1',plotId:'p1',title:'Desenvolvimento bom',text:'Plantas com bom vigor.',kind:'Observação',date:'2026-09-29'},
 {id:'n2',plotId:'p1',title:'Presença de lagartas',text:'Baixa incidência. Monitorar.',kind:'Pragas',date:'2026-09-27'},
 {id:'n3',plotId:'p1',title:'Foto registrada',text:'Crescimento uniforme no talhão.',kind:'Foto',date:'2026-09-25',samplePhoto:true}],
 tasks:[
 {id:'t1',name:'Aplicação de adubo',plotId:'p1',date:'2026-09-30',done:false},
 {id:'t2',name:'Verificar irrigação',plotId:'p3',date:'2026-10-01',done:false},
 {id:'t3',name:'Monitorar pragas',plotId:'p2',date:'2026-10-03',done:false}],
 moves:[]
};}
