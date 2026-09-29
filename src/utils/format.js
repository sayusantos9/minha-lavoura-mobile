export function shortDate(date){if(!date)return 'Não definida';const parts=date.split('-');return parts.length===3?`${parts[2]}/${parts[1]}`:date}
export function fullDate(date){if(!date)return 'Não definida';const parts=date.split('-');return parts.length===3?`${parts[2]}/${parts[1]}/${parts[0]}`:date}
export function today(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
export const numberText=n=>Number(n).toLocaleString('pt-BR',{maximumFractionDigits:2});
