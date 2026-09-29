const number = value => Number(String(value).trim().replace(',', '.'));
function nonnegative(value,label){const n=number(value);if(!Number.isFinite(n)||n<0)throw Error(`${label}: informe um número igual ou maior que zero.`);return n}
function applyMovement(state,{itemId,kind,quantity,id,date}){
 const item=state.items.find(x=>x.id===itemId);if(!item)throw Error('Selecione um insumo.');
 const qty=nonnegative(quantity,'Quantidade');if(qty===0)throw Error('A quantidade deve ser maior que zero.');
 if(!['Entrada','Saída'].includes(kind))throw Error('Tipo de movimentação inválido.');
 if(kind==='Saída'&&qty>item.quantity)throw Error('A saída é maior que o saldo disponível.');
 return {...state,items:state.items.map(x=>x.id===itemId?{...x,quantity:Math.round((x.quantity+(kind==='Entrada'?qty:-qty))*1000)/1000}:x),moves:[{id,date,itemId,itemName:item.name,unit:item.unit,kind,quantity:qty},...state.moves]};
}
function validateRecord(type,form){
 for(const key of ['date','maintenanceDate','irrigationDate']){if(form[key]){const value=String(form[key]);const parsed=new Date(value+'T12:00:00Z');if(!/^\d{4}-\d{2}-\d{2}$/.test(value)||!Number.isFinite(parsed.getTime())||parsed.toISOString().slice(0,10)!==value)throw Error('Informe uma data válida no formato AAAA-MM-DD.');}}

 if(['plot','item','machine','task'].includes(type)&&!String(form.name||'').trim())throw Error('Preencha o nome.');
 if(type==='plot'){if(!String(form.crop||'').trim())throw Error('Informe a cultura.');const area=nonnegative(form.area,'Área');if(!area)throw Error('A área deve ser maior que zero.');const progress=nonnegative(form.progress,'Progresso');if(progress>100)throw Error('O progresso deve ficar entre 0 e 100.');return {...form,name:form.name.trim(),crop:form.crop.trim(),area,progress};}
 if(type==='item'){if(!String(form.unit||'').trim())throw Error('Informe a unidade.');return {...form,name:form.name.trim(),quantity:nonnegative(form.quantity,'Quantidade'),min:nonnegative(form.min,'Estoque mínimo')};}
 if(type==='machine')return {...form,name:form.name.trim(),hours:nonnegative(form.hours,'Horas de uso')};
 if(type==='note'&&!String(form.text||'').trim())throw Error('Descreva a observação.');
 if(type==='weather'){const temp=number(form.temperature);if(!Number.isFinite(temp)||temp < -30 ||temp > 60)throw Error('Informe uma temperatura entre -30 e 60 °C.');return {...form,temperature:temp}}
 if(form.date&&!/^\d{4}-\d{2}-\d{2}$/.test(form.date))throw Error('Use o formato AAAA-MM-DD para a data.');
 return form;
}
function summary(state){return {area:state.plots.reduce((n,p)=>n+p.area,0),plots:state.plots.length,low:state.items.filter(x=>x.quantity<=x.min).length,inUse:state.machines.filter(x=>x.status==='Em uso').length,machines:state.machines.length};}
module.exports={number,nonnegative,applyMovement,validateRecord,summary};
